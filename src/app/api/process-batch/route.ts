import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes timeout (within Vercel's 800s limit)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { images, systemPrompt } = body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: 'No images provided for processing' },
        { status: 400 }
      );
    }

    // Limit to maximum 20 images per batch request (Sonnet 4 limitation)
    if (images.length > 20) {
      return NextResponse.json(
        { error: 'Maximum 20 images allowed per batch. Use the generate-report endpoint for larger batches.' },
        { status: 400 }
      );
    }

    // Return a simple success response for now
    return NextResponse.json({
      success: true,
      message: 'Batch processing endpoint ready',
      totalImages: images.length,
      systemPrompt: systemPrompt || 'default'
    });

  } catch (error) {
    console.error('Batch processing error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process image batches',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get('batchId');

    if (!batchId) {
      return NextResponse.json(
        { error: 'Batch ID is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      batchId,
      status: 'This endpoint would return batch status from database',
      message: 'Batch status endpoint - implement with database integration'
    });

  } catch (error) {
    console.error('Get batch status error:', error);
    return NextResponse.json(
      { error: 'Failed to get batch status' },
      { status: 500 }
    );
  }
}