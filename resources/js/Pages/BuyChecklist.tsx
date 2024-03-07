import BuyChecklist from '@/Components/Dashboard/BuyChecklist';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { useContext } from 'react';
import BoardContext from '@/Context/BoardContext';

const BuyChecklistPage = ({ auth, hasSubscription }: PageProps) => {
  const board = useContext(BoardContext);
  return (
    <AuthenticatedLayout user={auth.user} hasSubscription={hasSubscription}>
      <div className="py-16 px-32">
        <BuyChecklist board={board} />
      </div>
    </AuthenticatedLayout>
  );
};

export default BuyChecklistPage;
