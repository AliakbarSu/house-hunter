import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import Board from '@/Components/Dashboard/Board';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="h-full bg-white">
        <Board />
      </div>
    </AuthenticatedLayout>
  );
}
