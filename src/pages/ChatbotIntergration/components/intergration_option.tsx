import { motion } from 'framer-motion';
import { MessageSquare, Code, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { OptionCard } from './option_card';

interface IntegrationOptionsProps {
    onOptionSelect: (option: string) => void;
}

export const IntegrationOptions = ({ onOptionSelect }: IntegrationOptionsProps) => (
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


