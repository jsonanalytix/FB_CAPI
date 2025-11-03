import { useState } from 'react';
import { Settings } from 'lucide-react';
import type { Config } from './types';
import { defaultConfig } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { buildWebContainerJSON, buildServerContainerJSON } from './utils/builders';
import { downloadJson } from './utils/helpers';

import { Tabs, TabId } from './components/Tabs';
import { JSONGenerator } from './components/JSONGenerator';
import { CAPIInstructions } from './components/CAPIInstructions';
import { CAPIOverview } from './components/CAPIOverview';
import { ConfigPreview } from './components/ConfigPreview';

function App() {
  const [config, setConfig] = useLocalStorage<Config>('capi-config', defaultConfig);
  const [webJSON, setWebJSON] = useState<Record<string, any> | null>(null);
  const [serverJSON, setServerJSON] = useState<Record<string, any> | null>(null);
  const [showConfigPreview, setShowConfigPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('generator');

  const handleGenerate = () => {
    const web = buildWebContainerJSON(config);
    const server = buildServerContainerJSON(config);

    setWebJSON(web);
    setServerJSON(server);

    downloadJson('web-gtm-container.json', web);
    downloadJson('server-gtm-container.json', server);
  };

  const handleExport = () => {
    downloadJson('capi-config.json', config);
  };

  const handleImport = (importedConfig: Config) => {
    setConfig(importedConfig);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-blue-600 rounded-xl">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Facebook CAPI Setup Generator
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            Configure your Conversions API integration and generate GTM containers
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="p-6">
            {activeTab === 'generator' && (
              <JSONGenerator
                config={config}
                onChange={setConfig}
                webJSON={webJSON}
                serverJSON={serverJSON}
                onGenerate={handleGenerate}
                onExport={handleExport}
                onImport={handleImport}
                onPreview={() => setShowConfigPreview(true)}
              />
            )}

            {activeTab === 'instructions' && <CAPIInstructions />}

            {activeTab === 'overview' && <CAPIOverview />}
          </div>
        </div>
      </div>

      {showConfigPreview && (
        <ConfigPreview config={config} onClose={() => setShowConfigPreview(false)} />
      )}
    </div>
  );
}

export default App;
