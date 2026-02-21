import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMail, FiMapPin, FiPhone, FiSend, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: '', email: '', subject: '', message: '' });
    setSending(false);
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email Us', value: 'hello@newsportal.com', href: 'mailto:hello@newsportal.com' },
    { icon: FiPhone, label: 'Call Us', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: FiMapPin, label: 'Visit Us', value: '123 Press Street, New York, NY 10001', href: '#' },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="bg-ink-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 double-rule" />
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="font-mono text-xs tracking-widest uppercase text-crimson-400 mb-3 block">Get in Touch</span>
          <h1 className="font-serif text-5xl font-black text-white mb-4">Contact Us</h1>
          <p className="text-ink-300 text-lg leading-relaxed">
            Have a tip? A question? A correction? We want to hear from you. 
            Our editorial team is committed to transparency and engagement.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-ink-900 mb-5">Reach Our Team</h2>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-crimson-50 border border-crimson-100 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-crimson-600 transition-colors">
                      <Icon size={16} className="text-crimson-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-ink-400 uppercase tracking-wider">{label}</p>
                      <p className="text-sm text-ink-700 mt-0.5">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="pt-6 border-t border-ink-100">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[FiTwitter, FiFacebook, FiInstagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 border border-ink-200 flex items-center justify-center text-ink-500 hover:border-crimson-500 hover:text-crimson-500 transition-colors rounded-sm">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Editorial note */}
            <div className="bg-ink-900 rounded-sm p-5 mt-6">
              <p className="font-mono text-xs text-crimson-400 uppercase tracking-wider mb-2">Editorial Policy</p>
              <p className="text-xs text-ink-400 leading-relaxed">
                NewsPortal is committed to accuracy, fairness, and transparency. 
                We correct errors promptly and welcome reader feedback.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-ink-100 rounded-sm p-8">
              <h2 className="font-serif text-2xl font-bold text-ink-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1.5">Your Name *</label>
                    <input
                      type="text" required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1.5">Email Address *</label>
                    <input
                      type="email" required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Subject *</label>
                  <select
                    required
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select a subject...</option>
                    <option>News Tip or Lead</option>
                    <option>Correction or Clarification</option>
                    <option>Advertising Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership Proposal</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Message *</label>
                  <textarea
                    rows={7}
                    required
                    placeholder="Tell us what's on your mind. Include as many details as possible..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="input-field resize-none"
                    minLength={20}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-ink-400">We typically respond within 24 business hours.</p>
                  <button type="submit" disabled={sending} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                    <FiSend size={14} />
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}