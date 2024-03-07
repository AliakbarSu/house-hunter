import { useEffect, useState } from 'react';

const availableAmenities: { id: string; name: string; checked: boolean }[] = [
  { id: '1', name: 'Air conditioning', checked: false },
  { id: '2', name: 'Bed sheets', checked: false },
  { id: '3', name: 'Cooking basics', checked: false },
  { id: '4', name: 'Dishwasher', checked: false },
  { id: '5', name: 'Dryer', checked: false },
  { id: '6', name: 'Heating', checked: false },
  { id: '7', name: 'Hot water', checked: false },
  { id: '8', name: 'Microwave', checked: false },
  { id: '9', name: 'Refrigerator', checked: false },
  { id: '10', name: 'TV', checked: false },
  { id: '11', name: 'Washer', checked: false },
  { id: '12', name: 'Wifi', checked: false },
];

const AmenitiesSelector = ({
  amenities = [],
  onSelect,
}: {
  amenities: { id: string; name: string; checked: boolean }[];
  onSelect: (
    amenities: { id: string; name: string; checked: boolean }[]
  ) => void;
}) => {
  const [selectedAmenities, setSelectedAmenities] = useState<
    { id: string; name: string; checked: boolean }[]
  >(amenities.length ? amenities : [...availableAmenities]);
  const [open, setOpen] = useState(false);

  const onAmenitySelect = (id: string) => {
    const updatedAmenities = selectedAmenities.map(amenity => {
      if (amenity.id === id) {
        return { ...amenity, checked: !amenity.checked };
      }
      return amenity;
    });
    setSelectedAmenities(updatedAmenities);
  };

  useEffect(() => {
    onSelect(selectedAmenities);
  }, [selectedAmenities]);

  return (
    <div className="w-full relative">
      <button
        id="dropdownCheckboxButton"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center"
        type="button"
      >
        Amenities{' '}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {open && (
        <div
          id="dropdownDefaultCheckbox"
          className="absolute w-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow"
        >
          <ul
            className="p-3 space-y-3 text-sm text-gray-700"
            aria-labelledby="dropdownCheckboxButton"
          >
            {selectedAmenities.map(amenity => (
              <li key={amenity.id}>
                <div className="flex items-center">
                  <input
                    id="checkbox-item-1"
                    type="checkbox"
                    onClick={() => onAmenitySelect(amenity.id)}
                    onChange={() => {}}
                    checked={amenity.checked}
                    value={amenity.id}
                    className="cursor-pointer w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                  />
                  <label
                    htmlFor="checkbox-item-1"
                    className="cursor-pointer ms-2 text-sm font-medium text-gray-900"
                  >
                    {amenity.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AmenitiesSelector;
