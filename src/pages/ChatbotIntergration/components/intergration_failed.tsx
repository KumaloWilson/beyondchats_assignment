export const IntegrationFailed = ({ onRetry, onReviewCode }) => (
    <div className="text-center space-y-6">
        <AlertTriangle className="w-12 h-12 text-red-600 mx-auto" />
        <h3 className="text-xl font-bold text-red-600">Integration Not Detected</h3>
        <p className="text-gray-600">
            We couldn't automatically detect your chatbot. Please check your integration code.
        </p>
        <div className="space-y-4">
            <button
                onClick={onRetry}
                className="w-full bg-red-100 text-red-600 py-3 rounded-lg hover:bg-red-200"
            >
                Retry Detection
            </button>
            <button
                onClick={onReviewCode}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100"
            >
                Review Integration Code
            </button>
        </div>
    </div>
);