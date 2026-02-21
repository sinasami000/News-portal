import { Link } from 'react-router-dom';
import { FiTwitter, FiFacebook, FiInstagram, FiYoutube, FiMail } from 'react-icons/fi';

const categories = ['Politics', 'Technology', 'Sports', 'Business', 'Entertainment', 'Health', 'Science', 'World'];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300 mt-16">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="inline-block mb-4">
            <span className="font-serif text-3xl font-black text-white leading-none">
              NEWS<span className="text-crimson-500">PORTAL</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-5 text-ink-400">
            Your trusted source for breaking news, in-depth analysis, and stories that matter.
          </p>
          <div className="flex gap-3">
            {[FiTwitter, FiFacebook, FiInstagram, FiYoutube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 border border-ink-700 flex items-center justify-center hover:border-crimson-500 hover:text-crimson-500 transition-colors rounded-sm">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-mono text-xs tracking-widest uppercase text-white mb-4 border-b border-ink-700 pb-2">Categories</h4>
          <ul className="space-y-2">
            {categories.slice(0, 5).map((cat) => (
              <li key={cat}>
                <Link to={`/news?category=${cat}`} className="text-sm text-ink-400 hover:text-crimson-400 transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-mono text-xs tracking-widest uppercase text-white mb-4 border-b border-ink-700 pb-2">Quick Links</h4>
          <ul className="space-y-2">
            {[['Home', '/'], ['All News', '/news'], ['Contact Us', '/contact'], ['Login', '/login'], ['Register', '/register']].map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="text-sm text-ink-400 hover:text-crimson-400 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-mono text-xs tracking-widest uppercase text-white mb-4 border-b border-ink-700 pb-2">Newsletter</h4>
          <p className="text-sm text-ink-400 mb-4">Get the latest news delivered to your inbox every morning.</p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-ink-800 border border-ink-700 px-3 py-2 text-sm text-white placeholder:text-ink-500 focus:outline-none focus:border-crimson-500 rounded-sm"
            />
            <button className="btn-primary text-sm py-2 flex items-center justify-center gap-2">
              <FiMail size={14} /> Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-ink-500 font-mono">© {new Date().getFullYear()} NewsPortal. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-ink-500">
            <a href="#" className="hover:text-ink-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ink-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-ink-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}