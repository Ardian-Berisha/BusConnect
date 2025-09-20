import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';
import users from '../features/users/userSlice';
import buses from '../features/buses/busSlice';
import routes from '../features/routes/routeSlice';
import bookings from '../features/bookings/bookingSlice';

export const store = configureStore({
  reducer: { auth, users, buses, routes, bookings }
});

export default store;
