import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RepaymentCalculator from '@/Components/Calculators/RepaymentCalculator';
import { PageProps } from '@/types';

const Calculators = ({ auth, hasSubscription }: PageProps) => {
  return (
    <AuthenticatedLayout user={auth.user} hasSubscription={hasSubscription}>
      <div>
        <RepaymentCalculator />
      </div>
    </AuthenticatedLayout>
  );
};

export default Calculators;
