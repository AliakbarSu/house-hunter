import { Listing, PageProps } from '@/types/index';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Fragment, useEffect, useState } from 'react';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import { format, isSameDay } from 'date-fns';
import { router } from '@inertiajs/react';

const getDaysInMonth = (
  month: number,
  year: number
): {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}[] => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push({
      date: date.toISOString().split('T')[0] as string,
      isCurrentMonth:
        month === new Date().getMonth() && year === new Date().getFullYear(),
      isToday:
        date.toISOString().split('T')[0] ===
        new Date().toISOString().split('T')[0],
      isSelected: false,
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
};

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Calendar({
  auth,
  hasSubscription,
  listings,
}: PageProps) {
  const [days, setDays] = useState<
    {
      date: string;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
    }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentMonthName, setCurrentMonthName] = useState<string>('');
  const [currentYear, setCurrentYear] = useState<number>(0);

  const viewings = listings;

  const onDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const isActive = (date: string) => {
    return date === selectedDate;
  };

  const onMonthChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
      );
    } else {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
      );
    }
  };

  useEffect(() => {
    const days = getDaysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    setDays(days);
    setCurrentMonthName(
      currentDate.toLocaleString('default', { month: 'long' })
    );
    setCurrentYear(currentDate.getFullYear());
  }, [currentDate]);

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      setCurrentDate(date);
    }
  }, [selectedDate]);

  const isViewingToday = (viewing: Listing) => {
    return (
      isSameDay(
        new Date(viewing.viewing_at?.split('T')[0]),
        new Date(selectedDate)
      ) && viewing.status == 'viewing'
    );
  };

  const onUpdateStatus = async (id: number, status: string) => {
    router.post(route('calendar.update.listing', id), {
      status: status,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user} hasSubscription={hasSubscription}>
      <div className="p-8">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          Upcoming viewings
        </h2>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
          <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
            <div className="flex items-center text-gray-900">
              <button
                type="button"
                onClick={() => onMonthChange('prev')}
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="flex-auto text-sm font-semibold">
                {currentMonthName} {currentYear}
              </div>
              <button
                type="button"
                onClick={() => onMonthChange('next')}
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {days.map((day, dayIdx) => (
                <button
                  key={day.date}
                  type="button"
                  onClick={() => onDateClick(day.date)}
                  className={classNames(
                    'py-1.5 hover:bg-gray-100 focus:z-10',
                    day.isCurrentMonth ? 'bg-white' : 'bg-white',
                    isActive(day.date) || day.isToday ? 'font-semibold' : '',
                    isActive(day.date) ? 'text-white' : '',
                    !isActive(day.date) && day.isCurrentMonth && !day.isToday
                      ? 'text-gray-900'
                      : '',
                    !isActive(day.date) && !day.isCurrentMonth && !day.isToday
                      ? 'text-gray-400'
                      : '',
                    day.isToday && !isActive(day.date) ? 'text-indigo-600' : '',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg'
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      'relative mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                      isActive(day.date) && day.isToday && 'bg-indigo-600',
                      isActive(day.date) && !day.isToday && 'bg-gray-900'
                    )}
                  >
                    {day.date?.split('-')?.pop()?.replace(/^0/, '')}
                    {listings.find(viewing => {
                      return (
                        isSameDay(
                          new Date(viewing.viewing_at?.split('T')[0]),
                          new Date(day.date)
                        ) && viewing.status == 'viewing'
                      );
                    }) && (
                      <span className="top-[-10px] right-[-12px] absolute inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-white bg-blue-600 rounded-full">
                        !
                      </span>
                    )}
                  </time>
                </button>
              ))}
            </div>
            {/*<button*/}
            {/*  type="button"*/}
            {/*  className="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
            {/*>*/}
            {/*  Add event*/}
            {/*</button>*/}
          </div>
          <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
            {!viewings.filter(isViewingToday).length ? (
              <div className="flex items-center justify-center h-96">
                <p className="text-gray-500">No viewings scheduled for today</p>
              </div>
            ) : null}
            {viewings.filter(isViewingToday).map((viewing: Listing) => (
              <li
                key={viewing.id}
                className="relative flex space-x-6 py-6 xl:static"
              >
                {/*<img*/}
                {/*  src={viewing.images.length ? viewing.images[0].url : ''}*/}
                {/*  alt=""*/}
                {/*  className="h-14 w-14 flex-none rounded-full"*/}
                {/*/>*/}
                <div className="flex-auto">
                  <dl className="mt-2 flex flex-wrap gap-2 text-gray-500">
                    <div className="mt-2 flex items-start space-x-3 w-full">
                      <dt className="mt-0.5">
                        <span className="sr-only">Location</span>
                        <MapPinIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd>{viewing.address}</dd>
                    </div>
                    <div className="flex items-start space-x-3">
                      <dt className="mt-0.5">
                        <span className="sr-only">Date</span>
                        <CalendarIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd>
                        <time dateTime={viewing.viewing_at}>
                          {format(viewing.viewing_at, 'yyyy-MM-dd hh:mm a')}
                        </time>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Menu
                  as="div"
                  className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
                >
                  <div>
                    <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <EllipsisHorizontalIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              onClick={() =>
                                onUpdateStatus(+viewing.id, 'viewed')
                              }
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm cursor-pointer'
                              )}
                            >
                              Viewed
                            </p>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
