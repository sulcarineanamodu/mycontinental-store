'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { WooCommerceProduct } from '@/lib/types';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products/featured?limit=8');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const featured = await response.json();
        setProducts(featured);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-safe-left pr-safe-right">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">
          Featured Products
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Discover our most loved authentic African & Caribbean products.
        </p>

        {error && (
          <div className="text-center py-12 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-56 bg-gray-300" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                  <div className="h-8 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="bg-white border border-border-light rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                {/* Product Image */}
                <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].src}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background to-gray-200">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-text-primary text-sm md:text-base line-clamp-2 mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      {product.sale_price && parseFloat(product.sale_price) > 0 ? (
                        <>
                          <span className="text-xs text-text-secondary line-through">
                            £{parseFloat(product.regular_price).toFixed(2)}
                          </span>
                          <span className="text-lg font-bold text-primary">
                            £{parseFloat(product.sale_price).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-primary">
                          £{parseFloat(product.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group">
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 text-text-secondary">
            <p>No products found</p>
          </div>
        )}
      </div>
    </section>
  );
}
