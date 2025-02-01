import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Globe,
    Loader2,
    CheckCircle2,
    XCircle,
    TrendingUp,
    Database,
    Tag,
    BookOpen,
    RefreshCw
} from 'lucide-react';
import { Button } from '../../../components/Button';
import { WebPage, WebsiteAnalysis } from '../../../types';
import { WebpageChunksDrawer } from './side_drawer';

interface WebsiteTrainingProgressProps {
    webPages: WebPage[];
    websiteAnalysis: WebsiteAnalysis | null;
    trainingStatus: 'not_started' | 'in_progress' | 'completed' | 'failed';
    onRetryTraining: () => void;
    onPageSelect: (page: WebPage) => void;
}

export const WebsiteTrainingProgress: React.FC<WebsiteTrainingProgressProps> = ({
    webPages,
    websiteAnalysis,
    trainingStatus,
    onRetryTraining,
    onPageSelect
}) => {
    const [selectedPage, setSelectedPage] = useState<WebPage | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handlePageClick = (page: WebPage) => {
        setSelectedPage(page);
        setIsDrawerOpen(true);
        onPageSelect(page);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedPage(null);
    };

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
                            onClick={onRetryTraining}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-4 md:p-8 border border-gray-100"
        >
            <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">
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
                            className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${page.status === 'scraped'
                                    ? 'border-green-200 bg-green-50'
                                    : page.status === 'pending'
                                        ? 'border-yellow-200 bg-yellow-50'
                                        : 'border-red-200 bg-red-50'
                                }`}
                            onClick={() => handlePageClick(page)}
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

            {websiteAnalysis && renderWebsiteAnalysis()}

            <WebpageChunksDrawer
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                webpage={selectedPage}
            />
        </motion.div>
    );
};

export default WebsiteTrainingProgress;