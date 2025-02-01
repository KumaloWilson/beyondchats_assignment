import { motion } from "framer-motion";
import { ReactNode } from 'react';

interface OptionCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

export const OptionCard = ({ icon, title, description, onClick }: OptionCardProps) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-xl border border-gray-200 bg-white text-center space-y-4"
    >
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <button
            onClick={onClick}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
        >
            {title === "Email Instructions" ? "Send Email" : title}
        </button>
    </motion.div>
);