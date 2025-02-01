import { motion } from "framer-motion";
import { Code } from "lucide-react";
import toast from "react-hot-toast";

export const IntegrationCode = ({ onBack }: { onBack: () => void }) => {
    const copyCode = () => {
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

    return (
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
                    onClick={onBack}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                    Back
                </button>
                <button
                    onClick={copyCode}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90"
                >
                    <Code className="w-5 h-5" />
                    Copy Code
                </button>
            </div>
        </motion.div>
    );
};
