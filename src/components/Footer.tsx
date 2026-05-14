'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: ['All Products', 'Featured', 'On Sale', 'New Arrivals'],
    Company: ['About Us', 'Contact', 'Blog', 'Careers'],
    Support: ['FAQ', 'Shipping Info', 'Returns', 'Privacy Policy'],
    Legal: ['Terms of Service', 'Delivery Policy', 'Refund Policy', 'Accessibility'],
  };

  const socialLinks = [
    { name: 'f', href: '#', label: 'Facebook' },
    { name: '𝕏', href: '#', label: 'X' },
    { name: '📷', href: '#', label: 'Instagram' },
    { name: '✉️', href: '#', label: 'Email' },
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
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-accent transition-colors text-sm"
                    >
                      {link}
                    </a>
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
              <a href="#" className="text-gray-300 hover:text-accent text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-accent text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-accent text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
