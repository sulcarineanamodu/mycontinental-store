'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { WooCommerceCategory } from '@/lib/types';
import { decodeHtmlEntities } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen]           = useState(false);
  const [cartCount]                   = useState(0);
  const [catOpen, setCatOpen]         = useState(false);
  const [categories, setCategories]   = useState<WooCommerceCategory[]>([]);
  const [catMobileOpen, setCatMobileOpen] = useState(false);
  const dropdownRef                   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/categories?per_page=100')
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setCategories(data) : [])
      .catch(() => {});
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="MyContinental" width={220} height={60}
              className="h-10 md:h-14 w-auto object-contain" priority />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-accent transition-colors font-medium">Home</Link>
            <Link href="/shop" className="hover:text-accent transition-colors font-medium">Shop</Link>

            {/* Categories dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCatOpen(o => !o)}
                className="flex items-center gap-1 hover:text-accent transition-colors font-medium"
              >
                Categories <ChevronDown size={15} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  <Link
                    href="/shop"
                    onClick={() => setCatOpen(false)}
                    className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-gray-50 border-b border-gray-100 mb-1"
                  >
                    All Products
                  </Link>
                  <div className="grid grid-cols-2 gap-0.5 px-2">
                    {categories.map(cat => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.id}`}
                        onClick={() => setCatOpen(false)}
                        className="block px-3 py-2 text-xs text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
                      >
                        {decodeHtmlEntities(cat.name)}
                        <span className="text-gray-400 ml-1">({cat.count})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="hover:text-accent transition-colors font-medium">About</Link>
            <Link href="/contact" className="hover:text-accent transition-colors font-medium">Contact</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link href="/shop" className="p-2 hover:bg-primary-dark rounded-lg transition-colors">
              <Search size={20} />
            </Link>
            <button className="relative p-2 hover:bg-primary-dark rounded-lg transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-primary rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-primary-dark rounded-lg transition-colors">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-primary-light">
            <Link href="/" onClick={() => setIsOpen(false)} className="block py-3 hover:text-accent font-medium">Home</Link>
            <Link href="/shop" onClick={() => setIsOpen(false)} className="block py-3 hover:text-accent font-medium">Shop</Link>

            {/* Mobile categories accordion */}
            <button
              onClick={() => setCatMobileOpen(o => !o)}
              className="flex items-center gap-1 w-full py-3 hover:text-accent font-medium"
            >
              Categories <ChevronDown size={15} className={`transition-transform ${catMobileOpen ? 'rotate-180' : ''}`} />
            </button>
            {catMobileOpen && (
              <div className="pl-4 pb-2 space-y-1">
                <Link href="/shop" onClick={() => setIsOpen(false)} className="block py-1.5 text-sm text-white/80 hover:text-accent">All Products</Link>
                {categories.map(cat => (
                  <Link key={cat.id} href={`/shop?category=${cat.id}`}
                    onClick={() => setIsOpen(false)}
                    className="block py-1.5 text-sm text-white/80 hover:text-accent">
                    {decodeHtmlEntities(cat.name)}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/about" onClick={() => setIsOpen(false)} className="block py-3 hover:text-accent font-medium">About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-3 hover:text-accent font-medium">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
