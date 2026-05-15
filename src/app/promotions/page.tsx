'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Tag, Truck, Star, Clock, CheckCircle, ChevronRight, Zap, Gift, Package } from 'lucide-react';
import { WooCommerceProduct } from '@/lib/types';
import { proxyImg, decodeHtmlEntities } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ── subscription plans ──────────────────────────────────────────────────── */
const PLANS = [
  {
    name: 'Solo Box',
    sub: 'For 1 person',
    price: '£29.99',
    period: '/month',
    colour: 'border-gray-600',
    badge: null,
    tagline: 'Great Value, Just For You',
    tagIcon: '🚚',
    desc: 'Perfect for individuals — a curated selection of cupboard essentials, snacks, and fresh seasonings.',
    perks: [
      '8–10 products per box',
      'Free local delivery',
      'Customisable categories',
    ],
    cta: 'Get Solo Box',
    ctaStyle: 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white',
  },
  {
    name: 'Family Box',
    sub: 'For 2–4 people',
    price: '£54.99',
    period: '/month',
    colour: 'border-primary',
    badge: 'Most Popular',
    tagline: 'Best Balance for Families',
    tagIcon: '⭐',
    desc: 'Everything a family needs — grains, proteins, sauces, beverages, and more.',
    perks: [
      '18–22 products per box',
      'Free local delivery',
      'Customisable categories',
      'Priority dispatch',
    ],
    cta: 'Get Family Box',
    ctaStyle: 'bg-primary text-white hover:bg-primary-dark',
  },
  {
    name: 'Large Family Box',
    sub: 'For 5+ people',
    price: '£84.99',
    period: '/month',
    colour: 'border-yellow-400',
    badge: 'Best Value',
    tagline: 'More for Your Home',
    tagIcon: '💎',
    desc: 'Bulk essentials for large households — maximum value, maximum variety.',
    perks: [
      '30–35 products per box',
      'Free local delivery',
      'Customisable categories',
      'Priority dispatch',
      '10% discount on additional orders',
    ],
    cta: 'Get Large Family Box',
    ctaStyle: 'bg-yellow-500 text-white hover:bg-yellow-600',
  },
];

/* ── current deals ───────────────────────────────────────────────────────── */
const DEALS = [
  {
    icon: <Truck size={28} className="text-white" />,
    bg: 'from-green-600 to-green-800',
    title: 'Free Delivery',
    subtitle: 'On orders over £40',
    tag: 'Always On',
  },
  {
    icon: <Tag size={28} className="text-white" />,
    bg: 'from-red-500 to-red-700',
    title: 'Up to 20% Off',
    subtitle: 'Selected African & Caribbean staples',
    tag: 'This Week',
  },
  {
    icon: <Gift size={28} className="text-white" />,
    bg: 'from-yellow-500 to-yellow-700',
    title: 'Buy 2 Get 1 Free',
    subtitle: 'On all cooking oils & sauces',
    tag: 'Limited Time',
  },
  {
    icon: <Zap size={28} className="text-white" />,
    bg: 'from-purple-600 to-purple-800',
    title: 'Flash Sale',
    subtitle: 'New deals every Friday',
    tag: 'Weekly',
  },
];

/* ── product card ────────────────────────────────────────────────────────── */
function ProductCard({ product, badge }: { product: WooCommerceProduct; badge?: string }) {
  const price        = parseFloat(product.price || '0');
  const regularPrice = parseFloat(product.regular_price || '0');
  const salePrice    = parseFloat(product.sale_price || '0');
  const onSale       = salePrice > 0 && salePrice < regularPrice;
  const discount     = onSale ? Math.round((1 - salePrice / regularPrice) * 100) : 0;

  return (
    <Link
      href={`/shop/product/${product.id}`}
      className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col"
    >
      <div className="relative w-full h-44 bg-gray-50 overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={proxyImg(product.images[0].src)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No image</div>
        )}
        {badge && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
        {onSale && !badge && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 flex-1 leading-snug">
          {decodeHtmlEntities(product.name)}
        </h3>
        <div className="mb-3">
          {onSale ? (
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-primary">£{salePrice.toFixed(2)}</span>
              <span className="text-xs text-gray-400 line-through">£{regularPrice.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-base font-bold text-primary">£{price.toFixed(2)}</span>
          )}
        </div>
        <button className="w-full bg-primary hover:bg-primary-dark text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5">
          <ShoppingCart size={13} /> Add to Cart
        </button>
      </div>
    </Link>
  );
}

/* ── countdown timer ─────────────────────────────────────────────────────── */
function Countdown() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    // Count down to next midnight
    const tick = () => {
      const now  = new Date();
      const end  = new Date();
      end.setHours(24, 0, 0, 0);
      const diff = Math.floor((end.getTime() - now.getTime()) / 1000);
      setTime({
        h: Math.floor(diff / 3600),
        m: Math.floor((diff % 3600) / 60),
        s: diff % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      {[['h', time.h], ['m', time.m], ['s', time.s]].map(([label, val]) => (
        <div key={label as string} className="text-center">
          <div className="bg-white/20 rounded-lg px-3 py-1.5 font-mono font-bold text-xl text-white min-w-[44px]">
            {pad(val as number)}
          </div>
          <div className="text-white/70 text-xs mt-0.5 uppercase">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── page ────────────────────────────────────────────────────────────────── */
export default function PromotionsPage() {
  const [saleProducts,    setSaleProducts]    = useState<WooCommerceProduct[]>([]);
  const [newArrivals,     setNewArrivals]     = useState<WooCommerceProduct[]>([]);
  const [loadingSale,     setLoadingSale]     = useState(true);
  const [loadingNew,      setLoadingNew]      = useState(true);
  const [email,           setEmail]           = useState('');
  const [selectedPlan,    setSelectedPlan]    = useState('Premium');
  const [submitted,       setSubmitted]       = useState(false);

  useEffect(() => {
    // Sale products
    fetch('/api/products?per_page=8&orderby=date&order=desc')
      .then(r => r.json())
      .then(({ products }) => {
        const onSale = (products || []).filter((p: WooCommerceProduct) =>
          p.on_sale && p.images?.length > 0
        );
        setSaleProducts(onSale.slice(0, 8));
      })
      .finally(() => setLoadingSale(false));

    // New arrivals
    fetch('/api/products?per_page=24&orderby=date&order=desc')
      .then(r => r.json())
      .then(({ products }) => {
        const withImages = (products || []).filter((p: WooCommerceProduct) => p.images?.length > 0);
        setNewArrivals(withImages.slice(0, 8));
      })
      .finally(() => setLoadingNew(false));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* ── HERO BANNER ─────────────────────────────────────────────── */}
        <div className="relative bg-gradient-to-br from-[#1a3a1a] via-[#1a5c2a] to-[#0d2d0d] overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

          <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">
            <div className="max-w-2xl">
              <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                🔥 This Week's Deals
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight mb-4">
                Authentic<br />
                <span className="text-yellow-400">African &amp; Caribbean</span><br />
                Groceries
              </h1>
              <p className="text-white/80 text-lg mb-6">
                Delivered to your door. Taste of home — one click away.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href="/shop"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 text-sm"
                >
                  Shop All Deals <ChevronRight size={16} />
                </Link>
                <a href="#subscribe"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm border border-white/20"
                >
                  Monthly Subscription
                </a>
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-10 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Clock size={16} />
                <span>Today's deals end in:</span>
              </div>
              <Countdown />
            </div>
          </div>
        </div>

        {/* ── DEAL CARDS ──────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DEALS.map((deal, i) => (
              <div key={i} className={`bg-gradient-to-br ${deal.bg} rounded-xl p-4 text-white shadow-lg`}>
                <div className="flex items-start justify-between mb-3">
                  {deal.icon}
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">{deal.tag}</span>
                </div>
                <p className="font-bold text-base leading-tight">{deal.title}</p>
                <p className="text-white/80 text-xs mt-1">{deal.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SALE PRODUCTS ────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">🏷️ On Sale Now</h2>
              <p className="text-gray-500 text-sm mt-1">Reduced prices — while stocks last</p>
            </div>
            <Link href="/shop" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>

          {loadingSale ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : saleProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {saleProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <p className="text-gray-400 mb-4">Check back soon for sale items</p>
              <Link href="/shop" className="text-primary font-semibold hover:underline">Browse all products →</Link>
            </div>
          )}
        </div>

        {/* ── FREE DELIVERY BANNER ─────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-primary to-green-700 py-10 px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Truck size={40} className="mx-auto mb-3 opacity-90" />
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Free Delivery on Orders Over £40</h2>
            <p className="text-white/80 mb-6 text-sm">Covering Hillingdon, Uxbridge and surrounding areas. Same-day dispatch on orders placed before 2pm.</p>
            <Link href="/shop"
              className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Shop Now & Save on Delivery
            </Link>
          </div>
        </div>

        {/* ── NEW ARRIVALS ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">✨ New Arrivals</h2>
              <p className="text-gray-500 text-sm mt-1">Just landed in store</p>
            </div>
            <Link href="/shop?orderby=date" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
              See all new <ChevronRight size={14} />
            </Link>
          </div>

          {loadingNew ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newArrivals.map(p => <ProductCard key={p.id} product={p} badge="NEW" />)}
            </div>
          )}
        </div>

        {/* ── SUBSCRIPTION ─────────────────────────────────────────────── */}
        <div id="subscribe" className="bg-gradient-to-br from-[#0d2d0d] via-[#1a3a1a] to-[#0d2d0d] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-4">
              <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                📦 Monthly Subscription Box
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                Your Monthly <span className="text-yellow-400">Taste of Home</span>
              </h2>
              <p className="text-gray-300 max-w-xl mx-auto text-sm mb-2">
                Get authentic African &amp; Caribbean essentials delivered to your door every month — tailored to your household size.
              </p>
            </div>

            {/* Trust icons */}
            <div className="flex items-center justify-center gap-6 mb-10 flex-wrap">
              {[['🌿','Authentic Products'],['🚚','Free Local Delivery'],['✅','Trusted Quality']].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2 text-gray-300 text-sm">
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>

            {/* Plan cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {PLANS.map(plan => (
                <div
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`relative bg-white rounded-2xl border-2 ${plan.colour} overflow-hidden cursor-pointer transition-all duration-200 ${selectedPlan === plan.name ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-transparent scale-[1.02]' : ''}`}
                >
                  {plan.badge && (
                    <span className="absolute -top-0 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-b-xl z-10">
                      {plan.badge}
                    </span>
                  )}
                  <div className="p-6 pt-8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">👤</span>
                      <div>
                        <h3 className="text-gray-900 font-bold text-lg leading-tight">{plan.name}</h3>
                        <p className="text-gray-500 text-xs">{plan.sub}</p>
                      </div>
                    </div>
                    <div className="flex items-end gap-1 mt-3 mb-3">
                      <span className="text-3xl font-black text-primary">{plan.price}</span>
                      <span className="text-gray-400 text-sm mb-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{plan.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {plan.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                          <CheckCircle size={15} className="text-primary mt-0.5 shrink-0" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-2.5 rounded-xl font-bold text-sm transition-colors ${plan.ctaStyle}`}>
                      {plan.cta}
                    </button>
                  </div>
                  {/* Bottom tagline bar */}
                  <div className="bg-primary text-white text-xs font-bold text-center py-2 flex items-center justify-center gap-1.5">
                    <span>{plan.tagIcon}</span> {plan.tagline}
                  </div>
                </div>
              ))}
            </div>

            {/* Email signup */}
            {!submitted ? (
              <div className="bg-gray-700/50 rounded-2xl p-8 max-w-xl mx-auto text-center">
                <Package size={32} className="text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-bold text-lg mb-1">Be First to Know</h3>
                <p className="text-gray-400 text-sm mb-5">
                  Subscribe for early access to deals, new arrivals, and exclusive member discounts.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-gray-800 text-white border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-green-900/40 border border-green-600 rounded-2xl p-8 max-w-xl mx-auto text-center">
                <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-bold text-lg mb-1">You're on the list! 🎉</h3>
                <p className="text-gray-400 text-sm">We'll be in touch with your first exclusive deal very soon.</p>
              </div>
            )}

            <p className="text-center text-gray-500 text-xs mt-6">
              No commitment • Cancel anytime • Secure payment
            </p>
          </div>
        </div>

        {/* ── FOOTER STRIP ─────────────────────────────────────────────── */}
        <div className="bg-primary py-4 px-4">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 text-white text-xs font-semibold text-center">
            <span>🫶 Authentic African &amp; Caribbean Goods</span>
            <span className="hidden md:block opacity-40">|</span>
            <span>🌿 Handpicked with Care</span>
            <span className="hidden md:block opacity-40">|</span>
            <span>📦 Delivered to Your Door</span>
            <span className="hidden md:block opacity-40">|</span>
            <span className="text-yellow-400 italic">Taste of Home, Delivered with Care</span>
          </div>
        </div>

        {/* ── TRUST BAR ────────────────────────────────────────────────── */}
        <div className="bg-white border-t border-gray-100 py-8 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🛒', label: '2,700+ Products', sub: 'Authentic range' },
              { icon: '🚚', label: 'Same-Day Dispatch', sub: 'Order before 2pm' },
              { icon: '⭐', label: 'Trusted Store', sub: 'Quality guaranteed' },
              { icon: '🔒', label: 'Secure Checkout', sub: 'Safe & protected' },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                <p className="text-gray-400 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
