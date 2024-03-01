import {
  CalendarIcon,
  CreditCardIcon,
  DocumentIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'; // const navigation = [

// const navigation = [
//   { name: 'House Hunt', href: '#', icon: HomeIcon, current: true },
//   { name: 'Contacts', href: '#', icon: UsersIcon, current: false },
//   { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
//   { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
//   { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
// ];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar({
  hasSubscription,
}: {
  hasSubscription: boolean;
}) {
  const secondaryNavigation = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      href: route('dashboard'),
      icon: HomeIcon,
      current: route().current('dashboard'),
      active: true,
    },
    {
      id: 'listing',
      name: 'Rental Profile',
      href: route('profile.rental'),
      icon: UsersIcon,
      current: route().current('profile.rental'),
      active: true,
    },
    {
      id: 'calendar',
      name: 'Calendar',
      href: route('calendar'),
      icon: CalendarIcon,
      current: route().current('calendar'),
      active: true,
    },
    {
      id: 'applications',
      name: 'Application Forms',
      href: route('forms.view'),
      icon: FolderIcon,
      current: route().current('forms.view'),
      active: true,
    },
    {
      id: 'cover-letter',
      name: 'Cover Letters',
      href: route('cover-letter.view'),
      icon: DocumentIcon,
      current: route().current('cover-letter.view'),
      active: true,
    },
    {
      id: 'billing-portal',
      name: 'Billing',
      href: route('stripe.billing-portal'),
      icon: CreditCardIcon,
      current: route().current('stripe.billing-portal'),
      active: hasSubscription,
    },
  ];

  return (
    <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-44 lg:flex-none lg:border-r lg:py-20">
      <nav className="flex-none px-4 sm:px-6 lg:px-0">
        <ul
          role="list"
          className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
        >
          {secondaryNavigation
            .filter(item => item.active)
            .map(item => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                    'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? 'text-indigo-600'
                        : 'text-gray-400 group-hover:text-indigo-600',
                      'h-6 w-6 shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </aside>
  );
}
