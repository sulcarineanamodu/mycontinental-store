import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryStrip from '@/components/CategoryStrip';
import FeaturedProducts from '@/components/FeaturedProducts';
import SubscriptionBoxes from '@/components/SubscriptionBoxes';
import PromoBanner from '@/components/PromoBanner';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />
      <SubscriptionBoxes />
      <PromoBanner />
      <TrustSection />
      <Footer />
    </>
  );
}
