import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db.js';
import Requirement from '../../../lib/models/Requirement.js';
import { generateReferenceId } from '../../../lib/referenceGenerator.js';
import { validateRequirementPayload } from '../../../lib/requirementValidator.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100);
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const skip = (page - 1) * limit;

    const query = {};

    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { 'eventBasics.eventName': searchRegex },
        { 'eventBasics.location.city': searchRegex },
        { referenceId: searchRegex },
        { 'contactPerson.name': searchRegex },
      ];
    }

    const [requirements, total] = await Promise.all([
      Requirement.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Requirement.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      count: requirements.length,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
      data: requirements,
    });
  } catch (error) {
    console.error('Error fetching requirements:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch requirements',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();

    const validation = validateRequirementPayload(payload);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed for requirement posting',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { category, eventBasics, contactPerson, urgencyLevel } = payload;
    const cleanedDoc = {
      referenceId: generateReferenceId(category),
      category,
      eventBasics: {
        eventName: eventBasics.eventName.trim(),
        eventType: eventBasics.eventType.trim(),
        isDateRange: Boolean(eventBasics.isDateRange),
        startDate: new Date(eventBasics.startDate),
        endDate: eventBasics.isDateRange && eventBasics.endDate ? new Date(eventBasics.endDate) : undefined,
        location: {
          city: eventBasics.location.city.trim(),
          state: eventBasics.location.state ? eventBasics.location.state.trim() : '',
          address: eventBasics.location.address ? eventBasics.location.address.trim() : '',
          pincode: eventBasics.location.pincode ? eventBasics.location.pincode.trim() : '',
        },
        venue: {
          name: eventBasics.venue?.name ? eventBasics.venue.name.trim() : '',
          venueType: eventBasics.venue?.venueType || 'Not Decided Yet',
        },
      },
      contactPerson: {
        name: contactPerson.name.trim(),
        organization: contactPerson.organization ? contactPerson.organization.trim() : '',
        email: contactPerson.email.trim().toLowerCase(),
        phone: contactPerson.phone.trim(),
      },
      urgencyLevel: urgencyLevel || 'Normal',
      status: 'Open',
    };

    if (category === 'planner') {
      cleanedDoc.plannerDetails = payload.plannerDetails || {};
    } else if (category === 'performer') {
      cleanedDoc.performerDetails = payload.performerDetails || {};
    } else if (category === 'crew') {
      cleanedDoc.crewDetails = payload.crewDetails || {};
    }

    const requirement = await Requirement.create(cleanedDoc);

    return NextResponse.json(
      {
        success: true,
        message: 'Requirement posted successfully',
        referenceId: requirement.referenceId,
        data: requirement,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating requirement:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Server error while processing requirement posting',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
