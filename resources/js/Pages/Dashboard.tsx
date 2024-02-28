import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import Board from '@/Components/Dashboard/Board';
import { PageProps } from '@/types';

export default function Dashboard({
  auth,
  listings,
  hasSubscription,
}: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user} hasSubscription={hasSubscription}>
      <div className="h-full bg-white relative">
        <Board listings={listings} />
      </div>
    </AuthenticatedLayout>
  );
}
