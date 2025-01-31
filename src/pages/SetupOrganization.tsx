import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {
  Building2,
  Globe,
  FileText,
  Loader2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Info,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

// Enhanced interfaces for more detailed web scraping
interface WebPageChunk {
  id: string;
  content: string;
  confidence: number;
  source: string;
}

interface WebPage {
  url: string;
  status: 'pending' | 'scraped' | 'failed';
  progress: number;
  chunks?: WebPageChunk[];
  metaData?: {
    title?: string;
    description?: string;
  };
}

interface OrganizationData {
  name: string;
  website: string;
  description: string;
  metaDescription?: string;
}

export const SetupOrganization: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [webPages, setWebPages] = useState<WebPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<WebPage | null>(null);
  const [trainingStatus, setTrainingStatus] = useState<'not_started' | 'in_progress' | 'completed' | 'failed'>('not_started');

  const [formData, setFormData] = useState<OrganizationData>({
    name: '',
    website: '',
    description: '',
    metaDescription: '',
  });

  // Dummy meta description fetch
  const fetchMetaDescription = (url: string) => {
    // Predefined dummy meta descriptions
    const metaDescriptions: { [key: string]: string } = {
      'https://example.com': 'Leading technology solutions for modern businesses',
      'https://acmecorp.com': 'Innovative solutions driving business transformation',
      'https://techcompany.com': 'Cutting-edge technology and digital innovation'
    };

    const description = metaDescriptions[url] || 'Company description not available';

    setFormData(prev => ({
      ...prev,
      metaDescription: description,
    }));

    toast.success('Meta description fetched successfully!');
  };

  const handleWebsiteBlur = () => {
    if (formData.website) {
      fetchMetaDescription(formData.website);
    }
  };

  // Simulate website scanning and training
  const handleScanWebsite = async () => {
    if (!formData.website) {
      toast.error('Please enter a website URL');
      return;
    }

    setScanning(true);
    setTrainingStatus('in_progress');
    setWebPages([]);

    // Dummy pages with simulated training
    const dummyPages: WebPage[] = [
      {
        url: '/',
        status: 'scraped',
        progress: 100,
        metaData: { title: 'Home', description: 'Welcome to our company' },
        chunks: [
          {
            id: '1',
            content: 'We are a leading innovator in technology solutions',
            confidence: 0.95,
            source: 'homepage main text'
          }
        ]
      },
      {
        url: '/about',
        status: 'scraped',
        progress: 100,
        metaData: { title: 'About Us', description: 'Learn about our mission' },
        chunks: [
          {
            id: '2',
            content: 'Our mission is to deliver cutting-edge solutions',
            confidence: 0.92,
            source: 'mission statement'
          }
        ]
      },
      {
        url: '/products',
        status: 'pending',
        progress: 45,
        metaData: { title: 'Our Products', description: 'Explore our product lineup' }
      },
      {
        url: '/contact',
        status: 'failed',
        progress: 0,
        metaData: { title: 'Contact Us', description: 'Get in touch with our team' }
      },
    ];

    // Simulate progressive loading and training
    for (let i = 0; i < dummyPages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWebPages(prev => [...prev, dummyPages[i]]);
    }

    // Simulate training completion
    await new Promise(resolve => setTimeout(resolve, 2000));
    setScanning(false);
    setTrainingStatus('completed');
  };

  // Retry training if previous attempt failed
  const handleRetryTraining = () => {
    setWebPages([]);
    setTrainingStatus('not_started');
    handleScanWebsite();
  };

  // Submit and proceed to next step
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form and training
    if (trainingStatus !== 'completed') {
      toast.error('Please complete website training');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      navigate('/chatbot-integration', {
        state: {
          organizationData: formData,
          webPages
        }
      });

      toast.success('Organization setup complete!');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Render scraped page chunks
  const renderPageChunks = () => {
    if (!selectedPage || !selectedPage.chunks) {
      return (
        <div className="text-center text-gray-500 py-4">
          <Info className="mx-auto mb-2 w-8 h-8" />
          No content chunks available for this page.
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {selectedPage.chunks.map((chunk) => (
          <div
            key={chunk.id}
            className="bg-gray-100 p-3 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Source: {chunk.source}
              </span>
              <span
                className={`text-sm font-semibold ${chunk.confidence > 0.9
                  ? 'text-green-600'
                  : chunk.confidence > 0.7
                    ? 'text-yellow-600'
                    : 'text-red-600'
                  }`}
              >
                Confidence: {(chunk.confidence * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-gray-800">{chunk.content}</p>
          </div>
        ))}
      </div>
    );
  };

  // Training status UI
  const renderTrainingStatus = () => {
    switch (trainingStatus) {
      case 'not_started':
        return (
          <div className="text-center text-gray-500 py-8">
            <Globe className="mx-auto mb-4 w-12 h-12 text-gray-400" />
            Scan your website to start training
          </div>
        );
      case 'in_progress':
        return (
          <div className="text-center text-yellow-600 py-8">
            <Loader2 className="mx-auto mb-4 w-12 h-12 animate-spin" />
            Training in progress... Please wait
          </div>
        );
      case 'completed':
        return (
          <div className="text-center text-green-600 py-8">
            <CheckCircle2 className="mx-auto mb-4 w-12 h-12" />
            Training completed successfully!
          </div>
        );
      case 'failed':
        return (
          <div className="text-center text-red-600 py-8">
            <XCircle className="mx-auto mb-4 w-12 h-12" />
            Training failed
            <Button
              onClick={handleRetryTraining}
              variant="secondary"
              className="mt-4"
              icon={<RefreshCw className="mr-2" />}
            >
              Retry Training
            </Button>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Organization Setup Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          <motion.div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-2">
              Set Up Your Organization
            </h2>
            <p className="text-gray-600">
              Configure your chatbot with organizational details
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <Input
              label="Organization Name"
              type="text"
              required
              icon={<Building2 className="w-5 h-5" />}
              placeholder="Acme Inc."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <div className="space-y-2">
              <Input
                label="Website URL"
                type="url"
                required
                icon={<Globe className="w-5 h-5" />}
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                onBlur={handleWebsiteBlur}
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleScanWebsite}
                loading={scanning}
                disabled={trainingStatus === 'in_progress'}
                className="ml-auto"
              >
                Scan Website
              </Button>
            </div>

            <Input
              label="Meta Description"
              type="text"
              icon={<Info className="w-5 h-5" />}
              placeholder="Automatically fetched description"
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            />

            <Input
              label="Organization Description"
              type="text"
              required
              icon={<FileText className="w-5 h-5" />}
              placeholder="Brief description of your organization"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                variant="gradient"
                loading={loading}
                icon={<ArrowRight className="w-5 h-5" />}
                disabled={trainingStatus !== 'completed'}
              >
                Continue to Integration
              </Button>
            </div>
          </motion.form>
        </motion.div>

        {/* Website Scraping & Training Progress */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            Website Training Progress
          </h3>

          {renderTrainingStatus()}

          {webPages.length > 0 && (
            <div className="space-y-4">
              {webPages.map((page, index) => (
                <motion.div
                  key={page.url}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${page.status === 'scraped'
                    ? 'border-green-200 bg-green-50'
                    : page.status === 'pending'
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-red-200 bg-red-50'
                    }`}
                  onClick={() => setSelectedPage(page)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-800 font-medium">{page.url}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {page.status === 'pending' && (
                        <>
                          <Loader2 className="w-5 h-5 text-yellow-600 animate-spin" />
                          <span className="text-sm text-yellow-600">{page.progress}%</span>
                        </>
                      )}
                      {page.status === 'scraped' && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                      {page.status === 'failed' && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </div>
                  {page.metaData && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p><strong>Title:</strong> {page.metaData.title}</p>
                      <p><strong>Description:</strong> {page.metaData.description}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Detailed Page Content View */}
          {selectedPage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <h4 className="text-lg font-semibold mb-4 text-gray-900">
                Scraped Content: {selectedPage.url}
              </h4>
              {renderPageChunks()}
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default SetupOrganization;