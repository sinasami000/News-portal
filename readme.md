# 📰 NewsPortal — Full Stack News Website

A complete, production-ready full-stack news portal built with React, Redux Toolkit, Tailwind CSS, Express.js, Node.js, and MongoDB.

---

## 🏗️ Project Structure

```
newsportal/
├── backend/                  # Express.js + Node.js API
│   ├── models/
│   │   ├── User.model.js     # User schema (auth, profile)
│   │   └── News.model.js     # News article schema
│   ├── routes/
│   │   ├── auth.routes.js    # Register, Login, /me
│   │   ├── news.routes.js    # CRUD for news
│   │   └── user.routes.js    # Profile update, password change
│   ├── middleware/
│   │   └── auth.middleware.js # JWT protect, adminOnly
│   ├── server.js             # Express app entry
│   ├── .env.example          # Environment variable template
│   └── package.json
│
└── frontend/                 # React + Vite app
    ├── src/
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Header.jsx      # Navbar with auth state
    │   │   │   ├── Footer.jsx      # Footer with links
    │   │   │   └── Layout.jsx      # Layout wrapper
    │   │   └── common/
    │   │       ├── NewsCard.jsx    # 3 variants: default, hero, horizontal
    │   │       ├── ProtectedRoute.jsx
    │   │       └── Spinner.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx        # Home with top 6 news API call
    │   │   ├── NewsPage.jsx        # All news, search, pagination
    │   │   ├── SingleNewsPage.jsx  # News detail with views counter
    │   │   ├── LoginPage.jsx       # JWT login
    │   │   ├── RegisterPage.jsx    # User registration
    │   │   ├── DashboardPage.jsx   # User's news management
    │   │   ├── ProfilePage.jsx     # Profile & password update
    │   │   ├── CreateNewsPage.jsx  # Create & Edit news (shared component)
    │   │   ├── ContactPage.jsx     # Contact form
    │   │   └── NotFoundPage.jsx    # 404 page
    │   ├── store/
    │   │   ├── store.js            # Redux store config
    │   │   └── slices/
    │   │       ├── authSlice.js    # Auth state + async thunks
    │   │       └── newsSlice.js    # News state + async thunks
    │   ├── services/
    │   │   └── api.js              # Axios instance with interceptors
    │   ├── App.jsx                 # Routes config
    │   └── main.jsx                # Entry point
    └── package.json
```

---

## 🚀 Getting Started

### 1. Clone & Setup Backend

```bash
cd newsportal/backend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env

# Edit .env with your values:
# MONGO_URI=mongodb://localhost:27017/newsportal
# JWT_SECRET=your_super_secret_key_here
# PORT=5000

# Start backend (development)
npm run dev

# Start backend (production)
npm start
```

### 2. Setup Frontend

```bash
cd newsportal/frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### 3. Access the App

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/

---

## 🔌 API Endpoints

### Auth Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/me` | Get current user | Yes |

### News Routes (`/api/news`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all news (pagination, search, filter) | No |
| GET | `/top` | Get top 6 latest news | No |
| GET | `/:id` | Get single news (increments views) | No |
| POST | `/` | Create news | Yes |
| PUT | `/:id` | Update news (author only) | Yes |
| DELETE | `/:id` | Delete news (author only) | Yes |

### User Routes (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| PUT | `/profile` | Update profile (name, bio, avatar) | Yes |
| PUT | `/change-password` | Change password | Yes |
| GET | `/:id` | Get public user profile | No |

### Query Parameters for GET `/api/news`
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10)
- `category` — Filter by category
- `search` — Search in title, content, tags
- `author` — Filter by author ID

---

## ✨ Features Implemented

### Frontend
- ✅ **Home Page** — Breaking news ticker, hero story, top 6 news grid, category browser, CTA
- ✅ **News Page** — All news with search, category filter, pagination
- ✅ **Single News Page** — Full article, author info, tags, view counter, share button
- ✅ **Login Page** — JWT auth, form validation, toast feedback
- ✅ **Register Page** — New account creation, password confirmation
- ✅ **Dashboard** — Stats cards, news table with edit/delete, delete confirmation modal
- ✅ **Profile Page** — Edit profile (name, bio, avatar URL), change password tabs
- ✅ **Create/Edit News** — Category picker, image preview, tag management
- ✅ **Contact Page** — Contact info, social links, inquiry form
- ✅ **Header** — Responsive, auth-aware, category nav bar, profile dropdown
- ✅ **Footer** — Links, social media, newsletter signup
- ✅ **Protected Routes** — Dashboard, Profile, Create/Edit only for logged-in users
- ✅ **404 Page**

### Backend
- ✅ **JWT Authentication** — Register, Login, Token verification
- ✅ **User Model** — Password hashing (bcryptjs), comparePassword method
- ✅ **News Model** — Auto-excerpt generation, view counter
- ✅ **Authorization** — Only the news author can edit/delete their own news
- ✅ **Search & Pagination** — Full-text search across title, content, tags
- ✅ **Error Handling** — Global error middleware, descriptive messages

### State Management (Redux Toolkit)
- ✅ **authSlice** — User state, login/register/updateProfile/changePassword async thunks
- ✅ **newsSlice** — Top news, all news, my news, single news — full CRUD thunks
- ✅ **Axios interceptors** — Auto-attach JWT token, auto-redirect on 401

---

## 🎨 Design System

| Element | Value |
|---------|-------|
| Primary Font | Playfair Display (serif — headings) |
| Body Font | DM Sans (sans) |
| Mono Font | JetBrains Mono (badges, labels) |
| Primary Color | Crimson Red (`#e11d48`) |
| Base Color | Warm Ink (`#40362a`) |
| Background | Off-white (`#f8f6f1`) |
| Design Style | Editorial / Newspaper |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 + Vite |
| State Management | Redux Toolkit |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Toast Notifications | React Hot Toast |
| Icons | React Icons (Feather) |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |

---

## 📦 Environment Variables

### Backend `.env`
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/newsportal
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

---

## 🔐 Security Notes

1. Change `JWT_SECRET` to a long random string in production
2. Use HTTPS in production
3. Add rate limiting (e.g., `express-rate-limit`) for production
4. Consider adding helmet.js for security headers
5. Validate and sanitize all inputs with a library like `joi` or `express-validator`
6. Store images using Cloudinary or AWS S3 instead of URLs

---

## 📝 Assignment Checklist

| Requirement | Status |
|-------------|--------|
| Home page with 4-5 sections + top 6 news | ✅ |
| News page with all news + API call | ✅ |
| Single news details page + API call | ✅ |
| Login & Register pages + API call | ✅ |
| Users can create and publish news | ✅ |
| User Dashboard / Profile page + API call | ✅ |
| Edit and delete news from dashboard | ✅ |
| Contact Us page | ✅ |
| Header & Footer | ✅ |
| Frontend: React + Tailwind + Redux Toolkit | ✅ |
| Backend: Express + Node + MongoDB | ✅ |