import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import { IntegrationCode } from '../components/intergration_code';
import { IntegrationFailed } from '../components/intergration_failed';
import { IntegrationOptions } from '../components/intergration_option';
import { IntegrationSuccess } from '../components/intergration_success';
import { TestWebsite } from '../components/test_site';
import { Layout } from '../../../components/Layout';

export const INTEGRATION_STATES = {
  NOT_STARTED: 'not_started',
  DETECTING: 'detecting',
  SUCCESS: 'success',
  FAILED: 'failed'
};

export const ChatbotIntegration = () => {
  const [integrationStep, setIntegrationStep] = useState('options');
  const [integrationState, setIntegrationState] = useState(INTEGRATION_STATES.NOT_STARTED);

  const handleTestIntegration = () => {
    setIntegrationState(INTEGRATION_STATES.DETECTING);

    // Simulate integration detection
    setTimeout(() => {
      const randomSuccess = Math.random() > 0.2;
      if (randomSuccess) {
        setIntegrationState(INTEGRATION_STATES.SUCCESS);
      } else {
        setIntegrationState(INTEGRATION_STATES.FAILED);
      }
    }, 2000);
  };

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
        return <IntegrationSuccess />;

      case INTEGRATION_STATES.FAILED:
        return (
          <IntegrationFailed
            onRetry={handleTestIntegration}
            onReviewCode={() => setIntegrationStep('integration-code')}
          />
        );
    }
  };

  return (
    <Layout>
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
            {integrationStep === 'options' && (
              <IntegrationOptions onOptionSelect={setIntegrationStep} />
            )}
            {integrationStep === 'integration-code' && (
              <IntegrationCode onBack={() => setIntegrationStep('options')} />
            )}
            {integrationStep === 'test-website' && (
              <TestWebsite
                onBack={() => setIntegrationStep('options')}
                onContinue={() => setIntegrationStep('integration-detection')}
              />
            )}
            {integrationStep === 'integration-detection' && renderIntegrationDetection()}
          </AnimatePresence>
        </div>
      </div>

    </Layout>
  );
};