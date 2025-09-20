import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Auth pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

// Public / booking pages
import HomePage from './pages/HomePage';
import RoutesListPage from './pages/RoutesListPage';
import RouteDetailPage from './pages/RouteDetailPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin pages
import DashboardPage from './pages/admins/DashboardPage';
import UsersPage from './pages/admins/UsersPage';
import BusesPage from './pages/admins/BusesPage';
import BusRoutesPage from './pages/admins/BusRoutesPage';
import BookingsAdminPage from './pages/admins/BookingsAdminPage';

// Layout wrapper for admin pages with sidebar
function AdminLayout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <Sidebar />
      <main className="flex-grow-1 p-4 bg-light">{children}</main>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Always show navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/routes" element={<RoutesListPage />} />
        <Route path="/routes/:id" element={<RouteDetailPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected user pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Admin pages */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout><DashboardPage /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><UsersPage /></AdminLayout>} />
          <Route path="/admin/buses" element={<AdminLayout><BusesPage /></AdminLayout>} />
          <Route path="/admin/routes" element={<AdminLayout><BusRoutesPage /></AdminLayout>} />
          <Route path="/admin/bookings" element={<AdminLayout><BookingsAdminPage /></AdminLayout>} />
        </Route>

        {/* Error pages */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Always show footer */}
      <Footer />
    </Router>
  );
}

export default App;
