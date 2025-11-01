import { Plus, X } from 'lucide-react';
import { isValidEventName } from '../utils/helpers';

interface EventsListProps {
  events: string[];
  onChange: (events: string[]) => void;
}

export function EventsList({ events, onChange }: EventsListProps) {
  const addEvent = () => {
    if (events.length < 5) {
      onChange([...events, '']);
    }
  };

  const removeEvent = (index: number) => {
    onChange(events.filter((_, i) => i !== index));
  };

  const updateEvent = (index: number, value: string) => {
    const newEvents = [...events];
    newEvents[index] = value;
    onChange(newEvents);
  };

  return (
    <div className="space-y-3">
      {events.map((event, index) => (
        <div key={index} className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={event}
              onChange={(e) => updateEvent(index, e.target.value)}
              placeholder="e.g., page_view"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                event && !isValidEventName(event)
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {event && !isValidEventName(event) && (
              <p className="mt-1 text-xs text-red-600">
                Use lowercase, numbers, and underscores only
              </p>
            )}
          </div>
          <button
            onClick={() => removeEvent(index)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove event"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      {events.length < 5 && (
        <button
          onClick={addEvent}
          className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Event (max 5)
        </button>
      )}
    </div>
  );
}
