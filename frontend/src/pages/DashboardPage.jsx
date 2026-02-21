import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyNews, deleteNews } from '../store/slices/newsSlice';
import Spinner from '../components/common/Spinner';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit3, FiTrash2, FiEye, FiClock, FiFileText, FiTrendingUp, FiUser } from 'react-icons/fi';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { myNews, loading } = useSelector((s) => s.news);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (user) dispatch(fetchMyNews(user._id));
  }, [dispatch, user]);

  const handleDelete = async (id) => {
    const res = await dispatch(deleteNews(id));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('News deleted');
      setDeleteId(null);
    } else {
      toast.error('Failed to delete');
    }
  };

  const totalViews = myNews.reduce((acc, n) => acc + (n.views || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink-900">My Dashboard</h1>
          <p className="text-ink-500 text-sm mt-1">Manage your stories and track performance</p>
        </div>
        <Link to="/create-news" className="btn-primary flex items-center gap-2">
          <FiPlus /> Write New Story
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Stories', value: myNews.length, icon: FiFileText, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Views', value: totalViews.toLocaleString(), icon: FiEye, color: 'text-green-600 bg-green-50' },
          { label: 'Published', value: myNews.filter(n => n.isPublished).length, icon: FiTrendingUp, color: 'text-crimson-600 bg-crimson-50' },
          { label: 'Member Since', value: new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), icon: FiClock, color: 'text-purple-600 bg-purple-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-ink-100 rounded-sm p-5">
            <div className={`w-10 h-10 rounded-sm ${color} flex items-center justify-center mb-3`}>
              <Icon size={18} />
            </div>
            <p className="font-serif text-2xl font-bold text-ink-900">{value}</p>
            <p className="text-xs text-ink-400 font-mono mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick profile card */}
      <div className="bg-ink-900 rounded-sm p-6 mb-8 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-crimson-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 overflow-hidden">
          {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="" /> : user?.name?.[0]?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl font-bold text-white">{user?.name}</h3>
          <p className="text-ink-400 text-sm truncate">{user?.email}</p>
          {user?.bio && <p className="text-ink-500 text-xs mt-1 line-clamp-1">{user?.bio}</p>}
        </div>
        <Link to="/profile" className="flex items-center gap-2 text-sm text-ink-300 hover:text-white transition-colors whitespace-nowrap">
          <FiUser size={14} /> Edit Profile
        </Link>
      </div>

      {/* My news table */}
      <div className="bg-white border border-ink-100 rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-ink-900">My Stories</h2>
          <span className="text-xs font-mono text-ink-400">{myNews.length} total</span>
        </div>

        {loading ? (
          <Spinner />
        ) : myNews.length === 0 ? (
          <div className="text-center py-16 px-4">
            <FiFileText className="mx-auto text-ink-300 mb-3" size={40} />
            <p className="font-serif text-xl text-ink-700 mb-2">No stories yet</p>
            <p className="text-sm text-ink-400 mb-5">Your published articles will appear here</p>
            <Link to="/create-news" className="btn-primary">Write Your First Story</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-ink-50 border-b border-ink-100">
                <tr>
                  {['Title', 'Category', 'Views', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-mono uppercase tracking-wider text-ink-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-50">
                {myNews.map(n => (
                  <tr key={n._id} className="hover:bg-ink-50/50 transition-colors">
                    <td className="px-6 py-4 max-w-xs">
                      <p className="font-medium text-sm text-ink-900 line-clamp-1">{n.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono bg-ink-100 text-ink-600 px-2 py-1 rounded-sm">{n.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-ink-600 font-mono">{n.views}</td>
                    <td className="px-6 py-4 text-xs text-ink-400 font-mono whitespace-nowrap">
                      {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/news/${n._id}`} className="p-1.5 text-ink-400 hover:text-ink-700 transition-colors" title="View">
                          <FiEye size={14} />
                        </Link>
                        <Link to={`/edit-news/${n._id}`} className="p-1.5 text-blue-400 hover:text-blue-600 transition-colors" title="Edit">
                          <FiEdit3 size={14} />
                        </Link>
                        <button onClick={() => setDeleteId(n._id)} className="p-1.5 text-crimson-400 hover:text-crimson-600 transition-colors" title="Delete">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteId(null)}>
          <div className="bg-white rounded-sm p-6 max-w-sm w-full shadow-xl animate-slide-up" onClick={e => e.stopPropagation()}>
            <h3 className="font-serif text-xl font-bold text-ink-900 mb-2">Delete Story?</h3>
            <p className="text-sm text-ink-500 mb-6">This action cannot be undone. The story will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1 text-center text-sm py-2">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="bg-crimson-600 hover:bg-crimson-700 text-white flex-1 text-center text-sm py-2 rounded-sm transition-colors font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}