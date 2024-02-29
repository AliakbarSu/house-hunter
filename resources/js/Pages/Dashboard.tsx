import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import Board from '@/Components/Dashboard/Board';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Dashboard({
  auth,
  listings,
  hasSubscription,
}: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user} hasSubscription={hasSubscription}>
      <div className="h-full bg-white relative">
        <Head title="Dashboard" />
        <Board listings={listings} />
      </div>
    </AuthenticatedLayout>
  );
}
