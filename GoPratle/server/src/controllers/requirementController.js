import Requirement from '../models/Requirement.js';
import { generateReferenceId } from '../utils/referenceGenerator.js';
import { validateRequirementPayload } from '../validators/requirementValidator.js';

/**
 * Create a new requirement posting
 * Route: POST /api/requirements
 */
export const createRequirement = async (req, res, next) => {
  try {
    const payload = req.body;

    // Run structural and business validations
    const validation = validateRequirementPayload(payload);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed for requirement posting',
        errors: validation.errors,
      });
    }

    // Clean payload so only the chosen category data is persisted
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

    // Category-specific payload assignment
    if (category === 'planner') {
      cleanedDoc.plannerDetails = payload.plannerDetails || {};
    } else if (category === 'performer') {
      cleanedDoc.performerDetails = payload.performerDetails || {};
    } else if (category === 'crew') {
      cleanedDoc.crewDetails = payload.crewDetails || {};
    }

    const createdRequirement = await Requirement.create(cleanedDoc);

    return res.status(201).json({
      success: true,
      message: `Requirement successfully posted under '${category.toUpperCase()}' category!`,
      data: createdRequirement,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all requirements with category filtering, search, and pagination
 * Route: GET /api/requirements
 */
export const getRequirements = async (req, res, next) => {
  try {
    const { category, status, search, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const filter = {};

    if (category && ['planner', 'performer', 'crew'].includes(category.toLowerCase())) {
      filter.category = category.toLowerCase();
    }

    if (status) {
      filter.status = status;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { 'eventBasics.eventName': searchRegex },
        { 'eventBasics.eventType': searchRegex },
        { 'eventBasics.location.city': searchRegex },
        { 'eventBasics.venue.name': searchRegex },
        { referenceId: searchRegex },
        { 'contactPerson.name': searchRegex },
        { 'contactPerson.organization': searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [requirements, total] = await Promise.all([
      Requirement.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Requirement.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: requirements,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single requirement by MongoDB _id or human referenceId
 * Route: GET /api/requirements/:id
 */
export const getRequirementById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let requirement;
    if (id.startsWith('GP-')) {
      requirement = await Requirement.findOne({ referenceId: id }).lean();
    } else {
      requirement = await Requirement.findById(id).lean();
    }

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: `Requirement with identifier '${id}' not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: requirement,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get requirement category & status metrics
 * Route: GET /api/requirements/stats
 */
export const getRequirementStats = async (req, res, next) => {
  try {
    const [total, plannerCount, performerCount, crewCount, statusCounts] = await Promise.all([
      Requirement.countDocuments(),
      Requirement.countDocuments({ category: 'planner' }),
      Requirement.countDocuments({ category: 'performer' }),
      Requirement.countDocuments({ category: 'crew' }),
      Requirement.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const formattedStatus = statusCounts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      data: {
        total,
        byCategory: {
          planner: plannerCount,
          performer: performerCount,
          crew: crewCount,
        },
        byStatus: formattedStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update requirement status
 * Route: PATCH /api/requirements/:id/status
 */
export const updateRequirementStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Open', 'Under Review', 'Fulfilled', 'Closed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${validStatuses.join(', ')}`,
      });
    }

    const query = id.startsWith('GP-') ? { referenceId: id } : { _id: id };
    const updated = await Requirement.findOneAndUpdate(
      query,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Requirement not found for status update.',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a requirement
 * Route: DELETE /api/requirements/:id
 */
export const deleteRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = id.startsWith('GP-') ? { referenceId: id } : { _id: id };

    const deleted = await Requirement.findOneAndDelete(query);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Requirement not found for deletion.',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Requirement ${deleted.referenceId} removed successfully.`,
    });
  } catch (error) {
    next(error);
  }
};
