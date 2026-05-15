'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { WooCommerceCategory } from '@/lib/types';
import { decodeHtmlEntities } from '@/lib/utils';

const MotionLink = motion(Link);

const categoryEmojis: Record<string, string> = {
  'Fresh Produce': '🥬',
  'Rice & Grains': '🌾',
  'Meat & Fish': '🍖',
  'Hair & Beauty': '💇',
  'Cooking Essentials': '🧂',
  'Drinks & Beverages': '🥤',
  'Snacks': '🥜',
  'Household': '🧹',
  'default': '🛒',
};

export default function CategoryStrip() {
  const [categories, setCategories] = useState<WooCommerceCategory[]>([]);
  const [isInView, setIsInView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('category-strip');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="category-strip"
      className="py-12 md:py-16 bg-background border-b border-border-light"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-display text-2xl md:text-4xl font-bold text-text-primary mb-6 md:mb-8 text-center">
          Shop by Category
        </h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {loading ? (
            [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="bg-gray-200 p-4 rounded-lg h-24 md:h-32 animate-pulse"
              />
            ))
          ) : categories.length > 0 ? (
            categories.map((category) => {
              const decodedName = decodeHtmlEntities(category.name);
              const emoji = categoryEmojis[decodedName] || categoryEmojis['default'];
              return (
                <MotionLink
                  key={category.id}
                  href={`/shop?category=${category.id}`}
                  variants={itemVariants}
                  className="group relative bg-white p-3 md:p-6 rounded-lg border border-border-light hover:border-primary hover:shadow-lg transition-all duration-300 flex flex-col items-center gap-2 md:gap-3 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl md:text-4xl">{emoji}</div>
                  <p className="text-xs md:text-sm font-semibold text-text-primary text-center group-hover:text-primary transition-colors">
                    {decodedName}
                  </p>
                  <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </MotionLink>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8 text-text-secondary">
              No categories found
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
