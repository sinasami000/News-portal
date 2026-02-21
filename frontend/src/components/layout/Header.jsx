import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { FiMenu, FiX, FiUser, FiLogOut, FiEdit3, FiGrid } from 'react-icons/fi';
import toast from 'react-hot-toast';

const categories = ['Politics', 'Technology', 'Sports', 'Business', 'Entertainment', 'Health'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-ink-100">
      {/* Top bar */}
      <div className="border-b border-ink-100 py-1.5 px-4 bg-ink-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-xs text-ink-300 font-mono">{today}</span>
          <div className="flex items-center gap-4 text-xs text-ink-300 font-mono">
            <span>Stay Informed. Stay Ahead.</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <Link to="/" className="flex flex-col items-center group">
          <span className="font-serif text-4xl font-black tracking-tight text-ink-900 leading-none">
            NEWS<span className="text-crimson-600">PORTAL</span>
          </span>
          <span className="text-[9px] font-mono tracking-[0.3em] text-ink-400 uppercase mt-0.5">The Voice of Today</span>
        </Link>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-sm border border-ink-200 hover:border-crimson-500 transition-colors"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-crimson-600 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-ink-800">{user?.name}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-ink-100 shadow-lg z-50 animate-slide-up">
                  <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-ink-700 hover:bg-ink-50 transition-colors">
                    <FiGrid size={14} /> Dashboard
                  </Link>
                  <Link to="/create-news" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-ink-700 hover:bg-ink-50 transition-colors">
                    <FiEdit3 size={14} /> Write News
                  </Link>
                  <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-ink-700 hover:bg-ink-50 transition-colors">
                    <FiUser size={14} /> Profile
                  </Link>
                  <hr className="border-ink-100" />
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 text-sm text-crimson-600 hover:bg-crimson-50 w-full text-left transition-colors">
                    <FiLogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-secondary text-sm py-2 px-5">Login</Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-5">Register</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="border-t border-b border-ink-200 bg-ink-900 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-0">
          {['Home', 'News', 'Contact'].map((item) => (
            <NavLink
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `px-5 py-3 text-sm font-sans font-medium tracking-wide transition-colors ${isActive
                  ? 'bg-crimson-600 text-white'
                  : 'text-ink-200 hover:text-white hover:bg-ink-800'
                }`
              }
              end={item === 'Home'}
            >
              {item}
            </NavLink>
          ))}
          <div className="h-4 w-px bg-ink-700 mx-2" />
          {categories.slice(0, 5).map((cat) => (
            <NavLink
              key={cat}
              to={`/news?category=${cat}`}
              className="px-4 py-3 text-xs font-mono tracking-wider text-ink-400 hover:text-white transition-colors"
            >
              {cat}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-ink-100 animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {['/', '/news', '/contact'].map((path, i) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm font-medium rounded-sm ${isActive ? 'bg-crimson-50 text-crimson-600' : 'text-ink-700 hover:bg-ink-50'}`
                }
                end={path === '/'}
              >
                {['Home', 'News', 'Contact'][i]}
              </NavLink>
            ))}
            <hr className="border-ink-100 my-2" />
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-ink-700">Dashboard</NavLink>
                <NavLink to="/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-ink-700">Profile</NavLink>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block px-3 py-2 text-sm text-crimson-600 w-full text-left">Logout</button>
              </>
            ) : (
              <div className="flex gap-2 px-3 py-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-secondary text-sm flex-1 text-center">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm flex-1 text-center">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}