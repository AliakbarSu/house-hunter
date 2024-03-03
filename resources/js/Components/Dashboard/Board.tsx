import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Listing, User } from '@/types';
import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Modal from '@/Components/Modal';
import Form from '@/Components/Dashboard/Form';
import { useForm } from '@inertiajs/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function AddItem({
  title,
  onOpen,
  color = 'none',
}: {
  title?: string;
  onOpen: CallableFunction;
  color?: string;
}) {
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
}

const CardItem = ({
  card,
  onMoveLeft,
  onMoveRight,
  className,
}: {
  card: Listing;
  onMoveRight: () => null;
  onMoveLeft: () => null;
  className?: string;
}) => {
  return (
    <li
      key={card.id}
      className={'overflow-hidden rounded-xl border border-gray-200 '}
    >
      <div
        className={
          'flex items-start gap-x-4 border-b border-gray-900/5 p-4 ' + className
        }
      >
        {/*<img*/}
        {/*  src={card.images ? card.images[0]?.url : '/img/placeholder.jpg'}*/}
        {/*  alt={card.address}*/}
        {/*  className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"*/}
        {/*/>*/}
        <div className="text-sm mt-2 font-medium leading-6 text-gray-900">
          {card.address}
        </div>
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
                  <span
                    onClick={onMoveLeft}
                    className={classNames(
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer'
                    )}
                  >
                    Move Left<span className="sr-only">, {card.title}</span>
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={onMoveRight}
                    className={classNames(
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer'
                    )}
                  >
                    Move Right<span className="sr-only">, {card.title}</span>
                  </span>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Bedrooms</dt>
          <dd className="text-gray-700">
            <span>{card.bedrooms}</span>
          </dd>
          <dt className="text-gray-500">Bathrooms</dt>
          <dd className="text-gray-700">
            <span>{card.bathrooms}</span>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              ${`${card.rent} - ${card.rent_frequency}`}
            </div>
            {/*<div*/}
            {/*  className={classNames(*/}
            {/*    statuses['Paid'],*/}
            {/*    'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'*/}
            {/*  )}*/}
            {/*>*/}
            {/*  {card.status}*/}
            {/*</div>*/}
          </dd>
        </div>
      </dl>
    </li>
  );
};

// --------------------------------------------------
const columns = [
  { name: 'Wishlist', type: 'wishlist', color: 'bg-indigo-50' },
  { name: 'Viewing', type: 'viewing', color: 'bg-orange-50' },
  { name: 'Viewed', type: 'viewed', color: 'bg-purple-50' },
  { name: 'Applied', type: 'applied', color: 'bg-pink-50' },
  { name: 'Offer Rejected', type: 'offer_declined', color: 'bg-red-50' },
  { name: 'Offer Accepted', type: 'offer_accepted', color: 'bg-green-50' },
];

export default function Board({
  listings,
  user,
}: {
  listings: Listing[];
  user: User;
  hasSubscription?: boolean;
}) {
  const [isModal, setIsModal] = useState(false);

  const modalHandler = (state: boolean): void => {
    setIsModal(state);
  };
  const { put, data, setData } = useForm({ status: '', listingId: '' });
  const moveLeft = (index: number, listingId: string) => {
    if (index > 0) {
      const column = columns[index - 1];
      setData(() => ({ status: column.type, listingId: listingId }));
    }
    return null;
  };

  const moveRight = (index: number, listingId: string) => {
    if (index < columns.length - 1) {
      const column = columns[index + 1];
      setData(() => ({ status: column.type, listingId: listingId }));
    }
    return null;
  };

  useEffect(() => {
    if (data.status && data.listingId) {
      put(route('listing.update', data.listingId));
    }
  }, [data.status, data.listingId]);

  return (
    <div className="flex h-full w-full absolute">
      <Modal show={isModal} maxWidth={'xl'} onClose={() => modalHandler(false)}>
        <Form user={user} closeModal={() => modalHandler(false)} />
      </Modal>
      {columns.map((column, index) => (
        <div className="border-r min-w-72 max-w-72" key={column.type}>
          <AddItem title={column.name} onOpen={() => modalHandler(true)} />

          <ul className="space-y-4 py-4 px-2 w-full">
            {listings
              .filter(({ status }) => status === column.type)
              .map(listing => (
                <CardItem
                  className={column.color}
                  onMoveLeft={() => moveLeft(index, listing.id)}
                  onMoveRight={() => moveRight(index, listing.id)}
                  key={listing.id}
                  card={listing}
                />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
