import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { SiGoogle } from 'react-icons/si';

export const Register = () => {
  const [step,] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, googleSignIn } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    verificationCode: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (step === 1) {
        await signUp(formData.email, formData.password, formData.name);
        navigate('/email/verification');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/setup-organization');
    } catch (error) {
      toast.error('Failed to sign in with Google');
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200 via-transparent to-transparent"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          type: "spring",
          bounce: 0.4
        }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/80 backdrop-blur-2xl shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100/50 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500"></div>

          {/* Progress Indicator */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center space-x-2 mb-2"
            >
              <div className="w-3 h-3 rounded-full bg-violet-600" />
              <div className="w-3 h-3 rounded-full bg-gray-200" />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-center space-y-3"
          >
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-violet-500" />
              {step === 1 ? 'Create Account' : 'Verify Email'}
            </h2>
            <p className="text-gray-600 font-medium">
              {step === 1
                ? 'Join BeyondChats and start connecting'
                : 'Enter the verification code sent to your email'
              }
            </p>
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.form
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {step === 1 ? (
                <div className="space-y-5">
                  <Input
                    label="Full Name"
                    type="text"
                    required
                    icon={<User className="w-5 h-5 text-violet-500" />}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-50/50 border-gray-200 focus:border-violet-500 focus:ring-violet-500 rounded-xl shadow-sm"
                  />
                  <Input
                    label="Email"
                    type="email"
                    required
                    icon={<Mail className="w-5 h-5 text-violet-500" />}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-gray-50/50 border-gray-200 focus:border-violet-500 focus:ring-violet-500 rounded-xl shadow-sm"
                  />
                  <Input
                    label="Password"
                    type="password"
                    required
                    icon={<Lock className="w-5 h-5 text-violet-500" />}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-gray-50/50 border-gray-200 focus:border-violet-500 focus:ring-violet-500 rounded-xl shadow-sm"
                  />
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex justify-center mb-4">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="w-20 h-20 text-violet-500" />
                    </motion.div>
                  </div>
                  <Input
                    label="Verification Code"
                    type="text"
                    required
                    placeholder="Enter 6-digit code"
                    value={formData.verificationCode}
                    onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                    className="bg-gray-50/50 border-gray-200 focus:border-violet-500 focus:ring-violet-500 rounded-xl text-center text-lg tracking-wider shadow-sm"
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                loading={loading}
                icon={step === 1 ? <ArrowRight className="w-5 h-5 ml-2" /> : null}
              >
                {step === 1 ? 'Continue' : 'Complete Registration'}
              </Button>
            </motion.form>
          </AnimatePresence>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="space-y-6"
            >
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <Button
                variant="secondary"
                className="w-full border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                onClick={handleGoogleSignIn}
                icon={<SiGoogle className="w-5 h-5 mr-2" />}
              >
                Continue with Google
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="font-semibold text-violet-600 hover:text-violet-500 transition-colors duration-300 ease-in-out"
                >
                  Sign in
                </a>
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Register;