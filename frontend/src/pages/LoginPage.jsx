import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Welcome back!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-white rounded-full" />
          <div className="absolute bottom-20 right-10 w-96 h-96 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-crimson-600 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <Link to="/" className="font-serif text-4xl font-black text-white">
            NEWS<span className="text-crimson-500">PORTAL</span>
          </Link>
        </div>
        <div className="relative z-10">
          <blockquote className="font-serif text-3xl text-white leading-tight mb-4">
            "The press is the best instrument for enlightening the mind of man."
          </blockquote>
          <p className="text-ink-400 font-mono text-sm">— Thomas Jefferson</p>
        </div>
        <div className="relative z-10 flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 rounded-full ${i === 1 ? 'w-8 bg-crimson-500' : 'w-4 bg-ink-600'}`} />
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-ink-50">
        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-ink-900 mb-2">Welcome back</h1>
            <p className="text-ink-500 text-sm">Sign in to your NewsPortal account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={15} />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-ink-700">Password</label>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={15} />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-10 pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700">
                  {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-center disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-ink-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-crimson-600 font-medium hover:underline">Create one</Link>
          </p>

          {/* Demo creds hint */}
          <div className="mt-6 p-4 bg-ink-100 rounded-sm border border-ink-200">
            <p className="text-xs font-mono text-ink-500 text-center">
              Create an account to start publishing your stories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}