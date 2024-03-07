const Amenities = ({
  amenities,
}: {
  amenities: { id: string; name: string; checked: boolean }[];
}) => {
  return (
    <div className="p-1 flex flex-wrap gap-1 w-full">
      <div className="flex flex-wrap gap-1">
        {amenities
          .filter(({ checked }) => checked)
          .map(amenity => (
            <span
              key={amenity.id}
              id="badge-dismiss-yellow"
              className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300"
            >
              {amenity.name}
              <button
                type="button"
                className="inline-flex items-center p-1 ms-2 text-sm text-yellow-400 bg-transparent rounded-sm hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-300"
                data-dismiss-target="#badge-dismiss-yellow"
                aria-label="Remove"
              ></button>
            </span>
          ))}
      </div>
    </div>
  );
};

export default Amenities;
