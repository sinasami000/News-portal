import { Link } from 'react-router-dom';
import { FiClock, FiEye } from 'react-icons/fi';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function NewsCard({ news, variant = 'default' }) {
  if (!news) return null;

  if (variant === 'hero') {
    return (
      <Link to={`/news/${news._id}`} className="group block relative h-96 overflow-hidden rounded-sm">
        <img
          src={news.image || `https://picsum.photos/seed/${news._id}/800/500`}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="category-badge mb-3 inline-block">{news.category}</span>
          <h2 className="font-serif text-2xl font-bold text-white leading-tight mb-2 group-hover:text-crimson-300 transition-colors">
            {news.title}
          </h2>
          <div className="flex items-center gap-3 text-white/70 text-xs font-mono">
            <span>{news.author?.name}</span>
            <span>·</span>
            <span>{formatDate(news.createdAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/news/${news._id}`} className="group flex gap-4 items-start py-4 border-b border-ink-100 last:border-b-0">
        <img
          src={news.image || `https://picsum.photos/seed/${news._id}/200/150`}
          alt={news.title}
          className="w-24 h-20 object-cover rounded-sm flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <span className="text-xs font-mono text-crimson-600 uppercase tracking-wider">{news.category}</span>
          <h3 className="font-serif text-base font-bold text-ink-900 leading-tight mt-1 group-hover:text-crimson-600 transition-colors line-clamp-2">
            {news.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-ink-400">
            <FiClock size={11} />
            <span>{formatDate(news.createdAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link to={`/news/${news._id}`} className="group block bg-white border border-ink-100 card-hover rounded-sm overflow-hidden">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={news.image || `https://picsum.photos/seed/${news._id}/600/400`}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 category-badge">{news.category}</span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-ink-900 leading-tight mb-2 group-hover:text-crimson-600 transition-colors line-clamp-2">
          {news.title}
        </h3>
        <p className="text-sm text-ink-500 leading-relaxed mb-4 line-clamp-2">{news.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-ink-400 font-mono">
          <div className="flex items-center gap-1.5">
            {news.author?.avatar ? (
              <img src={news.author.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-crimson-100 text-crimson-600 flex items-center justify-center text-[10px] font-bold">
                {news.author?.name?.[0]?.toUpperCase()}
              </div>
            )}
            <span>{news.author?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><FiEye size={11} /> {news.views}</span>
            <span>{formatDate(news.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}