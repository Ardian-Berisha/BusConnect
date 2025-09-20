import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../api/authApi';

// thunks
export const register = createAsyncThunk('auth/register', async (payload) => {
  const res = await authApi.register(payload);
  localStorage.setItem('token', res.data.token);
  return res.data.user;
});

export const login = createAsyncThunk('auth/login', async (payload) => {
  const res = await authApi.login(payload);
  localStorage.setItem('token', res.data.token);
  return res.data.user;
});

export const me = createAsyncThunk('auth/me', async () => {
  const res = await authApi.me();
  return res.data;
});

export const logoutServer = createAsyncThunk('auth/logoutServer', async () => {
  try { await authApi.logout(); } catch (_) { /* ignore */ }
  return true;
});

// slice
const slice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    logout(state) { state.user = null; localStorage.removeItem('token'); },
    setUser(state, action) { state.user = action.payload; }
  },
  extraReducers: (b) => {
    b.addCase(register.pending, (s)=>{s.status='loading'; s.error=null;})
     .addCase(register.fulfilled, (s,a)=>{s.status='succeeded'; s.user=a.payload;})
     .addCase(register.rejected, (s,a)=>{s.status='failed'; s.error=a.error.message;})

     .addCase(login.pending, (s)=>{s.status='loading'; s.error=null;})
     .addCase(login.fulfilled, (s,a)=>{s.status='succeeded'; s.user=a.payload;})
     .addCase(login.rejected, (s,a)=>{s.status='failed'; s.error=a.error.message;})

     .addCase(me.pending, (s)=>{s.status='loading';})
     .addCase(me.fulfilled, (s,a)=>{s.status='succeeded'; s.user=a.payload;})
     .addCase(me.rejected, (s)=>{s.status='idle';}) // token might be missing/expired

     .addCase(logoutServer.fulfilled, (s)=>{s.user=null; localStorage.removeItem('token');});
  }
});

export const { logout, setUser } = slice.actions;
export default slice.reducer;
