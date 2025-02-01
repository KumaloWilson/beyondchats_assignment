import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { sendEmailVerification } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { VerificationStatus } from './verification_status';

export const EmailVerification = () => {
    const [verificationSent, setVerificationSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }

        if (user?.emailVerified) {
            setIsVerified(true);
        }

        // Polling function to check for verification
        const interval = setInterval(async () => {
            if (user && !user.emailVerified) {
                await user.firebaseUser.reload(); // Reload user data from Firebase
                if (user.firebaseUser.emailVerified) {
                    setIsVerified(true);
                    toast.success("Email verified! Redirecting...");
                    setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
                }
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [user, loading, navigate]);

    const handleResendVerification = async () => {
        try {
            if (user?.firebaseUser) {
                await sendEmailVerification(user.firebaseUser);
                setVerificationSent(true);
                toast.success('Verification email sent!');
            }
        } catch (error) {
            toast.error('Failed to send verification email');
        }
    };

    const handleProceedToHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-white/80 backdrop-blur-2xl shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100/50">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-t-3xl" />

                    <VerificationStatus
                        isVerified={isVerified}
                        email={user?.email || ''}
                    />

                    {!isVerified && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
                            <Button
                                onClick={handleResendVerification}
                                disabled={verificationSent}
                                className="w-full bg-gray-50/50 border-gray-200 focus:border-violet-500 focus:ring-violet-500 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                                icon={<RefreshCw className="w-5 h-5" />}
                            >
                                Resend Verification Email
                            </Button>
                            <p className="text-sm text-center text-gray-500">
                                {verificationSent
                                    ? "Verification email sent! Please check your inbox."
                                    : "Didn't receive the email? Click above to resend"}
                            </p>
                        </motion.div>
                    )}

                    {isVerified && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                onClick={handleProceedToHome}
                                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                                icon={<ArrowRight className="w-5 h-5" />}
                            >
                                Proceed to Home
                            </Button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default EmailVerification;
