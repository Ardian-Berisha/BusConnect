import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../api/userApi';

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const res = await userApi.getAll(); return res.data;
});
export const fetchUser = createAsyncThunk('users/fetchOne', async (id) => {
  const res = await userApi.get(id); return res.data;
});
export const createUser = createAsyncThunk('users/create', async (payload) => {
  const res = await userApi.create(payload); return res.data;
});
export const updateUser = createAsyncThunk('users/update', async ({id,data}) => {
  const res = await userApi.update(id, data); return res.data;
});
export const deleteUser = createAsyncThunk('users/delete', async (id) => {
  await userApi.delete(id); return id;
});

const slice = createSlice({
  name: 'users',
  initialState: { list: [], current: null, status: 'idle', error: null },
  reducers: { clearCurrent(s){ s.current=null; } },
  extraReducers: (b) => {
    b.addCase(fetchUsers.pending, (s)=>{s.status='loading';})
     .addCase(fetchUsers.fulfilled, (s,a)=>{s.status='succeeded'; s.list=a.payload;})
     .addCase(fetchUsers.rejected, (s,a)=>{s.status='failed'; s.error=a.error.message;})

     .addCase(fetchUser.fulfilled, (s,a)=>{s.current=a.payload;})

     .addCase(createUser.fulfilled, (s,a)=>{s.list.unshift(a.payload);})

     .addCase(updateUser.fulfilled, (s,a)=>{
       const i = s.list.findIndex(u=>u.id===a.payload.id);
       if(i>-1) s.list[i]=a.payload;
       if(s.current?.id===a.payload.id) s.current=a.payload;
     })

     .addCase(deleteUser.fulfilled, (s,a)=>{
       s.list = s.list.filter(u=>u.id!==a.payload);
       if(s.current?.id===a.payload) s.current=null;
     });
  }
});

export const { clearCurrent } = slice.actions;
export default slice.reducer;
