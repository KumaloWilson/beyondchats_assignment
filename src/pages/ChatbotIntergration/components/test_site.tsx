export const TestWebsite = ({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) => (
    <div className="space-y-4">
        <div className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-white shadow-sm p-4 flex justify-between items-center">
                <h3 className="font-semibold">Sample Company Website</h3>
                <button onClick={onBack} className="text-sm text-red-500 hover:underline">
                    Exit Preview
                </button>
            </div>

            <div className="mt-16 p-6 text-center">
                <div className="fixed bottom-8 right-8 w-80 bg-white shadow-xl rounded-lg p-4 border">
                    <div className="chatbot-widget">
                        <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                        <p className="text-sm text-gray-600 mb-4">I'm here to assist you!</p>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full border rounded-lg p-2 text-sm"
                        />
                    </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4" role="alert">
                    <p className="text-yellow-700">
                        Chatbot not working as intended?{' '}
                        <button className="underline text-yellow-900">Share Feedback</button>
                    </p>
                </div>
            </div>
        </div>

        <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90"
        >
            Continue to Integration Detection
        </button>
    </div>
);