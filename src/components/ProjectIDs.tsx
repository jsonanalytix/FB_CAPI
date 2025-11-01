import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { Config } from '../types';
import { isValidUrl, isValidGA4Id, nonEmpty } from '../utils/helpers';

interface ProjectIDsProps {
  config: Config;
  onChange: (config: Config) => void;
}

export function ProjectIDs({ config, onChange }: ProjectIDsProps) {
  const [showAccessToken, setShowAccessToken] = useState(false);

  const updateField = <K extends keyof Config>(key: K, value: Config[K]) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Project IDs</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Pixel ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={config.pixelId}
            onChange={(e) => updateField('pixelId', e.target.value)}
            placeholder="123456789012345"
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
              config.pixelId && !nonEmpty(config.pixelId)
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Access Token <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showAccessToken ? 'text' : 'password'}
              value={config.accessToken}
              onChange={(e) => updateField('accessToken', e.target.value)}
              placeholder="Enter your access token"
              className={`w-full px-3 py-2 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                config.accessToken && !nonEmpty(config.accessToken)
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowAccessToken(!showAccessToken)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-700 rounded transition-colors"
            >
              {showAccessToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Test Event Code <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            type="text"
            value={config.testEventCode}
            onChange={(e) => updateField('testEventCode', e.target.value)}
            placeholder="TEST12345"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            GA4 Measurement ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={config.ga4MeasurementId}
            onChange={(e) => updateField('ga4MeasurementId', e.target.value)}
            placeholder="G-XXXXXXXXXX"
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
              config.ga4MeasurementId && !isValidGA4Id(config.ga4MeasurementId)
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
          {config.ga4MeasurementId && !isValidGA4Id(config.ga4MeasurementId) && (
            <p className="mt-1 text-xs text-red-600">Must start with G-</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Transport URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={config.transportUrl}
            onChange={(e) => updateField('transportUrl', e.target.value)}
            placeholder="https://tags.client.com/g/collect"
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
              config.transportUrl && !isValidUrl(config.transportUrl)
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
          {config.transportUrl && !isValidUrl(config.transportUrl) && (
            <p className="mt-1 text-xs text-red-600">Must be a valid HTTPS URL</p>
          )}
        </div>
      </div>
    </div>
  );
}
