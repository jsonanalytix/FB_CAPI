import { Download, FileJson, Upload, Eye } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Config } from '../types';

interface ActionButtonsProps {
  config: Config;
  isValid: boolean;
  onGenerate: () => void;
  onExport: () => void;
  onImport: (config: Config) => void;
  onPreview: () => void;
  hasGenerated: boolean;
}

export function ActionButtons({
  config,
  isValid,
  onGenerate,
  onExport,
  onImport,
  onPreview,
  hasGenerated,
}: ActionButtonsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        onImport(imported);
        showToast('Config imported successfully');
      } catch (error) {
        showToast('Error importing config');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExport = () => {
    onExport();
    showToast('Config exported successfully');
  };

  const handleGenerate = () => {
    onGenerate();
    showToast('Containers generated successfully');
  };

  return (
    <>
      <div className="sticky top-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>

        <div className="space-y-3">
          <button
            onClick={handleGenerate}
            disabled={!isValid}
            className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              isValid
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Download className="w-4 h-4" />
            Generate Containers
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                /* handled by generate */
              }}
              disabled={!hasGenerated}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                hasGenerated
                  ? 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  : 'bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100'
              }`}
              title="Web container will auto-download"
            >
              <FileJson className="w-3.5 h-3.5" />
              Web JSON
            </button>

            <button
              onClick={() => {
                /* handled by generate */
              }}
              disabled={!hasGenerated}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                hasGenerated
                  ? 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  : 'bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100'
              }`}
              title="Server container will auto-download"
            >
              <FileJson className="w-3.5 h-3.5" />
              Server JSON
            </button>
          </div>

          <div className="pt-3 border-t border-gray-200 space-y-3">
            <button
              onClick={onPreview}
              className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border border-gray-200"
            >
              <Eye className="w-4 h-4" />
              Preview Config
            </button>

            <button
              onClick={handleExport}
              className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border border-gray-200"
            >
              <Download className="w-4 h-4" />
              Export Config
            </button>

            <button
              onClick={handleImportClick}
              className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border border-gray-200"
            >
              <Upload className="w-4 h-4" />
              Import Config
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm animate-fade-in z-50">
          {toast}
        </div>
      )}
    </>
  );
}
