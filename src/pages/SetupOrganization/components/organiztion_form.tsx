import { motion } from 'framer-motion';
import {
    Building2,
    Globe,
    FileText,
    Info,
    ArrowRight
} from 'lucide-react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { OrganizationData } from '../../../types';

interface OrganizationFormProps {
    formData: OrganizationData;
    onFormUpdate: (data: Partial<OrganizationData>) => void;
    onWebsiteBlur: () => void;
    onScanWebsite: () => void;
    trainingStatus: 'not_started' | 'in_progress' | 'completed' | 'failed';
    scanning: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

export const OrganizationForm: React.FC<OrganizationFormProps> = ({
    formData,
    onFormUpdate,
    onWebsiteBlur,
    onScanWebsite,
    trainingStatus,
    scanning,
    onSubmit
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-4 md:p-8 border border-gray-100"
        >
            <motion.div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-2">
                    Set Up Your Organization
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                    Configure your chatbot with organizational details
                </p>
            </motion.div>

            <motion.form
                onSubmit={onSubmit}
                className="space-y-4 md:space-y-6"
            >
                <Input
                    label="Organization Name"
                    type="text"
                    required
                    icon={<Building2 className="w-5 h-5" />}
                    placeholder="Acme Inc."
                    value={formData.name}
                    onChange={(e) => onFormUpdate({ name: e.target.value })}
                />

                <div className="space-y-2">
                    <Input
                        label="Website URL"
                        type="url"
                        required
                        icon={<Globe className="w-5 h-5" />}
                        placeholder="https://example.com"
                        value={formData.website}
                        onChange={(e) => onFormUpdate({ website: e.target.value })}
                        onBlur={onWebsiteBlur}
                    />
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={onScanWebsite}
                        loading={scanning}
                        disabled={trainingStatus === 'in_progress'}
                        className="ml-auto w-full md:w-auto"
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
                    onChange={(e) => onFormUpdate({ industry: e.target.value })}
                />

                <Input
                    label="Meta Description"
                    type="text"
                    icon={<Info className="w-5 h-5" />}
                    placeholder="Automatically fetched description"
                    value={formData.metaDescription}
                    onChange={(e) => onFormUpdate({ metaDescription: e.target.value })}
                />

                <Input
                    label="Organization Description"
                    type="textarea"
                    required
                    icon={<FileText className="w-5 h-5" />}
                    placeholder="Brief description of your organization"
                    value={formData.description}
                    onChange={(e) => onFormUpdate({ description: e.target.value })}
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

                <div className="flex flex-col md:flex-row justify-end pt-4 md:pt-6 space-y-2 md:space-y-0 md:space-x-4">
                    <Button
                        type="submit"
                        variant="gradient"
                        icon={<ArrowRight className="w-5 h-5" />}
                        disabled={trainingStatus !== 'completed'}
                        className="w-full md:w-auto"
                    >
                        Continue to Integration
                    </Button>
                </div>
            </motion.form>
        </motion.div>
    );
};