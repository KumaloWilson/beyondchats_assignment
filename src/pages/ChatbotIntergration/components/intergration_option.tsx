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