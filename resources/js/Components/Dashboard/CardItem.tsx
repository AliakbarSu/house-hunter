import { Listing } from '@/types';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { useDrag } from 'react-dnd';
import { classNames } from '@/utils';

const CardItem = ({
  card,
  onMoveLeft,
  onMoveRight,
  onClick,
  className,
}: {
  card: Listing;
  onMoveRight: () => null;
  onMoveLeft: () => null;
  onClick: () => void;
  className?: string;
}) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'CARD',
      item: { id: card.id },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  return (
    <li
      ref={dragRef}
      style={{ opacity }}
      key={card.id}
      className={'overflow-hidden rounded-xl border border-gray-200 '}
    >
      <div className="sr-only bg-indigo-400 bg-sky-400 bg-teal-400 bg-orange-400 bg-pink-400 bg-purple-400">
        Optional
      </div>
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
        <div
          onClick={onClick}
          className="text-sm mt-2 font-medium leading-6 text-white cursor-pointer"
        >
          {card.address}
        </div>
        <Menu as="div" className="relative ml-auto">
          <Menu.Button className="-m-2.5 block p-2.5 text-white hover:text-gray-400">
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
                      active ? 'bg-white' : '',
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
                      active ? 'bg-white' : '',
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
      <dl
        onClick={onClick}
        className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 cursor-pointer"
      >
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
          <dt className="text-gray-500">Garages</dt>
          <dd className="text-gray-700">
            <span>{card.garages}</span>
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

export default CardItem;
