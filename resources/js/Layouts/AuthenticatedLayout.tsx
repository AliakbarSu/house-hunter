import { PropsWithChildren, ReactNode } from 'react';

import { User } from '@/types';
import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';

export default function Example({
  user,
  header,
  hasSubscription,
  children,
  sidebar = true,
}: PropsWithChildren<{
  user: User;
  header?: ReactNode;
  hasSubscription: boolean;
  sidebar?: boolean;
}>) {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 h-16 border-b border-gray-900/10">
        <Navbar user={user} />
      </header>

      <div className="h-screen mx-auto max-w-[1700px] pt-16 lg:flex lg:px-2">
        <h1 className="sr-only">General Settings</h1>
        {sidebar && <Sidebar hasSubscription={hasSubscription} />}
        <main className="overflow-y-scroll  h-[calc(100%-5.5rem)] md:h-[calc(100%-4.5rem)]  lg:h-auto lg:flex-1 px-0 py-0 sm:px-0 lg:px-0 lg:py-0">
          <div className="h-max sm:h-full  mx-auto max-w-4xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
