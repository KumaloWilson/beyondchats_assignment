import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Building2, Globe, FileText, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface WebPage {
  url: string;
  status: 'pending' | 'scraped' | 'failed';
  progress: number;
}

export const SetupOrganization = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [webPages, setWebPages] = useState<WebPage[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    website: '',
    description: '',
  });

  const handleScanWebsite = async () => {
    if (!formData.website) {
      toast.error('Please enter a website URL');
      return;
    }

    setScanning(true);
    // Simulate website scanning
    const dummyPages: WebPage[] = [
      { url: '/', status: 'scraped', progress: 100 },
      { url: '/about', status: 'scraped', progress: 100 },
      { url: '/products', status: 'pending', progress: 45 },
      { url: '/contact', status: 'failed', progress: 0 },
    ];

    // Simulate progressive loading
    for (let i = 0; i < dummyPages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWebPages(prev => [...prev, dummyPages[i]]);
    }
    setScanning(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/chatbot-integration');
      toast.success('Organization setup complete!');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-2">
              Set Up Your Organization
            </h2>
            <p className="text-gray-600">
              Let's configure your chatbot with your organization's details
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
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
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleScanWebsite}
                loading={scanning}
                className="ml-auto"
              >
                Scan Website
              </Button>
            </div>

            <Input
              label="Organization Description"
              type="text"
              required
              icon={<FileText className="w-5 h-5" />}
              placeholder="Brief description of your organization"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            {webPages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900">Detected Pages</h3>
                <div className="space-y-3">
                  {webPages.map((page, index) => (
                    <motion.div
                      key={page.url}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white"
                    >
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{page.url}</span>
                      </div>
                      <div className="flex items-center">
                        {page.status === 'pending' && (
                          <>
                            <Loader2 className="w-5 h-5 text-indigo-600 animate-spin mr-2" />
                            <span className="text-sm text-indigo-600">Scanning... {page.progress}%</span>
                          </>
                        )}
                        {page.status === 'scraped' && (
                          <span className="text-sm text-green-600">Completed</span>
                        )}
                        {page.status === 'failed' && (
                          <span className="text-sm text-red-600">Failed</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                variant="gradient"
                loading={loading}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Continue to Integration
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </Layout>
  );
};