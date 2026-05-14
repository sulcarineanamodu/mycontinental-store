'use client';

const promoItems = [
  '🚚 Free local delivery in Hillingdon & Uxbridge',
  '⚡ Same-day dispatch on orders before 2pm',
  '🛒 2,700+ authentic products',
  '⭐ Family run since 2010',
];

export default function PromoBanner() {
  // Duplicate items so the seamless loop always has content filling the screen
  const items = [...promoItems, ...promoItems, ...promoItems, ...promoItems];

  return (
    <section className="bg-accent overflow-hidden py-3">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'marquee 30s linear infinite',
        }}
      >
        {items.map((text, i) => (
          <span
            key={i}
            className="text-text-primary font-semibold text-sm md:text-base px-6 md:px-10 shrink-0"
          >
            {text}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
