import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface LocationSelectorProps {
  selectedPickup: string;
  selectedReturn: string;
  onLocationChange: (pickup: string, returnLoc: string) => void;
}

const locations = [
  { id: 'loc-1', name: 'Downtown Office', address: '123 Main St, Downtown' },
  { id: 'loc-2', name: 'Airport Terminal', address: 'International Airport, Terminal 2' },
  { id: 'loc-3', name: 'Central Station', address: '45 Railway Ave, Central District' },
  { id: 'loc-4', name: 'North Branch', address: '789 North Road, North District' },
  { id: 'loc-5', name: 'South Port', address: '321 Harbor Blvd, Port District' }
];

const LocationSelector = ({ 
  selectedPickup, 
  selectedReturn, 
  onLocationChange 
}: LocationSelectorProps) => {
  const [sameLocation, setSameLocation] = useState(true);

  useEffect(() => {
    // Initialize the return location to match pickup if same location is checked
    if (sameLocation && selectedPickup && selectedReturn !== selectedPickup) {
      onLocationChange(selectedPickup, selectedPickup);
    }
  }, [sameLocation, selectedPickup]);

  const handlePickupChange = (locationId: string) => {
    if (sameLocation) {
      onLocationChange(locationId, locationId);
    } else {
      onLocationChange(locationId, selectedReturn);
    }
  };

  const handleReturnChange = (locationId: string) => {
    onLocationChange(selectedPickup, locationId);
  };

  const handleSameLocationToggle = (checked: boolean) => {
    setSameLocation(checked);
    if (checked && selectedPickup) {
      onLocationChange(selectedPickup, selectedPickup);
    }
  };

  const getLocationNameById = (id: string) => {
    const location = locations.find(loc => loc.id === id);
    return location ? location.name : '';
  };

  return (
    <div className="rounded-lg bg-white shadow-md p-5">
      <div className="flex items-center mb-4">
        <MapPin size={20} className="text-blue-700 mr-2" />
        <h3 className="font-medium">Select Locations</h3>
      </div>
      
      {/* Pickup Location */}
      <div className="mb-4">
        <label htmlFor="pickup-location" className="block text-sm font-medium text-gray-700 mb-1">
          Pickup Location
        </label>
        <select
          id="pickup-location"
          value={selectedPickup}
          onChange={(e) => handlePickupChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a pickup location</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        {selectedPickup && (
          <p className="text-sm text-gray-600 mt-1">
            {locations.find(loc => loc.id === selectedPickup)?.address}
          </p>
        )}
      </div>
      
      {/* Same Location Checkbox */}
      <div className="flex items-center mb-4">
        <input
          id="same-location"
          type="checkbox"
          checked={sameLocation}
          onChange={(e) => handleSameLocationToggle(e.target.checked)}
          className="h-4 w-4 text-blue-700 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="same-location" className="ml-2 text-sm text-gray-700">
          Return to the same location
        </label>
      </div>
      
      {/* Return Location - only show if same location is not checked */}
      {!sameLocation && (
        <div>
          <label htmlFor="return-location" className="block text-sm font-medium text-gray-700 mb-1">
            Return Location
          </label>
          <select
            id="return-location"
            value={selectedReturn}
            onChange={(e) => handleReturnChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a return location</option>
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          {selectedReturn && (
            <p className="text-sm text-gray-600 mt-1">
              {locations.find(loc => loc.id === selectedReturn)?.address}
            </p>
          )}
        </div>
      )}
      
      {/* Summary */}
      {selectedPickup && (sameLocation || selectedReturn) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium mb-2">Location Summary</h4>
          <div className="text-sm">
            <p>
              <span className="text-gray-600">Pickup:</span> {getLocationNameById(selectedPickup)}
            </p>
            <p>
              <span className="text-gray-600">Return:</span> {getLocationNameById(selectedReturn)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;