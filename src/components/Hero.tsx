'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Slide {
  id: number;
  headline: string;
  subtext: string;
  image: string;
  overlayColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    headline: 'Your Taste of Home, Delivered',
    subtext: "The UK's largest African & Caribbean grocery store",
    image: '/hero-1.jpg',
    overlayColor: 'bg-black/50',
  },
  {
    id: 2,
    headline: '2,700+ Authentic Products',
    subtext: 'From fresh produce to hair care — everything you need in one place',
    image: '/hero-2.jpg',
    overlayColor: 'bg-black/50',
  },
  {
    id: 3,
    headline: 'Free Local Delivery',
    subtext: 'Same-day dispatch on orders before 2pm within Hillingdon & Uxbridge.',
    image: '/hero-3.jpg',
    overlayColor: 'bg-black/50',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.02,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.6,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="relative w-full min-h-[600px] md:min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          {/* Dark overlay for text readability */}
          <div className={`absolute inset-0 ${slide.overlayColor}`} />

          {/* Content */}
          <motion.div
            className="relative z-10 h-full flex items-center justify-center max-w-4xl mx-auto px-safe-left pr-safe-right text-center"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            <div className="w-full">
              <motion.h1
                variants={contentVariants}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg"
              >
                {slide.headline}
              </motion.h1>

              <motion.p
                variants={contentVariants}
                className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto drop-shadow-md"
              >
                {slide.subtext}
              </motion.p>

              <motion.div
                variants={contentVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button className="px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Shop Now
                </button>
                <button className="px-8 py-4 border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-all duration-200">
                  Browse Categories
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Animated Decorative Elements */}
          <motion.div
            className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-20 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-accent w-10 h-3'
                : 'bg-white/50 hover:bg-white/70 w-3 h-3'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Indicator */}
      {!isHovering && (
        <div className="absolute top-8 right-8 z-20 text-white/60 text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </div>
      )}
    </section>
  );
}
