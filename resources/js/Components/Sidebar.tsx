import {
  CreditCardIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

// const navigation = [
//   { name: 'House Hunt', href: '#', icon: HomeIcon, current: true },
//   { name: 'Contacts', href: '#', icon: UsersIcon, current: false },
//   { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
//   { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
//   { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
// ];

function classNames(...classes: any[]): string {
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
      id: 'billing-portal',
      name: 'Billing',
      href: route('stripe.billing-portal'),
      icon: CreditCardIcon,
      current: route().current('stripe.billing-portal'),
      active: hasSubscription,
    },
  ];
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // <div>
    //   <Transition.Root show={sidebarOpen} as={Fragment}>
    //     <Dialog
    //       as="div"
    //       className="relative z-50 lg:hidden"
    //       onClose={setSidebarOpen}
    //     >
    //       <Transition.Child
    //         as={Fragment}
    //         enter="transition-opacity ease-linear duration-300"
    //         enterFrom="opacity-0"
    //         enterTo="opacity-100"
    //         leave="transition-opacity ease-linear duration-300"
    //         leaveFrom="opacity-100"
    //         leaveTo="opacity-0"
    //       >
    //         <div className="fixed inset-0 bg-gray-900/80" />
    //       </Transition.Child>
    //
    //       <div className="fixed inset-0 flex">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="transition ease-in-out duration-300 transform"
    //           enterFrom="-translate-x-full"
    //           enterTo="translate-x-0"
    //           leave="transition ease-in-out duration-300 transform"
    //           leaveFrom="translate-x-0"
    //           leaveTo="-translate-x-full"
    //         >
    //           <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
    //             <Transition.Child
    //               as={Fragment}
    //               enter="ease-in-out duration-300"
    //               enterFrom="opacity-0"
    //               enterTo="opacity-100"
    //               leave="ease-in-out duration-300"
    //               leaveFrom="opacity-100"
    //               leaveTo="opacity-0"
    //             >
    //               <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
    //                 <button
    //                   type="button"
    //                   className="-m-2.5 p-2.5"
    //                   onClick={() => setSidebarOpen(false)}
    //                 >
    //                   <span className="sr-only">Close sidebar</span>
    //                   <XMarkIcon
    //                     className="h-6 w-6 text-white"
    //                     aria-hidden="true"
    //                   />
    //                 </button>
    //               </div>
    //             </Transition.Child>
    //             {/* Sidebar component, swap this element with another sidebar if you like */}
    //             <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
    //               <div className="flex h-16 shrink-0 items-center">
    //                 <img
    //                   className="h-8 w-auto"
    //                   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    //                   alt="Your Company"
    //                 />
    //               </div>
    //               <nav className="flex flex-1 flex-col">
    //                 <ul role="list" className="flex flex-1 flex-col gap-y-7">
    //                   <li>
    //                     <ul role="list" className="-mx-2 space-y-1">
    //                       {navigation.map(item => (
    //                         <li key={item.name}>
    //                           <a
    //                             href={item.href}
    //                             className={classNames(
    //                               item.current
    //                                 ? 'bg-gray-50 text-indigo-600'
    //                                 : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
    //                               'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
    //                             )}
    //                           >
    //                             <item.icon
    //                               className={classNames(
    //                                 item.current
    //                                   ? 'text-indigo-600'
    //                                   : 'text-gray-400 group-hover:text-indigo-600',
    //                                 'h-6 w-6 shrink-0'
    //                               )}
    //                               aria-hidden="true"
    //                             />
    //                             {item.name}
    //                           </a>
    //                         </li>
    //                       ))}
    //                     </ul>
    //                   </li>
    //                 </ul>
    //               </nav>
    //             </div>
    //           </Dialog.Panel>
    //         </Transition.Child>
    //       </div>
    //     </Dialog>
    //   </Transition.Root>
    //
    //   {/* Static sidebar for desktop */}
    //   <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col">
    //     {/* Sidebar component, swap this element with another sidebar if you like */}
    //     <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
    //       <div className="flex h-16 shrink-0 items-center">
    //         <img
    //           className="h-8 w-auto"
    //           src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    //           alt="Your Company"
    //         />
    //       </div>
    //       <nav className="flex flex-1 flex-col">
    //         <ul role="list" className="flex flex-1 flex-col gap-y-7">
    //           <li>
    //             <ul role="list" className="-mx-2 space-y-1">
    //               {navigation.map(item => (
    //                 <li key={item.name}>
    //                   <a
    //                     href={item.href}
    //                     className={classNames(
    //                       item.current
    //                         ? 'bg-gray-50 text-indigo-600'
    //                         : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
    //                       'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
    //                     )}
    //                   >
    //                     <item.icon
    //                       className={classNames(
    //                         item.current
    //                           ? 'text-indigo-600'
    //                           : 'text-gray-400 group-hover:text-indigo-600',
    //                         'h-6 w-6 shrink-0'
    //                       )}
    //                       aria-hidden="true"
    //                     />
    //                     {item.name}
    //                   </a>
    //                 </li>
    //               ))}
    //             </ul>
    //           </li>
    //
    //           <li className="-mx-6 mt-auto">
    //             <a
    //               href="#"
    //               className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
    //             >
    //               <img
    //                 className="h-8 w-8 rounded-full bg-gray-50"
    //                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //                 alt=""
    //               />
    //               <span className="sr-only">Your profile</span>
    //               <span aria-hidden="true">Tom Cook</span>
    //             </a>
    //           </li>
    //         </ul>
    //       </nav>
    //     </div>
    //   </div>
    //
    //   <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
    //     <button
    //       type="button"
    //       className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
    //       onClick={() => setSidebarOpen(true)}
    //     >
    //       <span className="sr-only">Open sidebar</span>
    //       <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    //     </button>
    //     <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
    //       Dashboard
    //     </div>
    //     <a href="#">
    //       <span className="sr-only">Your profile</span>
    //       <img
    //         className="h-8 w-8 rounded-full bg-gray-50"
    //         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //         alt=""
    //       />
    //     </a>
    //   </div>
    // </div>
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
