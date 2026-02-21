import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, changePassword, clearError } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiFileText, FiLock, FiSave, FiCamera } from 'react-icons/fi';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((s) => s.auth);

  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({ name: '', bio: '', avatar: '' });
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (user) setProfileForm({ name: user.name || '', bio: user.bio || '', avatar: user.avatar || '' });
    return () => dispatch(clearError());
  }, [user, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(updateProfile(profileForm));
    if (res.meta.requestStatus === 'fulfilled') toast.success('Profile updated successfully!');
  };

  const handlePassSubmit = async (e) => {
    e.preventDefault();
    if (passForm.newPassword !== passForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    const res = await dispatch(changePassword({ currentPassword: passForm.currentPassword, newPassword: passForm.newPassword }));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Password changed!');
      setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  const tabs = [
    { id: 'profile', label: 'Edit Profile', icon: FiUser },
    { id: 'password', label: 'Change Password', icon: FiLock },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-ink-900 mb-8">Account Settings</h1>

      {/* User header card */}
      <div className="bg-white border border-ink-100 rounded-sm p-6 mb-6 flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-crimson-100 text-crimson-600 flex items-center justify-center text-3xl font-bold overflow-hidden border-2 border-ink-100">
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              user?.name?.[0]?.toUpperCase()
            )}
          </div>
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-ink-900">{user?.name}</h2>
          <p className="text-ink-400 text-sm font-mono">{user?.email}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
            <span className="text-xs text-ink-400">Active member</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ink-100 mb-6 bg-white rounded-t-sm">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === id
              ? 'border-crimson-600 text-crimson-600'
              : 'border-transparent text-ink-500 hover:text-ink-800'
              }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Profile form */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-ink-100 rounded-sm p-6 animate-fade-in">
          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  <FiUser className="inline mr-1.5" size={12} /> Full Name
                </label>
                <input
                  type="text" required
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  <FiMail className="inline mr-1.5" size={12} /> Email (read-only)
                </label>
                <input type="email" value={user?.email || ''} readOnly className="input-field bg-ink-50 cursor-not-allowed text-ink-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                <FiCamera className="inline mr-1.5" size={12} /> Avatar URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                value={profileForm.avatar}
                onChange={e => setProfileForm({ ...profileForm, avatar: e.target.value })}
                className="input-field"
              />
              {profileForm.avatar && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={profileForm.avatar} className="w-8 h-8 rounded-full object-cover border" alt="Preview" onError={e => e.target.style.display = 'none'} />
                  <span className="text-xs text-ink-400">Preview</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                <FiFileText className="inline mr-1.5" size={12} /> Bio
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself — your expertise, interests, reporting style..."
                value={profileForm.bio}
                onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="input-field resize-none"
                maxLength={200}
              />
              <p className="text-xs text-ink-400 mt-1 text-right">{profileForm.bio.length}/200</p>
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                <FiSave size={14} /> {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Password form */}
      {activeTab === 'password' && (
        <div className="bg-white border border-ink-100 rounded-sm p-6 animate-fade-in">
          <form onSubmit={handlePassSubmit} className="space-y-5 max-w-md">
            {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  {field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm New Password'}
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={14} />
                  <input
                    type="password" required
                    value={passForm[field]}
                    onChange={e => setPassForm({ ...passForm, [field]: e.target.value })}
                    placeholder="••••••••"
                    className="input-field pl-10"
                    minLength={field !== 'currentPassword' ? 6 : undefined}
                  />
                </div>
              </div>
            ))}
            <div className="pt-2">
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                <FiLock size={14} /> {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}