import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingApi from '../api/bookingApi';

// NOTE: index() returns bookings only for the logged-in user (per controller)
export const fetchBookings = createAsyncThunk('bookings/fetchAll', async () => {
  const res = await bookingApi.getAll(); return res.data;
});
export const fetchBooking = createAsyncThunk('bookings/fetchOne', async (id) => {
  const res = await bookingApi.get(id); return res.data;
});
export const createBooking = createAsyncThunk('bookings/create', async (payload) => {
  const res = await bookingApi.create(payload); return res.data;
});
export const updateBooking = createAsyncThunk('bookings/update', async ({id,data}) => {
  const res = await bookingApi.update(id, data); return res.data;
});
export const deleteBooking = createAsyncThunk('bookings/delete', async (id) => {
  await bookingApi.delete(id); return id;
});

const slice = createSlice({
  name: 'bookings',
  initialState: { list: [], current: null, status: 'idle', error: null },
  reducers: { clearCurrent(s){ s.current=null; } },
  extraReducers: (b)=>{
    b.addCase(fetchBookings.pending, (s)=>{s.status='loading';})
     .addCase(fetchBookings.fulfilled, (s,a)=>{s.status='succeeded'; s.list=a.payload;})
     .addCase(fetchBookings.rejected, (s,a)=>{s.status='failed'; s.error=a.error.message;})

     .addCase(fetchBooking.fulfilled, (s,a)=>{s.current=a.payload;})

     .addCase(createBooking.fulfilled, (s,a)=>{s.list.unshift(a.payload);})

     .addCase(updateBooking.fulfilled, (s,a)=>{
       const i = s.list.findIndex(x=>x.id===a.payload.id);
       if(i>-1) s.list[i]=a.payload;
       if(s.current?.id===a.payload.id) s.current=a.payload;
     })

     .addCase(deleteBooking.fulfilled, (s,a)=>{
       s.list = s.list.filter(x=>x.id!==a.payload);
       if(s.current?.id===a.payload) s.current=null;
     });
  }
});

export const { clearCurrent } = slice.actions;
export default slice.reducer;
