import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import newsReducer from './slices/newsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;