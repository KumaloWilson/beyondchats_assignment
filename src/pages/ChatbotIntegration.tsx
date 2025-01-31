import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { MessageSquare, Code, Mail, CheckCircle, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

export const ChatbotIntegration = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [integrationStep, setIntegrationStep] = useState<'options' | 'code' | 'success'>('options');

  const handleTestIntegration = () => {
    setShowSuccess(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const copyIntegrationCode = () => {
    const code = `<script src="https://cdn.beyondchats.com/widget.js"></script>
<script>
  window.BeyondChats.init({
    organizationId: 'YOUR_ORG_ID',
    theme: 'light'
  });
</script>`;

    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const sendEmailInstructions = () => {
    toast.success('Integration instructions sent to your developer!');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-2">
              {integrationStep === 'success' ? 'Integration Successful!' : 'Chatbot Integration'}
            </h2>
            <p className="text-gray-600">
              {integrationStep === 'success'
                ? 'Your chatbot is now ready to use'
                : 'Choose how you want to integrate your chatbot'}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {integrationStep === 'options' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl border border-gray-200 bg-white text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Test Chatbot</h3>
                  <p className="text-sm text-gray-600">
                    Preview how your chatbot will look and function on your website
                  </p>
                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={() => handleTestIntegration()}
                  >
                    Test Now
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl border border-gray-200 bg-white text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <Code className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Integration Code</h3>
                  <p className="text-sm text-gray-600">
                    Get the code snippet to add the chatbot to your website
                  </p>
                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={() => setIntegrationStep('code')}
                  >
                    View Code
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl border border-gray-200 bg-white text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Email Instructions</h3>
                  <p className="text-sm text-gray-600">
                    Send integration instructions to your development team
                  </p>
                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={sendEmailInstructions}
                  >
                    Send Email
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {integrationStep === 'code' && (
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
                  <Button
                    variant="secondary"
                    onClick={() => setIntegrationStep('options')}
                  >
                    Back
                  </Button>
                  <Button
                    variant="gradient"
                    onClick={copyIntegrationCode}
                    icon={<Code className="w-5 h-5" />}
                  >
                    Copy Code
                  </Button>
                </div>
              </motion.div>
            )}

            {integrationStep === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>

                <div className="space-y-6">
                  <Button
                    variant="gradient"
                    className="w-full"
                    icon={<MessageSquare className="w-5 h-5" />}
                  >
                    Explore Admin Panel
                  </Button>

                  <Button
                    variant="secondary"
                    className="w-full"
                    icon={<Share2 className="w-5 h-5" />}
                  >
                    Share on Social Media
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Layout>
  );
};