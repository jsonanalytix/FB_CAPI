import React, { useMemo } from 'react';
import type { Config } from '../types';
import {
  isValidUrl,
  isValidGA4Id,
  nonEmpty,
  isValidEventName,
} from '../utils/helpers';

import { ProjectIDs } from './ProjectIDs';
import { EventsSection } from './EventsSection';
import { FormSelectors } from './FormSelectors';
import { ActionButtons } from './ActionButtons';
import { QAChecklist } from './QAChecklist';
import { JSONPreview } from './JSONPreview';

interface JSONGeneratorProps {
  config: Config;
  onChange: (config: Config) => void;
  webJSON: Record<string, any> | null;
  serverJSON: Record<string, any> | null;
  onGenerate: () => void;
  onExport: () => void;
  onImport: (config: Config) => void;
  onPreview: () => void;
}

export const JSONGenerator: React.FC<JSONGeneratorProps> = ({
  config,
  onChange,
  webJSON,
  serverJSON,
  onGenerate,
  onExport,
  onImport,
  onPreview,
}) => {
  const isValid = useMemo(() => {
    const hasRequiredFields =
      nonEmpty(config.pixelId) &&
      nonEmpty(config.accessToken) &&
      isValidGA4Id(config.ga4MeasurementId) &&
      isValidUrl(config.transportUrl);

    const hasValidEvents =
      config.events.length > 0 &&
      config.events.length <= 5 &&
      config.events.every((event) => nonEmpty(event) && isValidEventName(event));

    return hasRequiredFields && hasValidEvents;
  }, [config]);

  const hasGenerated = webJSON !== null && serverJSON !== null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <ProjectIDs config={config} onChange={onChange} />
        <EventsSection config={config} onChange={onChange} />
        <FormSelectors config={config} onChange={onChange} />
      </div>

      <div className="space-y-6">
        <ActionButtons
          config={config}
          isValid={isValid}
          onGenerate={onGenerate}
          onExport={onExport}
          onImport={onImport}
          onPreview={onPreview}
          hasGenerated={hasGenerated}
        />

        <QAChecklist />

        <JSONPreview webJSON={webJSON} serverJSON={serverJSON} />
      </div>
    </div>
  );
};

