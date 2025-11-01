import { useState } from 'react';
import type { Config } from '../types';
import { SelectorInputs } from './SelectorInputs';

interface FormSelectorsProps {
  config: Config;
  onChange: (config: Config) => void;
}

export function FormSelectors({ config, onChange }: FormSelectorsProps) {
  const [activeTab, setActiveTab] = useState<'main' | 'unbounce'>('main');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Selectors</h2>

      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('main')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === 'main'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Main Site
          {activeTab === 'main' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('unbounce')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === 'unbounce'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Unbounce
          {activeTab === 'unbounce' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
      </div>

      <SelectorInputs
        selectors={config.selectors[activeTab]}
        source={activeTab}
        onChange={(selectors) =>
          onChange({
            ...config,
            selectors: { ...config.selectors, [activeTab]: selectors },
          })
        }
      />
    </div>
  );
}
