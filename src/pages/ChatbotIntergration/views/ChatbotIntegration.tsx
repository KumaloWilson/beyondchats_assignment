import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Code,
  Mail,
  CheckCircle,
  ExternalLink,
  RefreshCcw,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

// Dummy integration states and data
const INTEGRATION_STATES = {
  NOT_STARTED: 'not_started',
  DETECTING: 'detecting',
  SUCCESS: 'success',
  FAILED: 'failed'
};

const SOCIAL_PLATFORMS = [
  { name: 'Twitter', icon: 'twitter', color: 'text-blue-400' },
  { name: 'LinkedIn', icon: 'linkedin', color: 'text-blue-600' },
  { name: 'Facebook', icon: 'facebook', color: 'text-blue-700' }
];

export const ChatbotIntegration = () => {
  const [integrationStep, setIntegrationStep] = useState('options');
  const [integrationState, setIntegrationState] = useState(INTEGRATION_STATES.NOT_STARTED);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleTestIntegration = () => {
    setIntegrationState(INTEGRATION_STATES.DETECTING);

    // Simulate integration detection
    setTimeout(() => {
      const randomSuccess = Math.random() > 0.2;
      if (randomSuccess) {
        setIntegrationState(INTEGRATION_STATES.SUCCESS);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        setIntegrationState(INTEGRATION_STATES.FAILED);
      }
    }, 2000);
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
    toast.success('Integration code copied to clipboard!');
  };

  const renderIntegrationOptions = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Test Chatbot Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-xl border border-gray-200 bg-white text-center space-y-4"
      >
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
          <MessageSquare className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Test Chatbot</h3>
        <p className="text-sm text-gray-600">
          Preview how your chatbot will look and function on a sample website
        </p>
        <button
          onClick={() => setIntegrationStep('test-website')}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Test Now
        </button>
      </motion.div>

      {/* Integration Code Card */}
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
        <button
          onClick={() => setIntegrationStep('integration-code')}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          View Code
        </button>
      </motion.div>

      {/* Email Instructions Card */}
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
        <button
          onClick={() => toast.success('Instructions sent to developer!')}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Send Email
        </button>
      </motion.div>
    </motion.div>
  );

  const renderIntegrationCode = () => (
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
          onClick={() => setIntegrationStep('options')}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Back
        </button>
        <button
          onClick={copyIntegrationCode}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90"
        >
          <Code className="w-5 h-5" />
          Copy Code
        </button>
      </div>
    </motion.div>
  );

  const renderTestWebsite = () => (
    <div className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-full bg-white shadow-sm p-4 flex justify-between items-center">
        <h3 className="font-semibold">Sample Company Website</h3>
        <button
          onClick={() => setIntegrationStep('options')}
          className="text-sm text-red-500 hover:underline"
        >
          Exit Preview
        </button>
      </div>

      <div className="mt-16 p-6 text-center">
        <div className="fixed bottom-8 right-8 w-80 bg-white shadow-xl rounded-lg p-4 border">
          <div className="chatbot-widget">
            <h4 className="font-bold text-lg mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-4">I'm here to assist you!</p>
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full border rounded-lg p-2 text-sm"
            />
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4" role="alert">
          <p className="text-yellow-700">
            Chatbot not working as intended? <button className="underline text-yellow-900">Share Feedback</button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderIntegrationSuccess = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center space-y-8"
    >
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

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

  const renderIntegrationDetection = () => {
    switch (integrationState) {
      case INTEGRATION_STATES.NOT_STARTED:
        return (
          <div className="text-center space-y-6">
            <button
              onClick={handleTestIntegration}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90"
            >
              Start Integration Detection
            </button>
          </div>
        );

      case INTEGRATION_STATES.DETECTING:
        return (
          <div className="text-center space-y-6">
            <RefreshCcw className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
            <p className="text-gray-600">Detecting chatbot integration...</p>
          </div>
        );

      case INTEGRATION_STATES.SUCCESS:
        return renderIntegrationSuccess();

      case INTEGRATION_STATES.FAILED:
        return (
          <div className="text-center space-y-6">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto" />
            <h3 className="text-xl font-bold text-red-600">Integration Not Detected</h3>
            <p className="text-gray-600">We couldn't automatically detect your chatbot. Please check your integration code.</p>
            <div className="space-y-4">
              <button
                onClick={handleTestIntegration}
                className="w-full bg-red-100 text-red-600 py-3 rounded-lg hover:bg-red-200"
              >
                Retry Detection
              </button>
              <button
                onClick={() => setIntegrationStep('integration-code')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100"
              >
                Review Integration Code
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Chatbot Integration
          </h2>
          <p className="text-gray-600 mt-2">
            {integrationStep === 'options' && 'Choose how you want to integrate your chatbot'}
            {integrationStep === 'integration-code' && 'Copy the integration code'}
            {integrationStep === 'test-website' && 'Preview chatbot on a sample website'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {integrationStep === 'options' && renderIntegrationOptions()}
          {integrationStep === 'integration-code' && renderIntegrationCode()}
          {integrationStep === 'test-website' && renderTestWebsite()}
          {integrationStep === 'integration-detection' && renderIntegrationDetection()}
        </AnimatePresence>

        {integrationStep === 'test-website' && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setIntegrationStep('integration-detection')}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90"
            >
              Continue to Integration Detection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};