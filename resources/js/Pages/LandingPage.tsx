import Pricing from '@/Components/LandingPage/Pricing';
import Navbar from '@/Components/LandingPage/Navbar';
import Hero from '@/Components/LandingPage/Hero';

export default function LandingPage() {
  return (
    <>
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <Navbar />
        </header>

        <Hero />
        <Pricing />
      </div>
    </>
  );
}
