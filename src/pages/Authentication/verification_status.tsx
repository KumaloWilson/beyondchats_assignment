import React from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';

interface VerificationStatusProps {
    isVerified: boolean;
    email: string;
}

export const VerificationStatus = ({ isVerified, email }: VerificationStatusProps) => {
    return (
        <div className="text-center space-y-6">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex justify-center"
            >
                {isVerified ? (
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <CheckCircle className="w-20 h-20 text-green-500" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -bottom-2 -right-2 bg-white rounded-full p-1"
                        >
                            <Mail className="w-6 h-6 text-green-500" />
                        </motion.div>
                    </div>
                ) : (
                    <Mail className="w-20 h-20 text-violet-500" />
                )}
            </motion.div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                    {isVerified ? 'Email Verified!' : 'Verify your email'}
                </h2>
                <p className="text-gray-600">
                    {isVerified
                        ? 'Your email has been successfully verified'
                        : `We sent a verification link to ${email}`}
                </p>
            </div>
        </div>
    );
};