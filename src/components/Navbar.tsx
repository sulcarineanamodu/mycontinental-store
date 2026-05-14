'use client';

import { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(0);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Shop', href: '#' },
    { label: 'Categories', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-safe-left pr-safe-right">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="MyContinental African & Caribbean Grocery"
              width={320}
              height={100}
              className="h-20 w-auto object-contain"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-accent transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Icons and Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-primary-dark rounded-lg transition-colors">
              <Search size={20} />
            </button>

            <button className="relative p-2 hover:bg-primary-dark rounded-lg transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-primary rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-primary-dark rounded-lg transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-primary-light">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-0 py-3 hover:text-accent transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
