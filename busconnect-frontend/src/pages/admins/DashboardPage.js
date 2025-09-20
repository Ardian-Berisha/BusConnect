// src/pages/admin/DashboardPage.jsx
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { list: users } = useSelector(s => s.users);
  const { list: buses } = useSelector(s => s.buses);
  const { list: routes } = useSelector(s => s.routes);
  const { list: bookings } = useSelector(s => s.bookings);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="row g-3">
        <div className="col-md-3">
          <Link to="/admin/users" className="text-decoration-none">
            <div className="card shadow-sm text-center p-3">
              <h2 className="h4">{users.length}</h2>
              <p className="text-muted mb-0">Users</p>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/admin/buses" className="text-decoration-none">
            <div className="card shadow-sm text-center p-3">
              <h2 className="h4">{buses.length}</h2>
              <p className="text-muted mb-0">Buses</p>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/admin/routes" className="text-decoration-none">
            <div className="card shadow-sm text-center p-3">
              <h2 className="h4">{routes.length}</h2>
              <p className="text-muted mb-0">Bus Routes</p>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/admin/bookings" className="text-decoration-none">
            <div className="card shadow-sm text-center p-3">
              <h2 className="h4">{bookings.length}</h2>
              <p className="text-muted mb-0">Bookings</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
