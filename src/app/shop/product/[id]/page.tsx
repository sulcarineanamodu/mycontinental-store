'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, ChevronLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { WooCommerceProduct } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product,  setProduct]  = useState<WooCommerceProduct | null>(null);
  const [related,  setRelated]  = useState<WooCommerceProduct[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [qty,      setQty]      = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(({ product: p, related: r }) => {
        setProduct(p);
        setRelated(r || []);
      })
      .catch(() => setError('Failed to load product.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-200 rounded-xl h-96" />
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-8 bg-gray-200 rounded w-2/3" />
              <div className="h-10 bg-gray-200 rounded w-1/4" />
              <div className="h-24 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );

  if (error || !product) return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">{error || 'Product not found'}</p>
          <Link href="/shop" className="text-primary underline">Back to Shop</Link>
        </div>
      </main>
      <Footer />
    </>
  );

  const price        = parseFloat(product.price || '0');
  const regularPrice = parseFloat(product.regular_price || '0');
  const salePrice    = parseFloat(product.sale_price || '0');
  const onSale       = salePrice > 0 && salePrice < regularPrice;
  const discount     = onSale ? Math.round((1 - salePrice / regularPrice) * 100) : 0;
  const images       = product.images && product.images.length > 0 ? product.images : [];

  // Strip HTML from description
  const description = product.description
    ? product.description.replace(/<[^>]*>/g, '').trim()
    : product.short_description
    ? product.short_description.replace(/<[^>]*>/g, '').trim()
    : '';

  const category = product.categories?.[0]?.name || '';

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border-light px-4 md:px-8 py-3">
          <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            {category && (
              <>
                <span>/</span>
                <span className="text-text-primary">{category}</span>
              </>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

            {/* Image gallery */}
            <div>
              <div className="relative bg-white rounded-xl border border-border-light overflow-hidden aspect-square mb-3">
                {images.length > 0 ? (
                  <img
                    src={images[activeImg].src}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    No image available
                  </div>
                )}
                {onSale && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {discount}% OFF
                  </span>
                )}
              </div>
              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-colors ${
                        activeImg === i ? 'border-primary' : 'border-border-light'
                      }`}
                    >
                      <img src={img.src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex flex-col">
              {category && (
                <span className="text-primary text-sm font-semibold uppercase tracking-wide mb-2">{category}</span>
              )}
              <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating placeholder */}
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs text-text-secondary ml-1">Authentic quality</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {onSale ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-primary">£{salePrice.toFixed(2)}</span>
                    <span className="text-lg text-text-secondary line-through">£{regularPrice.toFixed(2)}</span>
                    <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-0.5 rounded">
                      Save {discount}%
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary">£{price.toFixed(2)}</span>
                )}
              </div>

              {/* Description */}
              {description && (
                <p className="text-text-secondary text-sm leading-relaxed mb-6 border-t border-border-light pt-4">
                  {description.length > 300 ? description.slice(0, 300) + '…' : description}
                </p>
              )}

              {/* Qty + Add to Cart */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border border-border-light rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-3 py-2 text-text-secondary hover:bg-gray-100 transition-colors font-semibold"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-semibold text-text-primary min-w-[3rem] text-center">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-3 py-2 text-text-secondary hover:bg-gray-100 transition-colors font-semibold"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>

              {/* SKU */}
              {product.sku && (
                <p className="text-xs text-text-secondary">SKU: {product.sku}</p>
              )}

              {/* Trust badges */}
              <div className="mt-6 pt-4 border-t border-border-light grid grid-cols-2 gap-3 text-xs text-text-secondary">
                <div className="flex items-center gap-2">🚚 Free local delivery in Hillingdon</div>
                <div className="flex items-center gap-2">✅ Authentic product guarantee</div>
                <div className="flex items-center gap-2">⚡ Same-day dispatch before 2pm</div>
                <div className="flex items-center gap-2">🔒 Secure checkout</div>
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-text-primary mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(p => (
                  <Link
                    key={p.id}
                    href={`/shop/product/${p.id}`}
                    className="bg-white border border-border-light rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    <div className="w-full h-40 bg-gray-100 overflow-hidden">
                      {p.images?.[0] ? (
                        <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-text-primary line-clamp-2 mb-1">{p.name}</p>
                      <p className="text-primary font-bold">£{parseFloat(p.price || '0').toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-10">
            <Link href="/shop" className="flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm transition-colors">
              <ChevronLeft size={16} /> Back to Shop
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
