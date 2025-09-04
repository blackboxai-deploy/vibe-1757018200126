import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60; // 1 minute timeout for file uploads (within Vercel limits)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    // Validate total number of files
    if (files.length > 200) {
      return NextResponse.json(
        { error: 'Maximum 200 files allowed per upload' },
        { status: 400 }
      );
    }

    // Simple validation - check file extensions
    const validExtensions = ['.dcm', '.dicom', '.png', '.jpg', '.jpeg', '.bmp', '.tiff'];
    const processedFiles = [];
    const errors = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.toLowerCase();
      const hasValidExtension = validExtensions.some(ext => extension.endsWith(ext));
      
      if (!hasValidExtension) {
        errors.push(`File ${file.name}: Invalid file type. Supported formats: DICOM, PNG, JPG, JPEG, BMP, TIFF`);
        continue;
      }

      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        errors.push(`File ${file.name}: File size too large. Maximum size is 100MB per file`);
        continue;
      }

      processedFiles.push({
        id: `img_${Date.now()}_${i}`,
        originalName: file.name,
        fileSize: file.size,
        fileType: extension.endsWith('.dcm') || extension.endsWith('.dicom') ? 'DICOM' : 'IMAGE',
        uploadedAt: new Date().toISOString()
      });
    }

    if (processedFiles.length === 0) {
      return NextResponse.json(
        { error: 'No files could be processed successfully', errors },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully validated ${processedFiles.length} files`,
      images: processedFiles,
      errors: errors.length > 0 ? errors : undefined,
      summary: {
        totalFiles: files.length,
        successful: processedFiles.length,
        failed: errors.length,
        dicomFiles: processedFiles.filter(img => img.fileType === 'DICOM').length,
        regularImages: processedFiles.filter(img => img.fileType === 'IMAGE').length
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process uploads' },
      { status: 500 }
    );
  }
}