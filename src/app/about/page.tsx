import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about MyContinental Food Store — bringing authentic African & Caribbean groceries to Hillingdon and Uxbridge since day one.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* Hero banner */}
        <div className="bg-primary py-16 px-4 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            About MyContinental
          </h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Bringing the authentic tastes of Africa and the Caribbean to Hillingdon and beyond.
          </p>
        </div>

        {/* Our Story */}
        <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          <h2 className="font-display text-3xl font-bold text-text-primary mb-6">Our Story</h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            MyContinental Food Store was founded with one simple mission: to make sure the African and Caribbean communities in Hillingdon never have to go without the foods they grew up with. We stock over 2,700 authentic products — from Iwisa maize meal and Ola-Ola pounded yam to Grace seasonings, Betapac curry powder, and everything in between.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            Whether you're cooking jollof rice for the family, making a Sunday stew, or just need your favourite hot sauce, we've got you covered. We work directly with trusted suppliers to bring you the brands you know and love, at prices that make sense.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed">
            Based in Uxbridge, we serve the local community in Hillingdon and offer same-day dispatch on orders placed before 2pm. We're more than a shop — we're a taste of home.
          </p>
        </section>

        {/* Stats */}
        <section className="bg-white border-y border-border-light py-14">
          <div className="max-w-4xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2,700+', label: 'Products in stock' },
              { value: '18',     label: 'Product categories' },
              { value: 'Same day', label: 'Dispatch before 2pm' },
              { value: 'Local',  label: 'Hillingdon delivery' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-3xl font-bold text-primary mb-1">{value}</p>
                <p className="text-sm text-text-secondary">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What we stock */}
        <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          <h2 className="font-display text-3xl font-bold text-text-primary mb-6">What We Stock</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              '🌾 Grains & Flour',
              '🥫 Canned & Packaged Foods',
              '🧂 Condiments & Spreads',
              '🥤 Drinks & Beverages',
              '🫒 Oils & Butter',
              '💇 Hair Care',
              '🧴 Personal Care',
              '🧹 Household & Cleaning',
              '👶 Baby & Kids Products',
              '🧊 Fresh & Frozen Foods',
              '🛒 General Groceries',
              '🌿 Cooking Essentials',
            ].map(item => (
              <div key={item} className="bg-white border border-border-light rounded-lg px-4 py-3 text-sm font-medium text-text-primary">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-14 px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to shop?</h2>
          <p className="text-white/85 mb-8 max-w-xl mx-auto">Browse all 2,700+ products and get same-day dispatch on orders before 2pm.</p>
          <Link
            href="/shop"
            className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </section>

      </main>
      <Footer />
    </>
  );
}
