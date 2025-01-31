import React, { useState, } from 'react';
import { motion, } from 'framer-motion';
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
  RefreshCw,
  Database,
  TrendingUp,
  Tag,
  BookOpen,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { WebPage, WebsiteAnalysis, OrganizationData } from '../types';

export const SetupOrganization: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [webPages, setWebPages] = useState<WebPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<WebPage | null>(null);
  const [trainingStatus, setTrainingStatus] = useState<'not_started' | 'in_progress' | 'completed' | 'failed'>('not_started');
  const [websiteAnalysis, setWebsiteAnalysis] = useState<WebsiteAnalysis | null>(null);

  const [formData, setFormData] = useState<OrganizationData>({
    name: '',
    website: '',
    description: '',
    metaDescription: '',
    industry: '',
    keywords: [],
  });

  // Advanced meta description and website insights fetch
  const fetchWebsiteInsights = async (url: string) => {
    // Simulate advanced website insights
    const insights: { [key: string]: any } = {
      'https://example.com': {
        metaDescription: 'Leading technology solutions for modern businesses',
        industry: 'Technology',
        keywords: ['innovation', 'digital transformation', 'software solutions'],
        primaryTopics: ['Cloud Computing', 'AI', 'Enterprise Solutions']
      },
      'https://acmecorp.com': {
        metaDescription: 'Innovative solutions driving business transformation',
        industry: 'Business Consulting',
        keywords: ['strategy', 'optimization', 'growth'],
        primaryTopics: ['Business Strategy', 'Digital Marketing', 'Process Improvement']
      }
    };

    const result = insights[url] || {
      metaDescription: 'Company description not available',
      industry: 'Unspecified',
      keywords: [],
      primaryTopics: []
    };

    setFormData(prev => ({
      ...prev,
      metaDescription: result.metaDescription,
      industry: result.industry,
      keywords: result.keywords,
    }));

    const analysis: WebsiteAnalysis = {
      totalPages: 15,
      scrapedPages: 0,
      primaryTopics: result.primaryTopics,
      keywordFrequency: result.keywords.reduce((acc, keyword) => ({ ...acc, [keyword]: Math.floor(Math.random() * 50) }), {}),
      estimatedTrainingCompletion: 0
    };

    setWebsiteAnalysis(analysis);

    toast.success('Website insights fetched successfully!');
  };

  const handleWebsiteBlur = () => {
    if (formData.website) {
      fetchWebsiteInsights(formData.website);
    }
  };

  const handleScanWebsite = async () => {
    if (!formData.website) {
      toast.error('Please enter a website URL');
      return;
    }

    setScanning(true);
    setTrainingStatus('in_progress');
    setWebPages([]);


    const dummyPages: WebPage[] = [
      {
        url: '/',
        status: 'scraped',
        progress: 100,
        metaData: {
          title: 'Home',
          description: 'Welcome to our company',
          language: 'English',
          primaryTopic: 'Company Overview'
        },
        chunks: [
          {
            id: '1',
            content: 'We are a leading innovator in technology solutions',
            confidence: 0.95,
            source: 'homepage main text',
            keywords: ['innovation', 'technology', 'solutions'],
            entityType: 'about',
            type: 'text'
          }
        ],
        id: ''
      },
      {
        url: '/about',
        status: 'scraped',
        progress: 100,
        metaData: {
          title: 'About Us',
          description: 'Learn about our mission',
          language: 'English',
          primaryTopic: 'Company Mission'
        },
        chunks: [
          {
            id: '2',
            content: 'Our mission is to deliver cutting-edge solutions',
            confidence: 0.92,
            source: 'mission statement',
            keywords: ['mission', 'solutions', 'cutting-edge'],
            entityType: 'about',
            type: 'text'
          }
        ],
        id: ''
      },
      {
        url: '/products',
        status: 'pending',
        progress: 45,
        metaData: {
          title: 'Our Products',
          description: 'Explore our product lineup',
          language: 'English',
          primaryTopic: 'Product Catalog'
        },
        id: ''
      },
      {
        url: '/contact',
        status: 'failed',
        progress: 0,
        metaData: {
          title: 'Contact Us',
          description: 'Get in touch with our team',
          language: 'English',
          primaryTopic: 'Customer Support'
        },
        id: ''
      },
    ];

    // More realistic progressive loading and training
    const updateProgress = async () => {
      for (let i = 0; i < dummyPages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWebPages(prev => [...prev, dummyPages[i]]);

        // Update website analysis progressively
        setWebsiteAnalysis(prev => prev ? {
          ...prev,
          scrapedPages: i + 1,
          estimatedTrainingCompletion: Math.floor(((i + 1) / dummyPages.length) * 100)
        } : null);
      }
    };

    await updateProgress();

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

  // Render scraped page chunks with enhanced visualization
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
          <motion.div
            key={chunk.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-100 p-3 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Source: {chunk.source}
              </span>
              <div className="flex items-center space-x-2">
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
                {chunk.entityType && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {chunk.entityType}
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-800">{chunk.content}</p>
            {chunk.keywords.length > 0 && (
              <div className="mt-2 flex space-x-2">
                {chunk.keywords.map(keyword => (
                  <span
                    key={keyword}
                    className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
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

  const renderWebsiteAnalysis = () => {
    if (!websiteAnalysis) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 bg-white rounded-xl shadow-md p-6 border border-gray-100"
      >
        <h4 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
          <TrendingUp className="mr-3 text-indigo-600" /> Website Analysis
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Database className="text-blue-600" />
              <span>Total Pages: {websiteAnalysis.totalPages}</span>
            </div>
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle2 className="text-green-600" />
              <span>Scraped Pages: {websiteAnalysis.scrapedPages}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Tag className="text-purple-600" />
              <span>Primary Topics: {websiteAnalysis.primaryTopics.join(', ')}</span>
            </div>
          </div>
          <div>
            <h5 className="text-lg font-medium mb-2 text-gray-800 flex items-center">
              <BookOpen className="mr-2 text-amber-600" /> Keyword Frequency
            </h5>
            <div className="space-y-2">
              {Object.entries(websiteAnalysis.keywordFrequency).map(([keyword, frequency]) => (
                <div key={keyword} className="flex justify-between">
                  <span className="text-sm text-gray-700">{keyword}</span>
                  <span className="text-sm text-gray-500">{frequency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${websiteAnalysis.estimatedTrainingCompletion}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          Training Progress: {websiteAnalysis.estimatedTrainingCompletion}%
        </p>
      </motion.div>
    );
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
              label="Industry"
              type="text"
              icon={<Building2 className="w-5 h-5" />}
              placeholder="Technology, Consulting, etc."
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            />

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
              type="textarea"
              required
              icon={<FileText className="w-5 h-5" />}
              placeholder="Brief description of your organization"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            {formData.keywords && formData.keywords.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detected Keywords
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
                  className={`p-4 rounded-lg border cursor-pointer ${page.status === 'scraped'
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

          {/* Website Analysis Section */}
          {websiteAnalysis && renderWebsiteAnalysis()}

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