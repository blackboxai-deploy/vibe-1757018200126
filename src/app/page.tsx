export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Assisted Radiology Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced medical image analysis powered by Claude Sonnet 4. 
            Upload up to 200 images including DICOM files for comprehensive diagnostic reports.
          </p>
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Platform Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">File Processing</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bulk upload (up to 200 images)</li>
                    <li>• DICOM file support</li>
                    <li>• Automatic conversion</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">AI Analysis</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Claude Sonnet 4 powered</li>
                    <li>• Batch processing (20 images)</li>
                    <li>• Professional reports</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            <p><strong>Important:</strong> This is an AI-assisted platform. All results should be reviewed by qualified medical professionals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}