import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Sparkles, } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SiGoogle } from 'react-icons/si';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, googleSignIn } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(formData.email, formData.password);
      navigate('/setup-organization');
      toast.success('Welcome back!');
    } catch (error) {
      toast.error('Invalid credentials');
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

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-center space-y-3"
          >
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-violet-500" />
              Welcome Back
            </h2>
            <p className="text-gray-600 font-medium">
              Great to see you again! Let's get you signed in.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-5">
              <Input
                label="Email"
                type="email"
                required
                icon={<Mail className="w-5 h-5 text-violet-500" />}
                placeholder="Enter your work email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white border-gray-300 focus:border-violet-500 focus:ring-violet-500 rounded-md shadow-sm"
              />
              <Input
                label="Password"
                type="password"
                required
                icon={<Lock className="w-5 h-5 text-violet-500" />}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white border-gray-300 focus:border-violet-500 focus:ring-violet-500 rounded-md shadow-sm"
              />

            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                loading={loading}
              >
                {loading ? 'Signing in...' : 'Log In'}
              </Button>

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
            </div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-gray-600"
          >
            Don't have an account?{' '}
            <a
              href="/register"
              className="font-semibold text-violet-600 hover:text-violet-500 transition-colors duration-300 ease-in-out"
            >
              Sign up
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;