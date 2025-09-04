import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes timeout (within Vercel's 800s limit for Pro plan)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { images, patientInfo, systemPrompt } = body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: 'No images provided for report generation' },
        { status: 400 }
      );
    }

    // Return a simple success response for now
    return NextResponse.json({
      success: true,
      message: 'Report generation endpoint ready',
      totalImages: images.length,
      patientInfo: patientInfo || {},
      systemPrompt: systemPrompt || 'default'
    });

  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate diagnostic report',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get('reportId');

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      reportId,
      status: 'This endpoint would return report from database',
      message: 'Report retrieval endpoint - implement with database integration'
    });

  } catch (error) {
    console.error('Get report error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve report' },
      { status: 500 }
    );
  }
}