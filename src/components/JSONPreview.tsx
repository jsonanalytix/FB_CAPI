import { useState } from 'react';

interface JSONPreviewProps {
  webJSON: Record<string, any> | null;
  serverJSON: Record<string, any> | null;
}

export function JSONPreview({ webJSON, serverJSON }: JSONPreviewProps) {
  const [activeTab, setActiveTab] = useState<'web' | 'server'>('web');

  if (!webJSON && !serverJSON) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">JSON Preview</h3>
        <p className="text-sm text-gray-500 text-center py-8">
          Generate containers to preview JSON
        </p>
      </div>
    );
  }

  const currentJSON = activeTab === 'web' ? webJSON : serverJSON;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">JSON Preview</h3>

      <div className="flex gap-2 mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('web')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === 'web'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Web Container
          {activeTab === 'web' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('server')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === 'server'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Server Container
          {activeTab === 'server' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-auto">
        <pre className="text-xs text-gray-800 font-mono whitespace-pre">
          {JSON.stringify(currentJSON, null, 2)}
        </pre>
      </div>
    </div>
  );
}
