import { useState, useMemo } from 'react';
import { Settings } from 'lucide-react';
import type { Config } from './types';
import { defaultConfig } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { buildWebContainerJSON, buildServerContainerJSON } from './utils/builders';
import {
  downloadJson,
  isValidUrl,
  isValidGA4Id,
  nonEmpty,
  isValidEventName,
} from './utils/helpers';

import { ProjectIDs } from './components/ProjectIDs';
import { EventsSection } from './components/EventsSection';
import { FormSelectors } from './components/FormSelectors';
import { ActionButtons } from './components/ActionButtons';
import { QAChecklist } from './components/QAChecklist';
import { JSONPreview } from './components/JSONPreview';
import { ConfigPreview } from './components/ConfigPreview';

function App() {
  const [config, setConfig] = useLocalStorage<Config>('capi-config', defaultConfig);
  const [webJSON, setWebJSON] = useState<Record<string, any> | null>(null);
  const [serverJSON, setServerJSON] = useState<Record<string, any> | null>(null);
  const [showConfigPreview, setShowConfigPreview] = useState(false);

  const isValid = useMemo(() => {
    const hasRequiredFields =
      nonEmpty(config.pixelId) &&
      nonEmpty(config.accessToken) &&
      isValidGA4Id(config.ga4MeasurementId) &&
      isValidUrl(config.taggingServerUrl) &&
      isValidUrl(config.transportUrl);

    const hasValidEvents =
      config.events.length > 0 &&
      config.events.every((event) => nonEmpty(event) && isValidEventName(event));

    return hasRequiredFields && hasValidEvents;
  }, [config]);

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

  const hasGenerated = webJSON !== null && serverJSON !== null;

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProjectIDs config={config} onChange={setConfig} />
            <EventsSection config={config} onChange={setConfig} />
            <FormSelectors config={config} onChange={setConfig} />
          </div>

          <div className="space-y-6">
            <ActionButtons
              config={config}
              isValid={isValid}
              onGenerate={handleGenerate}
              onExport={handleExport}
              onImport={handleImport}
              onPreview={() => setShowConfigPreview(true)}
              hasGenerated={hasGenerated}
            />

            <QAChecklist />

            <JSONPreview webJSON={webJSON} serverJSON={serverJSON} />
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
