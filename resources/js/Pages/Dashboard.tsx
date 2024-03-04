import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import Board from '@/Components/Dashboard/Board';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

export default function Dashboard({
  auth,
  listings,
  hasSubscription,
}: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user} hasSubscription={hasSubscription}>
      <DndProvider backend={HTML5Backend}>
        <div className="h-full bg-white relative">
          <Head title="Dashboard" />
          <Board listings={listings} user={auth.user} />
        </div>
      </DndProvider>
    </AuthenticatedLayout>
  );
}
