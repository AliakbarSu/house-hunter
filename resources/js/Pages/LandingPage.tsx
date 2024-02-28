import Pricing from '@/Components/LandingPage/Pricing';
import Navbar from '@/Components/LandingPage/Navbar';
import Hero from '@/Components/LandingPage/Hero';
import { PageProps, Plan } from '@/types';

export default function LandingPage({
  plans,
  isAuthenticated,
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
      <Pricing isAuthenticated={isAuthenticated} plans={plans} />
    </div>
  );
}
