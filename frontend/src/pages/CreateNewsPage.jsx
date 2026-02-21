import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNews, updateNews, fetchSingleNews, clearCurrentNews } from '../store/slices/newsSlice';
import toast from 'react-hot-toast';
import Spinner from '../components/common/Spinner';
import { FiSend, FiImage, FiTag, FiArrowLeft } from 'react-icons/fi';

const CATEGORIES = ['Politics', 'Technology', 'Sports', 'Entertainment', 'Business', 'Health', 'Science', 'World', 'Lifestyle', 'Education'];

export default function CreateNewsPage({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, currentNews } = useSelector((s) => s.news);

  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Technology',
    image: '',
    tags: ''
  });

  useEffect(() => {
    if (isEdit && id) dispatch(fetchSingleNews(id));
    return () => dispatch(clearCurrentNews());
  }, [isEdit, id, dispatch]);

  useEffect(() => {
    if (isEdit && currentNews) {
      setForm({
        title: currentNews.title || '',
        content: currentNews.content || '',
        excerpt: currentNews.excerpt || '',
        category: currentNews.category || 'Technology',
        image: currentNews.image || '',
        tags: currentNews.tags?.join(', ') || ''
      });
    }
  }, [currentNews, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    };

    let res;
    if (isEdit) {
      res = await dispatch(updateNews({ id, newsData: payload }));
    } else {
      res = await dispatch(createNews(payload));
    }

    if (res.meta.requestStatus === 'fulfilled') {
      toast.success(isEdit ? 'Story updated!' : 'Story published!');
      navigate('/dashboard');
    } else {
      toast.error(res.payload || 'Something went wrong');
    }
  };

  if (isEdit && loading && !currentNews) return <Spinner size="lg" className="py-20" />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="text-ink-400 hover:text-ink-700 transition-colors">
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink-900">
            {isEdit ? 'Edit Story' : 'Write a Story'}
          </h1>
          <p className="text-ink-500 text-sm mt-0.5">
            {isEdit ? 'Update your article below' : 'Share your perspective with thousands of readers'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Headline *</label>
            <input
              type="text" required
              placeholder="Write a compelling headline..."
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="input-field font-serif text-lg"
              maxLength={200}
            />
            <p className="text-xs text-ink-400 mt-1 text-right">{form.title.length}/200</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Excerpt / Summary</label>
            <textarea
              rows={3}
              placeholder="A short summary of your story (auto-generated if left empty)"
              value={form.excerpt}
              onChange={e => setForm({ ...form, excerpt: e.target.value })}
              className="input-field resize-none"
              maxLength={300}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">Story Content *</label>
            <textarea
              rows={16}
              required
              placeholder="Tell your story... Use blank lines to separate paragraphs."
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              className="input-field resize-none font-sans leading-relaxed"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60">
            <FiSend size={14} />
            {loading ? (isEdit ? 'Saving...' : 'Publishing...') : (isEdit ? 'Save Changes' : 'Publish Story')}
          </button>
        </form>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Category */}
          <div className="bg-white border border-ink-100 rounded-sm p-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-500 mb-3">Category *</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-colors text-left ${form.category === cat
                    ? 'bg-crimson-600 border-crimson-600 text-white'
                    : 'border-ink-200 text-ink-600 hover:border-crimson-400'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Image URL */}
          <div className="bg-white border border-ink-100 rounded-sm p-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-500 mb-3 flex items-center gap-2">
              <FiImage size={12} /> Cover Image
            </h3>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              className="input-field text-sm"
            />
            {form.image && (
              <div className="mt-3 rounded-sm overflow-hidden">
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
            <p className="text-xs text-ink-400 mt-2">Leave empty to auto-assign a placeholder image</p>
          </div>

          {/* Tags */}
          <div className="bg-white border border-ink-100 rounded-sm p-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-500 mb-3 flex items-center gap-2">
              <FiTag size={12} /> Tags
            </h3>
            <input
              type="text"
              placeholder="politics, economy, 2025 (comma separated)"
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              className="input-field text-sm"
            />
            {form.tags && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.tags.split(',').filter(t => t.trim()).map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-ink-100 text-ink-600 text-xs font-mono rounded-sm">#{tag.trim()}</span>
                ))}
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-ink-50 border border-ink-100 rounded-sm p-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-500 mb-3">Writing Tips</h3>
            <ul className="space-y-2 text-xs text-ink-500">
              <li>📝 Start with the most important facts</li>
              <li>🎯 Keep paragraphs short and focused</li>
              <li>🏷️ Add relevant tags for better discovery</li>
              <li>🖼️ Use a high-quality cover image</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}