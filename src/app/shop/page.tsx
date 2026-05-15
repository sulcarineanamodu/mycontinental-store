'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { WooCommerceProduct, WooCommerceCategory } from '@/lib/types';
import Navbar from '@/components/Navbar';
import { decodeHtmlEntities } from '@/lib/utils';
import Footer from '@/components/Footer';

const SORT_OPTIONS = [
  { label: 'Newest',        orderby: 'date',  order: 'desc' },
  { label: 'Price: Low–High', orderby: 'price', order: 'asc'  },
  { label: 'Price: High–Low', orderby: 'price', order: 'desc' },
  { label: 'Name: A–Z',    orderby: 'title', order: 'asc'  },
];

export default function ShopPage() {
  const [products,    setProducts]    = useState<WooCommerceProduct[]>([]);
  const [categories,  setCategories]  = useState<WooCommerceCategory[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [search,      setSearch]      = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [sortIndex,   setSortIndex]   = useState(0);
  const [page,        setPage]        = useState(1);
  const [totalPages,  setTotalPages]  = useState(1);
  const [total,       setTotal]       = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const PER_PAGE = 24;

  // Fetch categories once
  useEffect(() => {
    fetch('/api/categories?per_page=100')
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setCategories(data) : [])
      .catch(() => {});
  }, []);

  // Fetch products whenever filters change
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const sort = SORT_OPTIONS[sortIndex];
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(PER_PAGE),
        orderby: sort.orderby,
        order:   sort.order,
      });
      if (search)         params.set('search',   search);
      if (activeCategory) params.set('category', String(activeCategory));

      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error('Failed to load');
      const { products: p, total: t, totalPages: tp } = await res.json();
      setProducts(p || []);
      setTotal(t || 0);
      setTotalPages(tp || 1);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, search, activeCategory, sortIndex]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Reset to page 1 when filters change
  const handleCategory = (id: number | null) => {
    setActiveCategory(id);
    setPage(1);
    setSidebarOpen(false);
  };
  const handleSort = (i: number) => { setSortIndex(i); setPage(1); };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };
  const clearSearch = () => { setSearch(''); setSearchInput(''); setPage(1); };

  const activeCategoryName = categories.find(c => c.id === activeCategory)?.name ? decodeHtmlEntities(categories.find(c => c.id === activeCategory)!.name) : undefined;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Page header */}
        <div className="bg-white border-b border-border-light py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
              All Products
            </h1>
            <p className="text-text-secondary">
              {total > 0 ? `${total.toLocaleString()} products` : 'Browse our full range'}
              {activeCategoryName ? ` in ${activeCategoryName}` : ''}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Search + Sort bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <form onSubmit={handleSearch} className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-10 py-2.5 border border-border-light rounded-lg text-sm focus:outline-none focus:border-primary"
                />
                {searchInput && (
                  <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary">
                    <X size={16} />
                  </button>
                )}
              </div>
              <button type="submit" className="px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors">
                Search
              </button>
            </form>

            <div className="flex gap-2">
              <select
                value={sortIndex}
                onChange={e => handleSort(Number(e.target.value))}
                className="px-3 py-2.5 border border-border-light rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary bg-white"
              >
                {SORT_OPTIONS.map((opt, i) => (
                  <option key={i} value={i}>{opt.label}</option>
                ))}
              </select>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden flex items-center gap-2 px-4 py-2.5 border border-border-light rounded-lg text-sm font-semibold bg-white"
              >
                <SlidersHorizontal size={16} />
                Filter
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar — desktop always visible, mobile toggled */}
            <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-56 shrink-0`}>
              <div className="bg-white border border-border-light rounded-lg p-4 sticky top-4">
                <h3 className="font-semibold text-text-primary mb-3 text-sm uppercase tracking-wide">Categories</h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => handleCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === null
                          ? 'bg-primary text-white font-semibold'
                          : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                      }`}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeCategory === cat.id
                            ? 'bg-primary text-white font-semibold'
                            : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                        }`}
                      >
                        {decodeHtmlEntities(cat.name)}
                        {cat.count > 0 && (
                          <span className="ml-1 text-xs opacity-70">({cat.count})</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Product grid */}
            <div className="flex-1 min-w-0">
              {error && (
                <div className="text-center py-12 text-red-600">
                  <p>{error}</p>
                  <button onClick={fetchProducts} className="mt-3 text-primary underline text-sm">Try again</button>
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...Array(PER_PAGE)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden animate-pulse border border-border-light">
                      <div className="w-full h-48 bg-gray-200" />
                      <div className="p-3 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                        <div className="h-8 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-24 text-text-secondary">
                  <p className="text-lg font-semibold mb-2">No products found</p>
                  <p className="text-sm">Try a different search or category.</p>
                  {(search || activeCategory) && (
                    <button onClick={() => { clearSearch(); handleCategory(null); }} className="mt-4 text-primary underline text-sm">
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products.map(product => (
                      <div
                        key={product.id}
                        className="bg-white border border-border-light rounded-lg overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
                      >
                        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0].src}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <span className="text-gray-400 text-xs">No image</span>
                            </div>
                          )}
                          {product.on_sale && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                              SALE
                            </span>
                          )}
                        </div>

                        <div className="p-3">
                          <h3 className="text-sm font-semibold text-text-primary line-clamp-2 mb-2 min-h-[2.5rem]">
                            {product.name}
                          </h3>
                          <div className="mb-3">
                            {product.sale_price && parseFloat(product.sale_price) > 0 ? (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-text-secondary line-through">
                                  £{parseFloat(product.regular_price).toFixed(2)}
                                </span>
                                <span className="text-base font-bold text-primary">
                                  £{parseFloat(product.sale_price).toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-base font-bold text-primary">
                                £{parseFloat(product.price || '0').toFixed(2)}
                              </span>
                            )}
                          </div>
                          <button className="w-full bg-primary hover:bg-primary-dark text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                            <ShoppingCart size={14} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-10">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="flex items-center gap-1 px-4 py-2 border border-border-light rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-gray-100 transition-colors"
                      >
                        <ChevronLeft size={16} /> Prev
                      </button>
                      <span className="text-sm text-text-secondary">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="flex items-center gap-1 px-4 py-2 border border-border-light rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-gray-100 transition-colors"
                      >
                        Next <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
