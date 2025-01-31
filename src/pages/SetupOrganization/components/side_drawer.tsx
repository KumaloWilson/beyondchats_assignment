import React from 'react';
import { motion } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { WebPage } from '../../../types';

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPage: WebPage | null;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
    isOpen,
    onClose,
    selectedPage
}) => {
    if (!isOpen || !selectedPage) return null;

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 w-96 h-full bg-white shadow-xl z-50 p-6 overflow-y-auto"
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FileText className="mr-3 text-indigo-600" />
                    Scraped Content
                </h3>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium mb-2 text-gray-800">Page Details</h4>
                    <div className="space-y-2">
                        <p><strong>URL:</strong> {selectedPage.url}</p>
                        <p><strong>Title:</strong> {selectedPage.metaData?.title || 'No title'}</p>
                        <p><strong>Description:</strong> {selectedPage.metaData?.description || 'No description'}</p>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-medium mb-2 text-gray-800">Content Chunks</h4>
                    {selectedPage.chunks && selectedPage.chunks.length > 0 ? (
                        selectedPage.chunks.map((chunk) => (
                            <motion.div
                                key={chunk.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white border border-gray-200 rounded-lg p-3 mb-3"
                            >
                                <p className="text-sm text-gray-700 mb-2">{chunk.content}</p>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Source: {chunk.source}</span>
                                    <span>Confidence: {(chunk.confidence * 100).toFixed(2)}%</span>
                                </div>
                                {chunk.keywords && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {chunk.keywords.map(keyword => (
                                            <span
                                                key={keyword}
                                                className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-4">No content chunks available</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};