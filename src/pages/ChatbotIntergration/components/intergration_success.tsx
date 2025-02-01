import { motion } from "framer-motion";
import { CheckCircle, ExternalLink, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import Confetti from 'react-confetti';

const SOCIAL_PLATFORMS = [
    { name: 'Twitter', color: 'text-blue-400' },
    { name: 'Facebook', color: 'text-blue-600' },
    { name: 'LinkedIn', color: 'text-blue-700' }
];

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