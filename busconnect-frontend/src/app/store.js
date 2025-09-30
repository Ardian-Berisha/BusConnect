import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/authSlice';
import users from '../features/userSlice';
import buses from '../features/busSlice';
import routes from '../features/routeSlice';
import bookings from '../features/bookingSlice';

export const store = configureStore({
  reducer: { auth, users, buses, routes, bookings }
});

export default store;
