import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function Navbar({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const navigation: { name: string; href: string; active: boolean }[] = [
    {
      name: 'Dashboard',
      href: route('dashboard'),
      active: isAuthenticated,
    },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://res.cloudinary.com/dxuf2ssx6/image/upload/v1709634940/PropertyHunters/logo.webp"
              alt="app_logo"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation
            .filter(item => item.active)
            .map(item => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
        </div>
        {/*<div className="hidden lg:flex lg:flex-1 lg:justify-end">*/}
        {/*    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">*/}
        {/*        Log in <span aria-hidden="true">&rarr;</span>*/}
        {/*    </a>*/}
        {/*</div>*/}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
          {!isAuthenticated ? (
            <>
              <Link
                href={route('login')}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>

              <Link
                href={route('register')}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Register <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          ) : (
            <Link
              href={route('logout')}
              method="post"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Logout <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">House Hunter</span>
              <img
                className="h-8 w-auto"
                src="https://res.cloudinary.com/dxuf2ssx6/image/upload/v1709634940/PropertyHunters/logo.webp"
                alt="app_logo"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation
                  .filter(item => item.active)
                  .map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
              </div>
              <div className="py-6">
                {!isAuthenticated ? (
                  <>
                    <Link
                      href={route('login')}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                    <Link
                      href={route('register')}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <Link
                    href={route('logout')}
                    method="post"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Logout
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
