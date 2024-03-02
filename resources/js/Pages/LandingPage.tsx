import Pricing from '@/Components/LandingPage/Pricing';
import Navbar from '@/Components/LandingPage/Navbar';
import Hero from '@/Components/LandingPage/Hero';
import { PageProps, Plan } from '@/types';
import { Head } from '@inertiajs/react';

export default function LandingPage({
  plans,
  isAuthenticated,
  hasSubscription,
}: PageProps<{
  plans: Plan[];
}>) {
  return (
    <div className="bg-white">
      <Head title="Main" />
      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar isAuthenticated={isAuthenticated} />
      </header>

      <Hero isAuthenticated={isAuthenticated} />
      {!hasSubscription && (
        <Pricing
          isAuthenticated={isAuthenticated}
          plans={plans}
          hasSubscription={hasSubscription}
        />
      )}
    </div>
  );
}
