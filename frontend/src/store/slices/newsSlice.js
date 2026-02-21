import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTopNews = createAsyncThunk('news/fetchTop', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/news/top');
    return data.news;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch top news');
  }
});

export const fetchAllNews = createAsyncThunk('news/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/news', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch news');
  }
});

export const fetchSingleNews = createAsyncThunk('news/fetchSingle', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/news/${id}`);
    return data.news;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'News not found');
  }
});

export const fetchMyNews = createAsyncThunk('news/fetchMy', async (authorId, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/news', { params: { author: authorId, limit: 100 } });
    return data.news;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch your news');
  }
});

export const createNews = createAsyncThunk('news/create', async (newsData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/news', newsData);
    return data.news;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create news');
  }
});

export const updateNews = createAsyncThunk('news/update', async ({ id, newsData }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/news/${id}`, newsData);
    return data.news;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update news');
  }
});

export const deleteNews = createAsyncThunk('news/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/news/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete news');
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    topNews: [],
    allNews: [],
    myNews: [],
    currentNews: null,
    pagination: { total: 0, page: 1, pages: 1 },
    loading: false,
    error: null
  },
  reducers: {
    clearCurrentNews: (state) => { state.currentNews = null; },
    clearError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(fetchTopNews.pending, pending)
      .addCase(fetchTopNews.fulfilled, (state, action) => { state.loading = false; state.topNews = action.payload; })
      .addCase(fetchTopNews.rejected, rejected)

      .addCase(fetchAllNews.pending, pending)
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.loading = false;
        state.allNews = action.payload.news;
        state.pagination = { total: action.payload.total, page: action.payload.page, pages: action.payload.pages };
      })
      .addCase(fetchAllNews.rejected, rejected)

      .addCase(fetchSingleNews.pending, pending)
      .addCase(fetchSingleNews.fulfilled, (state, action) => { state.loading = false; state.currentNews = action.payload; })
      .addCase(fetchSingleNews.rejected, rejected)

      .addCase(fetchMyNews.pending, pending)
      .addCase(fetchMyNews.fulfilled, (state, action) => { state.loading = false; state.myNews = action.payload; })
      .addCase(fetchMyNews.rejected, rejected)

      .addCase(createNews.pending, pending)
      .addCase(createNews.fulfilled, (state, action) => {
        state.loading = false;
        state.myNews.unshift(action.payload);
      })
      .addCase(createNews.rejected, rejected)

      .addCase(updateNews.pending, pending)
      .addCase(updateNews.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.myNews.findIndex(n => n._id === action.payload._id);
        if (idx !== -1) state.myNews[idx] = action.payload;
        if (state.currentNews?._id === action.payload._id) state.currentNews = action.payload;
      })
      .addCase(updateNews.rejected, rejected)

      .addCase(deleteNews.pending, pending)
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.loading = false;
        state.myNews = state.myNews.filter(n => n._id !== action.payload);
        state.allNews = state.allNews.filter(n => n._id !== action.payload);
      })
      .addCase(deleteNews.rejected, rejected);
  }
});

export const { clearCurrentNews, clearError } = newsSlice.actions;
export default newsSlice.reducer;