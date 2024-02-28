//------------------------------------------------------
import { PlusIcon } from '@heroicons/react/20/solid';

export function TopBar() {
  return (
    <div className="bg-white  shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 justify-between">
          <p className="self-center font-bold">House Hunt 2024</p>
          <div className="flex items-center">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------
export function AddItem() {
  return (
    <div className="text-center py-4">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
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
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
      <div className="m-2 p-1 grid hover:bg-gray-50 shadow-sm rounded-md place-items-center border">
        <button type="button" className="rounded-full p-1 text-gray-500">
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// --------------------------------------------------
const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' },
  { name: 'Avg. Click Rate', stat: '24.57%' },
];

export default function Board() {
  return (
    <>
      {/*<TopBar />*/}

      <div className="grid grid-cols-1 sm:grid-cols-4 h-full">
        <div className="border-r">
          <AddItem />

          <ul className=" space-y-4 py-4 px-2">
            <li className="border overflow-hidden bg-white px-4 py-4 sm:rounded-md sm:px-6">
              Home 1
            </li>
          </ul>
        </div>

        <div className="border-r">
          <AddItem />

          <ul className=" space-y-4 py-4 px-2">
            <li className="border overflow-hidden bg-white px-4 py-4 sm:rounded-md sm:px-6">
              Home 1
            </li>
          </ul>
        </div>
        <div className="border-r">
          <AddItem />

          <ul className=" space-y-4 py-4 px-2">
            <li className="border overflow-hidden bg-white px-4 py-4 sm:rounded-md sm:px-6">
              Home 1
            </li>
          </ul>
        </div>
        <div className="border-r">
          <AddItem />

          <ul className=" space-y-4 py-4 px-2">
            <li className="border overflow-hidden bg-white px-4 py-4 sm:rounded-md sm:px-6">
              Home 1
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
