import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import busApi from '../api/busApi';

export const fetchBuses = createAsyncThunk('buses/fetchAll', async () => {
  const res = await busApi.getAll(); return res.data;
});
export const fetchBus = createAsyncThunk('buses/fetchOne', async (id) => {
  const res = await busApi.get(id); return res.data;
});
export const createBus = createAsyncThunk('buses/create', async (payload) => {
  const res = await busApi.create(payload); return res.data;
});
export const updateBus = createAsyncThunk('buses/update', async ({id,data}) => {
  const res = await busApi.update(id, data); return res.data;
});
export const deleteBus = createAsyncThunk('buses/delete', async (id) => {
  await busApi.delete(id); return id;
});

const slice = createSlice({
  name: 'buses',
  initialState: { list: [], current: null, status: 'idle', error: null },
  reducers: { clearCurrent(s){ s.current=null; } },
  extraReducers: (b)=>{
    b.addCase(fetchBuses.pending, (s)=>{s.status='loading';})
     .addCase(fetchBuses.fulfilled, (s,a)=>{s.status='succeeded'; s.list=a.payload;})
     .addCase(fetchBuses.rejected, (s,a)=>{s.status='failed'; s.error=a.error.message;})

     .addCase(fetchBus.fulfilled, (s,a)=>{s.current=a.payload;})

     .addCase(createBus.fulfilled, (s,a)=>{s.list.unshift(a.payload);})

     .addCase(updateBus.fulfilled, (s,a)=>{
       const i = s.list.findIndex(x=>x.id===a.payload.id);
       if(i>-1) s.list[i]=a.payload;
       if(s.current?.id===a.payload.id) s.current=a.payload;
     })

     .addCase(deleteBus.fulfilled, (s,a)=>{
       s.list = s.list.filter(x=>x.id!==a.payload);
       if(s.current?.id===a.payload) s.current=null;
     });
  }
});

export const { clearCurrent } = slice.actions;
export default slice.reducer;
