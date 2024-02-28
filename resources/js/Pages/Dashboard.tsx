import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import Board from '@/Components/Dashboard/Board';
import { Listing, PageProps } from '@/types';

export default function Dashboard({
  auth,
  listings,
  hasSubscription,
}: PageProps<{ listings: Listing[]; hasSubscription: boolean }>) {
  return (
    <AuthenticatedLayout user={auth.user} hasSubscription={hasSubscription}>
      <div className="h-full bg-white">
        <Board listings={listings} />
      </div>
    </AuthenticatedLayout>
  );
}
