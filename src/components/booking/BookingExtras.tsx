import { BookingExtra } from '../../types';
import { Check, X } from 'lucide-react';

interface BookingExtrasProps {
  selectedExtras: BookingExtra[];
  onAddExtra: (extra: BookingExtra) => void;
  onRemoveExtra: (extraId: string) => void;
}

const availableExtras: BookingExtra[] = [
  {
    id: 'extra-1',
    name: 'GPS Navigation',
    price: 10,
    selected: false
  },
  {
    id: 'extra-2',
    name: 'Child Seat',
    price: 15,
    selected: false
  },
  {
    id: 'extra-3',
    name: 'Additional Driver',
    price: 20,
    selected: false
  },
  {
    id: 'extra-4',
    name: 'Portable WiFi',
    price: 12,
    selected: false
  },
  {
    id: 'extra-5',
    name: 'Full Insurance Coverage',
    price: 30,
    selected: false
  }
];

const BookingExtras = ({ 
  selectedExtras, 
  onAddExtra, 
  onRemoveExtra 
}: BookingExtrasProps) => {
  // Get the selected status of an extra
  const isSelected = (extraId: string) => {
    return selectedExtras.some(extra => extra.id === extraId);
  };

  // Toggle selection of an extra
  const toggleExtra = (extra: BookingExtra) => {
    if (isSelected(extra.id)) {
      onRemoveExtra(extra.id);
    } else {
      onAddExtra(extra);
    }
  };

  return (
    <div className="rounded-lg bg-white shadow-md p-5">
      <h3 className="font-medium text-lg mb-4">Optional Extras</h3>
      
      <div className="space-y-3">
        {availableExtras.map(extra => (
          <div 
            key={extra.id}
            className={`border rounded-lg p-4 transition-colors ${
              isSelected(extra.id) 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{extra.name}</div>
                <div className="text-sm text-gray-600">
                  ${extra.price} per booking
                </div>
              </div>
              
              <button
                onClick={() => toggleExtra(extra)}
                className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                  isSelected(extra.id)
                    ? 'bg-blue-700 border-blue-700 text-white'
                    : 'border-gray-300 text-gray-400 hover:border-blue-500'
                }`}
                aria-label={isSelected(extra.id) ? `Remove ${extra.name}` : `Add ${extra.name}`}
              >
                {isSelected(extra.id) ? <Check size={14} /> : '+'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedExtras.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Selected Extras</h4>
          <ul className="space-y-2">
            {selectedExtras.map(extra => (
              <li key={extra.id} className="flex justify-between items-center text-sm">
                <span>{extra.name}</span>
                <div className="flex items-center">
                  <span className="font-medium">${extra.price}</span>
                  <button
                    onClick={() => onRemoveExtra(extra.id)}
                    className="ml-2 text-gray-500 hover:text-red-600"
                    aria-label={`Remove ${extra.name}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingExtras;