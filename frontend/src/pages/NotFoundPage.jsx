import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-8xl font-bold text-ink-100 mb-4">404</p>
      <h1 className="font-serif text-4xl font-bold text-ink-900 mb-3">Page Not Found</h1>
      <p className="text-ink-500 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved. 
        Let's get you back to the news.
      </p>
      <div className="flex gap-3">
        <Link to="/" className="btn-primary">Go Home</Link>
        <Link to="/news" className="btn-secondary">Browse News</Link>
      </div>
    </div>
  );
}