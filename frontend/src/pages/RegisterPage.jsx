import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
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
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    const res = await dispatch(registerUser({ name: form.name, email: form.email, password: form.password }));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Account created! Welcome to NewsPortal!');
      navigate('/dashboard');
    }
  };

  const perks = ['Publish your own news stories', 'Edit and manage your articles', 'Build your reporter profile', 'Reach thousands of readers'];

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-crimson-600 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute border border-white" style={{
              width: `${(i + 1) * 80}px`, height: `${(i + 1) * 80}px`,
              top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)', borderRadius: '12px'
            }} />
          ))}
        </div>
        <div className="relative z-10">
          <Link to="/" className="font-serif text-4xl font-black text-white">
            NEWS<span className="text-crimson-100">PORTAL</span>
          </Link>
        </div>
        <div className="relative z-10">
          <h2 className="font-serif text-3xl text-white font-bold mb-6">Join our community of reporters</h2>
          <ul className="space-y-3">
            {perks.map(perk => (
              <li key={perk} className="flex items-center gap-3 text-crimson-100 text-sm">
                <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiCheck size={12} className="text-white" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-crimson-200 text-xs font-mono relative z-10">Free forever. No credit card required.</p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-ink-50">
        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-ink-900 mb-2">Create your account</h1>
            <p className="text-ink-500 text-sm">Start sharing your stories with the world</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={15} />
                <input
                  type="text" required placeholder="John Doe"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={15} />
                <input
                  type="email" required placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={15} />
                <input
                  type={showPass ? 'text' : 'password'} required placeholder="Min. 6 characters"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-10 pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400">
                  {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={15} />
                <input
                  type="password" required placeholder="Repeat your password"
                  value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-center disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-ink-500">
            Already have an account?{' '}
            <Link to="/login" className="text-crimson-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}