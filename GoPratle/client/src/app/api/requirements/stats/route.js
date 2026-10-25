import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db.js';
import Requirement from '../../../../lib/models/Requirement.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const [total, plannerCount, performerCount, crewCount] = await Promise.all([
      Requirement.countDocuments(),
      Requirement.countDocuments({ category: 'planner' }),
      Requirement.countDocuments({ category: 'performer' }),
      Requirement.countDocuments({ category: 'crew' }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        total,
        planners: plannerCount,
        performers: performerCount,
        crew: crewCount,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch requirements stats',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
