'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { label: 'All Products',  href: '/shop' },
      { label: 'Featured',      href: '/shop' },
      { label: 'On Sale',       href: '/shop' },
      { label: 'New Arrivals',  href: '/shop' },
    ],
    Company: [
      { label: 'About Us',  href: '/about' },
      { label: 'Contact',   href: '/contact' },
      { label: 'Blog',      href: '/about' },
      { label: 'Careers',   href: '/contact' },
    ],
    Support: [
      { label: 'FAQ',            href: '/contact' },
      { label: 'Shipping Info',  href: '/contact' },
      { label: 'Returns',        href: '/contact' },
      { label: 'Privacy Policy', href: '/contact' },
    ],
    Legal: [
      { label: 'Terms of Service', href: '/contact' },
      { label: 'Delivery Policy',  href: '/contact' },
      { label: 'Refund Policy',    href: '/contact' },
      { label: 'Accessibility',    href: '/contact' },
    ],
  };

  const socialLinks = [
    { name: 'f',  href: 'https://facebook.com', label: 'Facebook' },
    { name: '𝕏',  href: 'https://x.com', label: 'X' },
    { name: '📷', href: 'https://instagram.com', label: 'Instagram' },
    { name: '✉️', href: '/contact', label: 'Email' },
  ];

  return (
    <footer className="bg-text-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="font-display text-2xl font-bold mb-2">MyContinental</h3>
            <p className="text-gray-300 text-sm mb-6">
              The UK's largest African & Caribbean grocery store. Your taste of home, delivered.
            </p>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="p-2 bg-white/10 hover:bg-primary rounded-full transition-colors text-lg"
                  aria-label={link.label}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href="https://wa.me/447895870423"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-accent transition-colors text-sm"
            >
              💬 WhatsApp: 07895870423
            </a>

            {/* Shop Address */}
            <div className="mt-6 text-gray-300 text-sm">
              <h4 className="font-semibold text-white mb-2">Visit Us</h4>
              <p>The Arcade, Unit 7</p>
              <p>276/277 High St (Opp Nando's)</p>
              <p>Uxbridge, UB8 1LG</p>
              <p className="mt-3">📞 07895 870 423</p>
            </div>

            {/* Opening Hours */}
            <div className="mt-6 text-gray-300 text-sm">
              <h4 className="font-semibold text-white mb-2">Opening Hours</h4>
              <p>Mon - Fri: 9:30am - 6:30pm</p>
              <p>Sat: 10:30am - 6:30pm</p>
              <p>Sun: Closed</p>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} MyContinental Food Store. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/contact" className="text-gray-300 hover:text-accent text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-accent text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-accent text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
