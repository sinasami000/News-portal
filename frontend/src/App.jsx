import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import SingleNewsPage from './pages/SingleNewsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import CreateNewsPage from './pages/CreateNewsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            borderRadius: '2px',
            border: '1px solid #ede9df',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          },
          success: { iconTheme: { primary: '#e11d48', secondary: '#fff' } },
        }}
      />
      <Routes>
        {/* Auth pages (no layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Main layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<SingleNewsPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* Protected routes */}
          <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="create-news" element={<ProtectedRoute><CreateNewsPage /></ProtectedRoute>} />
          <Route path="edit-news/:id" element={<ProtectedRoute><CreateNewsPage isEdit /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}