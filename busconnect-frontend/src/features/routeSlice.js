import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routeApi from '../api/routeApi';

export const fetchRoutes = createAsyncThunk('routes/fetchAll', async () => {
  const res = await routeApi.getAll(); return res.data;
});
export const fetchRoute = createAsyncThunk('routes/fetchOne', async (id) => {
  const res = await routeApi.get(id); return res.data;
});
export const createRoute = createAsyncThunk('routes/create', async (payload) => {
  const res = await routeApi.create(payload); return res.data;
});
export const updateRoute = createAsyncThunk('routes/update', async ({id,data}) => {
  const res = await routeApi.update(id, data); return res.data;
});
export const deleteRoute = createAsyncThunk('routes/delete', async (id) => {
  await routeApi.delete(id); return id;
});

const slice = createSlice({
  name: 'routes',
  initialState: { list: [], current: null, status: 'idle', error: null },
  reducers: { clearCurrent(s){ s.current=null; } },
  extraReducers: (b)=>{
    b.addCase(fetchRoutes.pending, (s)=>{s.status='loading';})
     .addCase(fetchRoutes.fulfilled, (s,a)=>{s.status='succeeded'; s.list=a.payload;})
     .addCase(fetchRoutes.rejected, (s,a)=>{s.status='failed'; s.error=a.error.message;})

     .addCase(fetchRoute.fulfilled, (s,a)=>{s.current=a.payload;})

     .addCase(createRoute.fulfilled, (s,a)=>{s.list.unshift(a.payload);})

     .addCase(updateRoute.fulfilled, (s,a)=>{
       const i = s.list.findIndex(x=>x.id===a.payload.id);
       if(i>-1) s.list[i]=a.payload;
       if(s.current?.id===a.payload.id) s.current=a.payload;
     })

     .addCase(deleteRoute.fulfilled, (s,a)=>{
       s.list = s.list.filter(x=>x.id!==a.payload);
       if(s.current?.id===a.payload) s.current=null;
     });
  }
});

export const { clearCurrent } = slice.actions;
export default slice.reducer;
