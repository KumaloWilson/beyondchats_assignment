import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { Layout } from '../../../components/Layout';
import { WebPage, WebsiteAnalysis, OrganizationData } from '../../../types';
import { OrganizationForm } from '../components/organiztion_form';
import { WebsiteTrainingProgress } from '../components/website_training_progress';

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

  console.log('Selected Page', selectedPage);
  console.log('loading', loading);

  // Fetch website insights
  const fetchWebsiteInsights = async (url: string) => {
    const insights: { [key: string]: unknown } = {
      'https://example.com': {
        metaDescription: 'Leading technology solutions for modern businesses',
        industry: 'Technology',
        keywords: ['innovation', 'digital transformation', 'software solutions'],
        primaryTopics: ['Cloud Computing', 'AI', 'Enterprise Solutions']
      }
    };

    type InsightResult = {
      metaDescription: string;
      industry: string;
      keywords: string[];
      primaryTopics: string[];
    };

    const result = (insights[url] || {
      metaDescription: 'Company description not available',
      industry: 'Unspecified',
      keywords: [],
      primaryTopics: []
    }) as InsightResult;

    setFormData(prev => ({
      ...prev,
      metaDescription: result.metaDescription,
      industry: result.industry,
      keywords: result.keywords,
    }));

    // Create website analysis
    const analysis: WebsiteAnalysis = {
      totalPages: 15,
      scrapedPages: 0,
      primaryTopics: result.primaryTopics,
      keywordFrequency: result.keywords.reduce((acc, keyword) => ({
        ...acc,
        [keyword]: Math.floor(Math.random() * 50)
      }), {}),
      estimatedTrainingCompletion: 0
    };

    setWebsiteAnalysis(analysis);
    toast.success('Website insights fetched successfully!');
  };

  // Handle website scanning
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


    // Simulate progressive loading
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

  // Handle form submission
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

  // Handle retry training
  const handleRetryTraining = () => {
    setWebPages([]);
    setTrainingStatus('not_started');
    handleScanWebsite();
  };

  // Handle form data updates
  const handleFormUpdate = (updates: Partial<OrganizationData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Handle page selection
  const handlePageSelect = (page: WebPage) => {
    setSelectedPage(page);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4">
        <OrganizationForm
          formData={formData}
          onFormUpdate={handleFormUpdate}
          onWebsiteBlur={() => fetchWebsiteInsights(formData.website)}
          onScanWebsite={handleScanWebsite}
          trainingStatus={trainingStatus}
          scanning={scanning}
          onSubmit={handleSubmit}
        />

        <WebsiteTrainingProgress
          webPages={webPages}
          websiteAnalysis={websiteAnalysis}
          trainingStatus={trainingStatus}
          onRetryTraining={handleRetryTraining}
          onPageSelect={handlePageSelect}
        />
      </div>
    </Layout>
  );
};

export default SetupOrganization;