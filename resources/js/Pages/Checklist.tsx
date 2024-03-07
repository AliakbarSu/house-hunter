import Checklist from '@/Components/Dashboard/Checklist';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { useContext } from 'react';
import BoardContext from '@/Context/BoardContext';

const ChecklistPage = ({ auth, hasSubscription }: PageProps) => {
  const board = useContext(BoardContext);
  return (
    <AuthenticatedLayout user={auth.user} hasSubscription={hasSubscription}>
      <div className="py-16 px-32">
        <Checklist board={board} />
      </div>
    </AuthenticatedLayout>
  );
};

export default ChecklistPage;
