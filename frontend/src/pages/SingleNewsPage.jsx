import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleNews, clearCurrentNews } from '../store/slices/newsSlice';
import Spinner from '../components/common/Spinner';
import { FiClock, FiEye, FiTag, FiArrowLeft, FiShare2, FiUser } from 'react-icons/fi';

export default function SingleNewsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentNews: news, loading, error } = useSelector((s) => s.news);

  useEffect(() => {
    dispatch(fetchSingleNews(id));
    return () => dispatch(clearCurrentNews());
  }, [dispatch, id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: news.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-12"><Spinner size="lg" /></div>;
  if (error) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <p className="font-serif text-2xl text-ink-700 mb-4">{error}</p>
      <Link to="/news" className="btn-primary">Back to News</Link>
    </div>
  );
  if (!news) return null;

  const formattedDate = new Date(news.createdAt).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={news.image || `https://picsum.photos/seed/${news._id}/1400/700`}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white bg-black/30 backdrop-blur-sm px-3 py-2 rounded-sm text-sm transition-colors"
          >
            <FiArrowLeft size={14} /> Back
          </button>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-10">
        <article className="bg-white shadow-lg rounded-sm p-8 md:p-12">
          {/* Category & date */}
          <div className="flex items-center justify-between mb-5">
            <span className="category-badge">{news.category}</span>
            <button onClick={handleShare} className="flex items-center gap-1.5 text-xs text-ink-400 hover:text-ink-700 transition-colors">
              <FiShare2 size={12} /> Share
            </button>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink-900 leading-tight mb-5">
            {news.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 pb-5 mb-6 border-b border-ink-100">
            <div className="flex items-center gap-2">
              {news.author?.avatar ? (
                <img src={news.author.avatar} className="w-9 h-9 rounded-full object-cover" alt="" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-crimson-100 text-crimson-600 flex items-center justify-center font-bold text-sm">
                  {news.author?.name?.[0]?.toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-medium text-sm text-ink-800">{news.author?.name}</p>
                <p className="text-xs text-ink-400 font-mono">Reporter</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-400 font-mono ml-auto">
              <FiClock size={11} /> {formattedDate}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-400 font-mono">
              <FiEye size={11} /> {news.views} views
            </div>
          </div>

          {/* Excerpt */}
          {news.excerpt && (
            <p className="font-serif text-lg text-ink-600 italic leading-relaxed mb-6 pl-4 border-l-4 border-crimson-500">
              {news.excerpt}
            </p>
          )}

          {/* Content */}
          <div className="news-content">
            {news.content.split('\n').map((para, i) => para.trim() && (
              <p key={i} className="mb-4 leading-relaxed text-ink-700 font-sans">{para}</p>
            ))}
          </div>

          {/* Tags */}
          {news.tags?.length > 0 && (
            <div className="mt-8 pt-6 border-t border-ink-100">
              <div className="flex items-center gap-2 flex-wrap">
                <FiTag size={14} className="text-ink-400" />
                {news.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/news?search=${tag}`}
                    className="px-3 py-1 bg-ink-50 text-ink-600 text-xs font-mono rounded-sm hover:bg-crimson-50 hover:text-crimson-600 transition-colors border border-ink-100"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author info */}
          <div className="mt-8 p-5 bg-ink-50 rounded-sm border border-ink-100">
            <div className="flex items-start gap-4">
              {news.author?.avatar ? (
                <img src={news.author.avatar} className="w-14 h-14 rounded-full object-cover" alt="" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-crimson-100 text-crimson-600 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {news.author?.name?.[0]?.toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-mono text-xs text-ink-400 uppercase tracking-wider mb-1">About the Author</p>
                <p className="font-serif text-lg font-bold text-ink-900">{news.author?.name}</p>
                <p className="text-sm text-ink-500 mt-1">{news.author?.bio || 'Reporter at NewsPortal'}</p>
              </div>
            </div>
          </div>
        </article>

        {/* Back link */}
        <div className="py-8 text-center">
          <Link to="/news" className="btn-secondary inline-flex items-center gap-2">
            <FiArrowLeft size={14} /> More Stories
          </Link>
        </div>
      </div>
    </div>
  );
}