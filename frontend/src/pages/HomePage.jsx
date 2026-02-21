import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTopNews } from '../store/slices/newsSlice';
import NewsCard from '../components/common/NewsCard';
import Spinner from '../components/common/Spinner';
import { FiArrowRight, FiTrendingUp, FiZap } from 'react-icons/fi';

const categories = [
  { name: 'Politics', emoji: '🏛️', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Technology', emoji: '💻', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'Sports', emoji: '⚽', color: 'bg-green-50 text-green-700 border-green-200' },
  { name: 'Business', emoji: '📈', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { name: 'Health', emoji: '🏥', color: 'bg-red-50 text-red-700 border-red-200' },
  { name: 'Science', emoji: '🔬', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const { topNews, loading } = useSelector((s) => s.news);

  useEffect(() => {
    dispatch(fetchTopNews());
  }, [dispatch]);

  const heroNews = topNews[0];
  const gridNews = topNews.slice(1, 5);
  const sideNews = topNews.slice(1, 4);

  return (
    <div>
      {/* Breaking News Ticker */}
      <div className="bg-crimson-600 text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-widest uppercase whitespace-nowrap bg-white text-crimson-600 px-2 py-0.5">
            <FiZap size={10} /> Breaking
          </span>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-sans whitespace-nowrap animate-[marquee_20s_linear_infinite]">
              {topNews.slice(0, 3).map(n => n.title).join(' · ') || 'Welcome to NewsPortal — Your trusted source for breaking news and in-depth analysis'}
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="section-divider">
          <span className="section-title flex items-center gap-2">
            <FiTrendingUp className="text-crimson-600" /> Top Stories
          </span>
        </div>

        {loading ? (
          <Spinner size="lg" />
        ) : topNews.length === 0 ? (
          <div className="text-center py-16 text-ink-400">
            <p className="font-serif text-2xl mb-2">No news yet</p>
            <p className="text-sm">Be the first to publish a story!</p>
            <Link to="/create-news" className="btn-primary mt-4 inline-block">Write a Story</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hero card */}
            <div className="lg:col-span-2">
              {heroNews && <NewsCard news={heroNews} variant="hero" />}
            </div>
            {/* Side cards */}
            <div className="bg-white border border-ink-100 rounded-sm p-4">
              <h3 className="font-mono text-xs tracking-widest uppercase text-ink-500 mb-1 pb-2 border-b border-ink-100">More Stories</h3>
              {sideNews.map(n => <NewsCard key={n._id} news={n} variant="horizontal" />)}
            </div>
          </div>
        )}
      </section>

      {/* Latest News Grid */}
      {topNews.length > 1 && (
        <section className="max-w-7xl mx-auto px-4 pb-10">
          <div className="section-divider">
            <span className="section-title">Latest News</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gridNews.map(n => <NewsCard key={n._id} news={n} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/news" className="btn-secondary inline-flex items-center gap-2">
              View All News <FiArrowRight />
            </Link>
          </div>
        </section>
      )}

      {/* Category Section */}
      <section className="bg-ink-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-white mb-2">Browse by Category</h2>
            <p className="text-ink-400 text-sm">Find news that matters to you</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/news?category=${cat.name}`}
                className="flex flex-col items-center gap-2 p-4 bg-ink-800 border border-ink-700 rounded-sm hover:border-crimson-500 hover:bg-ink-750 transition-all group"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-mono text-ink-300 group-hover:text-white transition-colors tracking-wider uppercase">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-crimson-600 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-3">Have a story to tell?</h2>
          <p className="text-crimson-100 mb-6 text-lg">Join NewsPortal and share your perspective with thousands of readers worldwide.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/register" className="bg-white text-crimson-600 font-medium px-8 py-3 rounded-sm hover:bg-crimson-50 transition-colors inline-block">
              Get Started Free
            </Link>
            <Link to="/news" className="border border-white text-white font-medium px-8 py-3 rounded-sm hover:bg-crimson-700 transition-colors inline-block">
              Browse News
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}