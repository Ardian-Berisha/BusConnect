import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function AdminRoute() {
  const { user } = useSelector(s => s.auth);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  if (user.role !== 'admin') {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
