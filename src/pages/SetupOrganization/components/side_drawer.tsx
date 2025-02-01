import {
    Tag,
    FileText,
    Link,
    BarChart2,
    Clock,
    AlertCircle,
    X
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface WebpageChunksDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    webpage?: {
        url?: string;
    };
}

export const WebpageChunksDrawer = ({ isOpen, onClose, webpage }: WebpageChunksDrawerProps) => {
    const dummyChunks = [
        {
            id: '1',
            type: 'header',
            content: 'Transform Your Business with AI-Powered Solutions',
            confidence: 0.98,
            source: 'h1.hero-title',
            keywords: ['AI', 'business transformation', 'solutions'],
            entityType: 'value_proposition',
            metadata: {
                position: 'hero section',
                importance: 'high',
                lastUpdated: '2024-01-15'
            }
        },
        {
            id: '2',
            type: 'paragraph',
            content: 'Our cutting-edge artificial intelligence solutions help businesses streamline operations, reduce costs, and drive innovation. With over 10 years of experience serving Fortune 500 companies, we deliver measurable results through custom AI implementations.',
            confidence: 0.95,
            source: 'div.hero-description',
            keywords: ['AI solutions', 'business operations', 'innovation', 'experience'],
            entityType: 'company_description',
            metadata: {
                readingTime: '30 seconds',
                wordCount: 42
            }
        },
        {
            id: '3',
            type: 'list',
            content: [
                'Predictive Analytics',
                'Machine Learning Models',
                'Natural Language Processing',
                'Computer Vision Solutions'
            ],
            confidence: 0.92,
            source: 'ul.services-list',
            keywords: ['analytics', 'machine learning', 'NLP', 'computer vision'],
            entityType: 'services',
            metadata: {
                listType: 'services',
                itemCount: 4
            }
        },
        {
            id: '4',
            type: 'testimonial',
            content: '"Implementation of their AI solution resulted in a 45% reduction in processing time and 30% cost savings for our organization." - Sarah Chen, CTO of TechCorp',
            confidence: 0.89,
            source: 'blockquote.testimonial',
            keywords: ['testimonial', 'results', 'cost savings', 'efficiency'],
            entityType: 'social_proof',
            metadata: {
                author: 'Sarah Chen',
                company: 'TechCorp',
                position: 'CTO'
            }
        },
        {
            id: '5',
            type: 'statistic',
            content: {
                value: '95%',
                label: 'Client Satisfaction Rate',
                description: 'Based on post-implementation surveys'
            },
            confidence: 0.97,
            source: 'div.stats-container',
            keywords: ['satisfaction', 'client success', 'results'],
            entityType: 'metric',
            metadata: {
                dataSource: 'Client Surveys',
                sampleSize: 500
            }
        }
    ];

    const getChunkIcon = (type: string) => {
        const icons: Record<string, typeof FileText> = {
            header: FileText,
            paragraph: FileText,
            list: Tag,
            testimonial: Link,
            statistic: BarChart2
        };
        return icons[type] || FileText;
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.9) return 'text-green-600';
        if (confidence >= 0.7) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30 }}
                        className="fixed right-0 top-0 h-full w-full md:w-2/3 lg:w-2/3 bg-white shadow-xl overflow-y-auto z-50"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Page Content Analysis</h2>
                                    <p className="text-sm text-gray-600">{webpage?.url || 'Page URL'}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {dummyChunks.map((chunk) => {
                                    const ChunkIcon = getChunkIcon(chunk.type);
                                    return (
                                        <motion.div
                                            key={chunk.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 bg-indigo-50 rounded-lg">
                                                    <ChunkIcon className="w-5 h-5 text-indigo-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-sm font-medium text-gray-900 capitalize">
                                                            {chunk.type}
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4 text-gray-400" />
                                                            <span className="text-xs text-gray-500">
                                                                {chunk.metadata?.lastUpdated || 'N/A'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        {typeof chunk.content === 'string' ? (
                                                            <p className="text-gray-700">{chunk.content}</p>
                                                        ) : Array.isArray(chunk.content) ? (
                                                            <ul className="list-disc list-inside text-gray-700">
                                                                {chunk.content.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <div className="text-gray-700">
                                                                <div className="text-2xl font-bold">{chunk.content.value}</div>
                                                                <div className="text-sm">{chunk.content.label}</div>
                                                                <div className="text-xs text-gray-500">{chunk.content.description}</div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <div className="text-gray-500 mb-1">Keywords</div>
                                                            <div className="flex flex-wrap gap-1">
                                                                {chunk.keywords.map((keyword, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                                                                    >
                                                                        {keyword}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-gray-500 mb-1">Metadata</div>
                                                            <div className="space-y-1">
                                                                {Object.entries(chunk.metadata).map(([key, value]) => (
                                                                    <div key={key} className="text-xs text-gray-600">
                                                                        <span className="font-medium">{key.replace(/_/g, ' ')}</span>: {value}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
                                                        <div className="flex items-center gap-2">
                                                            <AlertCircle className="w-4 h-4 text-gray-400" />
                                                            <span className="text-xs text-gray-500">Source: {chunk.source}</span>
                                                        </div>
                                                        <div className={`flex items-center gap-1 ${getConfidenceColor(chunk.confidence)}`}>
                                                            <BarChart2 className="w-4 h-4" />
                                                            <span className="text-xs font-medium">
                                                                {(chunk.confidence * 100).toFixed(1)}% confidence
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};