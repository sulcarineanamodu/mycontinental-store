'use client';

// Note: metadata must be in a separate server component for 'use client' pages
// SEO is handled by the root layout for this page

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens default mail client with pre-filled message
    const mailto = `mailto:info@mycontinentalfoodstore.co.uk?subject=${encodeURIComponent(form.subject || 'Website Enquiry')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* Header */}
        <div className="bg-primary py-16 px-4 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/85 text-lg max-w-xl mx-auto">
            Got a question? We're happy to help. Get in touch and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-1">Store Address</p>
                  <p className="text-text-secondary text-sm">Uxbridge, Hillingdon<br />London, United Kingdom</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-1">Email</p>
                  <a href="mailto:info@mycontinentalfoodstore.co.uk" className="text-primary text-sm hover:underline">
                    info@mycontinentalfoodstore.co.uk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-1">Opening Hours</p>
                  <p className="text-text-secondary text-sm">
                    Monday – Saturday: 9am – 7pm<br />
                    Sunday: 10am – 5pm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary mb-1">Same-Day Dispatch</p>
                  <p className="text-text-secondary text-sm">Order before 2pm for same-day dispatch within Hillingdon & Uxbridge.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white border border-border-light rounded-xl p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-display text-xl font-bold text-text-primary mb-2">Message Ready</h3>
                <p className="text-text-secondary text-sm">Your email client should have opened with a pre-filled message. If not, email us directly at info@mycontinentalfoodstore.co.uk</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold text-text-primary mb-6">Send a Message</h3>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border-light rounded-lg text-sm focus:outline-none focus:border-primary"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border-light rounded-lg text-sm focus:outline-none focus:border-primary"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border-light rounded-lg text-sm focus:outline-none focus:border-primary"
                    placeholder="Order enquiry, product question..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border-light rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
