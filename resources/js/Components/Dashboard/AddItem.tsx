import { PlusIcon } from '@heroicons/react/20/solid';

const AddItem = ({
  title,
  onOpen,
  color = 'none',
}: {
  title?: string;
  onOpen: CallableFunction;
  color?: string;
}) => {
  const open = () => {
    onOpen();
  };
  return (
    <div className="text-center py-4">
      <svg
        className="mx-auto h-8 w-8 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <div
        onClick={open}
        className="m-2 p-1 grid hover:bg-gray-50 cursor-pointer shadow-sm rounded-md place-items-center border"
      >
        <button type="button" className={'rounded-full text-gray-500 ' + color}>
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default AddItem;
