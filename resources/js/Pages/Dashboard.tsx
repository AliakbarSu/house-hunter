import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import Board from '@/Components/Dashboard/Board';
import { BoardColumn, PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const columns = [
  { id: 0, title: 'Wishlist', type: 'wishlist', color: 'indigo-400' },
  { id: 1, title: 'Viewing', type: 'viewing', color: 'sky-600' },
  { id: 2, title: 'Viewed', type: 'viewed', color: 'purple-600' },
  { id: 3, title: 'Applied', type: 'applied', color: 'pink-600' },
  {
    id: 4,
    title: 'Offer Rejected',
    type: 'offer_rejected',
    color: 'orange-600',
  },
  { id: 5, title: 'Offer Accepted', type: 'offer_accepted', color: 'teal-600' },
];

export default function Dashboard({
  auth,
  listings,
  hasSubscription,
  board,
}: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user} hasSubscription={hasSubscription}>
      <DndProvider backend={HTML5Backend}>
        <div className="h-full bg-white relative">
          <Head title="Dashboard" />
          <Board
            columns={board?.columns || (columns as unknown as BoardColumn[])}
            listings={listings}
            user={auth.user}
          />
        </div>
      </DndProvider>
    </AuthenticatedLayout>
  );
}
