import type { SelectorSet } from '../types';

interface SelectorInputsProps {
  selectors: SelectorSet;
  onChange: (selectors: SelectorSet) => void;
  source: 'main' | 'unbounce';
}

const fields = [
  { key: 'email', label: 'Email', placeholder: 'input[name="email"]' },
  { key: 'phone', label: 'Phone', placeholder: 'input[name="phone"]' },
  { key: 'fn', label: 'First Name', placeholder: 'input[name="first_name"]' },
  { key: 'ln', label: 'Last Name', placeholder: 'input[name="last_name"]' },
  { key: 'ct', label: 'City', placeholder: 'input[name="city"]' },
  { key: 'st', label: 'State/Region', placeholder: 'input[name="state"]' },
  { key: 'zp', label: 'Zip/Postal', placeholder: 'input[name="zip"]' },
  { key: 'country', label: 'Country', placeholder: 'input[name="country"]' },
] as const;

export function SelectorInputs({ selectors, onChange, source }: SelectorInputsProps) {
  const updateField = (key: keyof SelectorSet, value: string) => {
    onChange({ ...selectors, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
          <input
            type="text"
            value={selectors[key]}
            onChange={(e) => updateField(key, e.target.value)}
            placeholder={source === 'unbounce' ? `#${key}` : placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 transition-colors"
          />
        </div>
      ))}
    </div>
  );
}
