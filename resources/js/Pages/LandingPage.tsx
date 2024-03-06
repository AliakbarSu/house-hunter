import Pricing from '@/Components/LandingPage/Pricing';
import Navbar from '@/Components/LandingPage/Navbar';
import { PageProps, Plan } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import Hero from '@/Components/LandingPage/Hero';
import RepaymentCalculator from '@/Components/Calculators/RepaymentCalculator';

export default function LandingPage({
  plans,
  isAuthenticated,
  hasSubscription,
}: PageProps<{
  plans: Plan[];
}>) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);
  const calculatorRef = useRef<HTMLDivElement | null>(null);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animation-show');
      } else {
        entry.target.classList.remove('animation-show');
      }
    },
    { threshold: 0.1 }
  );

  useEffect(() => {
    if (heroRef.current) observer.observe(heroRef.current);
    if (pricingRef.current) observer.observe(pricingRef.current);
    if (calculatorRef.current) observer.observe(calculatorRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (pricingRef.current) observer.unobserve(pricingRef.current);
      if (calculatorRef.current) observer.unobserve(calculatorRef.current);
    };
  }, [heroRef.current, observer, pricingRef.current, calculatorRef.current]);
  return (
    <div className="bg-white">
      <Head title="Main" />
      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar isAuthenticated={isAuthenticated} />
      </header>
      <Hero ref={heroRef} isAuthenticated={isAuthenticated} />
      <div className="animation-hidden" ref={calculatorRef}>
        <RepaymentCalculator />
      </div>
      {!hasSubscription && (
        <Pricing
          ref={pricingRef}
          isAuthenticated={isAuthenticated}
          plans={plans}
          hasSubscription={hasSubscription}
        />
      )}
    </div>
  );
}
