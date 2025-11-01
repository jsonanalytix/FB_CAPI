import type { Config } from '../types';
import { EventsList } from './EventsList';

interface EventsSectionProps {
  config: Config;
  onChange: (config: Config) => void;
}

export function EventsSection({ config, onChange }: EventsSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Events <span className="text-sm font-normal text-gray-500">(up to 5)</span>
      </h2>
      <EventsList
        events={config.events}
        onChange={(events) => onChange({ ...config, events })}
      />
    </div>
  );
}
