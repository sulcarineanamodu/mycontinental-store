'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SubscriptionBox {
  id: number;
  title: string;
  price: string;
  duration: string;
  audience: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const subscriptionBoxes: SubscriptionBox[] = [
  {
    id: 1,
    title: 'Solo Box',
    price: '£29.99',
    duration: '/month',
    audience: 'For 1 person',
    description:
      'Perfect for individuals — a curated selection of cupboard essentials, snacks, and fresh seasonings.',
    features: [
      '8–10 products',
      'Free local delivery',
      'Customisable categories',
    ],
  },
  {
    id: 2,
    title: 'Family Box',
    price: '£54.99',
    duration: '/month',
    audience: 'For 2–4 people',
    description:
      'Everything a family needs — grains, proteins, sauces, beverages, and more.',
    features: [
      '18–22 products',
      'Free local delivery',
      'Customisable categories',
      'Priority dispatch',
    ],
    isPopular: true,
  },
  {
    id: 3,
    title: 'Large Family Box',
    price: '£84.99',
    duration: '/month',
    audience: 'For 5+ people',
    description:
      'Bulk essentials for large households — maximum value, maximum variety.',
    features: [
      '30–35 products',
      'Free local delivery',
      'Customisable categories',
      'Priority dispatch',
      '10% discount on additional orders',
    ],
  },
];

const categories = [
  'Cooking Essentials',
  'Fresh & Frozen Produce',
  'Hair & Body Care',
];

export default function SubscriptionBoxes() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Your Monthly Taste of Home
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Get authentic African & Caribbean essentials delivered to your door
            every month — tailored to your household size.
          </p>
        </div>

        {/* Subscription Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {subscriptionBoxes.map((box) => (
            <motion.div
              key={box.id}
              variants={itemVariants}
              className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                box.isPopular
                  ? 'border-2 border-primary shadow-xl ring-1 ring-primary/10'
                  : 'border border-border-light hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {box.isPopular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                  Most Popular
                </div>
              )}

              {/* Card Background */}
              <div
                className={`p-8 ${
                  box.isPopular ? 'bg-white' : 'bg-white'
                }`}
              >
                {/* Price Section */}
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
                    {box.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {box.audience}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-accent">
                      {box.price}
                    </span>
                    <span className="text-text-secondary text-sm">
                      {box.duration}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                  {box.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {box.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check
                        size={20}
                        className="text-primary flex-shrink-0 mt-0.5"
                      />
                      <span className="text-text-secondary text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    box.isPopular
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-accent text-white hover:bg-accent-light'
                  }`}
                >
                  Subscribe Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Customisation Info */}
        <motion.div
          className="bg-white rounded-lg border border-border-light p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="font-display text-2xl font-bold text-text-primary mb-6 text-center">
            Choose Your Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center justify-center p-6 bg-background rounded-lg border border-border-light hover:border-primary transition-colors"
              >
                <p className="font-semibold text-text-primary text-center">
                  {category}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-text-secondary text-sm mt-6">
            Select which categories you'd like included in your monthly box.
            Change your preferences anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
