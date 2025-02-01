// IntegrationOptions.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Code, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export const IntegrationOptions = ({ onOptionSelect }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
        <OptionCard
            icon={<MessageSquare className="w-6 h-6 text-indigo-600" />}
            title="Test Chatbot"
            description="Preview how your chatbot will look and function on a sample website"
            onClick={() => onOptionSelect('test-website')}
        />

        <OptionCard
            icon={<Code className="w-6 h-6 text-indigo-600" />}
            title="Integration Code"
            description="Get the code snippet to add the chatbot to your website"
            onClick={() => onOptionSelect('integration-code')}
        />

        <OptionCard
            icon={<Mail className="w-6 h-6 text-indigo-600" />}
            title="Email Instructions"
            description="Send integration instructions to your development team"
            onClick={() => toast.success('Instructions sent to developer!')}
        />
    </motion.div>
);


// IntegrationCode.jsx
export const IntegrationCode = ({ onBack }) => {
    const copyCode = () => {
        const code = `<script src="https://cdn.beyondchats.com/widget.js"></script>
<script>
  window.BeyondChats.init({
    organizationId: 'YOUR_ORG_ID',
    theme: 'light'
  });
</script>`;
        navigator.clipboard.writeText(code);
        toast.success('Integration code copied to clipboard!');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm text-white">
                <pre className="whitespace-pre-wrap">
                    {`<script src="https://cdn.beyondchats.com/widget.js"></script>
<script>
  window.BeyondChats.init({
    organizationId: 'YOUR_ORG_ID',
    theme: 'light'
  });
</script>`}
                </pre>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                    Back
                </button>
                <button
                    onClick={copyCode}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90"
                >
                    <Code className="w-5 h-5" />
                    Copy Code
                </button>
            </div>
        </motion.div>
    );
};

// IntegrationSuccess.jsx
export const IntegrationSuccess = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-center space-y-8"
    >
        <Confetti recycle={false} numberOfPieces={200} />

        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
        >
            <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-green-600">Integration Successful!</h2>
            <p className="text-gray-600">Your chatbot is now live on your website</p>

            <div className="flex flex-col space-y-4">
                <button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90"
                    onClick={() => window.open('/admin-panel', '_blank')}
                >
                    <ExternalLink className="w-5 h-5" /> Explore Admin Panel
                </button>

                <button
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
                    onClick={() => window.open('/chat', '_blank')}
                >
                    <MessageSquare className="w-5 h-5" /> Start Talking to Your Chatbot
                </button>

                <div className="flex justify-center space-x-4 pt-4">
                    {SOCIAL_PLATFORMS.map((platform) => (
                        <button
                            key={platform.name}
                            className={`p-2 rounded-full hover:bg-gray-100 ${platform.color}`}
                            onClick={() => toast.success(`Shared on ${platform.name}`)}
                        >
                            {platform.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
);

// IntegrationFailed.jsx
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