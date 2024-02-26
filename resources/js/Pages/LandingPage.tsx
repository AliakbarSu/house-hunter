import Pricing from '@/Components/Pricing';
import Navbar from '@/Components/Navbar';
import Hero from '@/Components/Hero';
import { PageProps, Plan } from '@/types';

export default function LandingPage({
  plans,
  isAuthenticated,
  hasSubscription,
}: PageProps<{
  hasSubscription: boolean;
  isAuthenticated: boolean;
  plans: Plan[];
}>) {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar isAuthenticated={isAuthenticated} />
      </header>

      <Hero />
      {!hasSubscription && (
        <Pricing isAuthenticated={isAuthenticated} plans={plans} />
      )}
    </div>
  );
}
