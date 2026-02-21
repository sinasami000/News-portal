import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchAllNews } from '../store/slices/newsSlice';
import NewsCard from '../components/common/NewsCard';
import Spinner from '../components/common/Spinner';
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CATEGORIES = ['All', 'Politics', 'Technology', 'Sports', 'Entertainment', 'Business', 'Health', 'Science', 'World', 'Lifestyle', 'Education'];

export default function NewsPage() {
  const dispatch = useDispatch();
  const { allNews, pagination, loading } = useSelector((s) => s.news);
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const params = { page, limit: 9 };
    if (category) params.category = category;
    if (search) params.search = search;
    dispatch(fetchAllNews(params));
  }, [dispatch, page, category, search]);

  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const q = searchParams.get('search') || '';
    setCategory(cat);
    setSearch(q);
    setSearchInput(q);
    setPage(1);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      if (searchInput) p.set('search', searchInput);
      else p.delete('search');
      return p;
    });
  };

  const handleCategory = (cat) => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      if (cat && cat !== 'All') p.set('category', cat);
      else p.delete('category');
      p.delete('search');
      return p;
    });
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-ink-900 mb-1">All News</h1>
        <p className="text-ink-500 font-sans">{pagination.total} stories from our reporters</p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={16} />
          <input
            type="text"
            placeholder="Search news, topics, authors..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button type="submit" className="btn-primary flex items-center gap-2">
          <FiSearch size={14} /> Search
        </button>
      </form>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-4 py-1.5 text-sm font-mono rounded-sm border transition-colors ${(cat === 'All' && !category) || cat === category
              ? 'bg-crimson-600 border-crimson-600 text-white'
              : 'border-ink-200 text-ink-600 hover:border-crimson-400 hover:text-crimson-600'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active filters */}
      {(search || category) && (
        <div className="flex items-center gap-2 mb-5 p-3 bg-ink-50 border border-ink-100 rounded-sm">
          <FiFilter size={14} className="text-ink-500" />
          <span className="text-sm text-ink-500">Filtering by: </span>
          {category && <span className="px-2 py-0.5 bg-crimson-100 text-crimson-700 text-xs rounded-sm font-mono">{category}</span>}
          {search && <span className="px-2 py-0.5 bg-ink-200 text-ink-700 text-xs rounded-sm font-mono">"{search}"</span>}
          <button onClick={() => { setSearchParams({}); setSearchInput(''); }} className="ml-auto text-xs text-crimson-600 hover:underline">Clear all</button>
        </div>
      )}

      {/* News Grid */}
      {loading ? (
        <Spinner size="lg" />
      ) : allNews.length === 0 ? (
        <div className="text-center py-20 text-ink-400">
          <p className="font-serif text-2xl mb-2">No news found</p>
          <p className="text-sm">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.map((n) => <NewsCard key={n._id} news={n} />)}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 border border-ink-200 text-sm disabled:opacity-40 hover:border-crimson-500 transition-colors rounded-sm"
          >
            <FiChevronLeft size={14} /> Prev
          </button>
          <div className="flex gap-1">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 text-sm font-mono rounded-sm transition-colors ${p === page ? 'bg-crimson-600 text-white' : 'border border-ink-200 hover:border-crimson-500'}`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            className="flex items-center gap-1 px-4 py-2 border border-ink-200 text-sm disabled:opacity-40 hover:border-crimson-500 transition-colors rounded-sm"
          >
            Next <FiChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}