//------------------------------------------------------
import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Listing } from '@/types';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
};

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
export function AddItem({ title }: { title?: string }) {
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
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <div className="m-2 p-1 grid hover:bg-gray-50 shadow-sm rounded-md place-items-center border">
        <button type="button" className="rounded-full p-1 text-gray-500">
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

const CardItem = ({ card }: { card: Listing }) => {
  return (
    <li
      key={card.id}
      className="overflow-hidden rounded-xl border border-gray-200"
    >
      <div className="flex flex-wrap items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <img
          src={card.images ? card.images[0]?.url : '/img/placeholder.jpg'}
          alt={card.title}
          className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
        />

        <Menu as="div" className="relative ml-auto">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900'
                    )}
                  >
                    View<span className="sr-only">, {card.title}</span>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900'
                    )}
                  >
                    Edit<span className="sr-only">, {card.title}</span>
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="text-sm mt-2 font-medium leading-6 text-gray-900">
          {card.title}
        </div>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Last invoice</dt>
          <dd className="text-gray-700">
            <time dateTime={card.created_at}>{card.created_at}</time>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Amount</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">{card.rent}</div>
            <div
              className={classNames(
                statuses['Paid'],
                'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
              )}
            >
              {card.status}
            </div>
          </dd>
        </div>
      </dl>
    </li>
  );
};

// --------------------------------------------------
const columns = [
  { name: 'Wishlist', type: 'wishlist' },
  { name: 'Viewing', type: 'viewing' },
  { name: 'Viewed', type: 'viewed' },
  { name: 'Offer Rejected', type: 'offer_declined' },
  { name: 'Offer Accepted', type: 'offer_accepted' },
];

export default function Board({
  listings,
}: {
  listings: Listing[];
  hasSubscription?: boolean;
}) {
  return (
    <>
      {/*<TopBar />*/}

      <div className="grid grid-cols-1 sm:grid-cols-5 h-full">
        {columns.map(column => (
          <div className="border-r" key={column.type}>
            <AddItem title={column.name} />

            <ul className=" space-y-4 py-4 px-2">
              {listings
                .filter(({ status }) => status === column.type)
                .map(listing => (
                  <CardItem key={listing.id} card={listing} />
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
