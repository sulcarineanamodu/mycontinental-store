'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Truck, Lock, Award } from 'lucide-react';

const trustItems = [
  {
    icon: CheckCircle,
    title: 'Authentic Products',
    description: 'Genuine African & Caribbean brands you trust',
  },
  {
    icon: Truck,
    title: 'Local Hillingdon Delivery',
    description: 'Free delivery within Hillingdon & Uxbridge area',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    description: 'SSL encrypted transactions & data protection',
  },
  {
    icon: Award,
    title: 'Family Run Since 2010',
    description: 'Over a decade of trusted service',
  },
];

export default function TrustSection() {
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
      <div className="max-w-7xl mx-auto px-safe-left pr-safe-right">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Icon size={32} className="text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-text-primary text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
