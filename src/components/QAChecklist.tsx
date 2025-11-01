import { ClipboardCopy } from 'lucide-react';

export function QAChecklist() {
  const checklist = [
    'GA4 config sets `transport_url` to tagging server',
    'Web events carry `event_id`, `fbp`, `fbc`, and user data',
    'sGTM receives the 5 events',
    'CAPI shows Received & De-duplicated in Test Events',
    'Remove Test Code before publishing',
  ];

  const copyChecklist = () => {
    const text = checklist.map((item, i) => `${i + 1}. ${item}`).join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">QA Checklist</h3>
        <button
          onClick={copyChecklist}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Copy checklist"
        >
          <ClipboardCopy className="w-4 h-4" />
        </button>
      </div>
      <ul className="space-y-3">
        {checklist.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-sm font-medium flex items-center justify-center mt-0.5">
              {index + 1}
            </span>
            <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
