import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="bg-light border-end" style={{ minHeight: '100vh', width: 260 }}>
      <div className="p-3 border-bottom">
        <div className="fw-bold">Admin Panel</div>
        <small className="text-muted">BusConnect</small>
      </div>
      <ul className="nav flex-column p-2">
        <li className="nav-item"><NavLink end to="/admin" className="nav-link">Dashboard</NavLink></li>
        <li className="nav-item"><NavLink to="/admin/users" className="nav-link">Users</NavLink></li>
        <li className="nav-item"><NavLink to="/admin/buses" className="nav-link">Buses</NavLink></li>
        <li className="nav-item"><NavLink to="/admin/routes" className="nav-link">Routes</NavLink></li>
        <li className="nav-item"><NavLink to="/admin/bookings" className="nav-link">Bookings</NavLink></li>
      </ul>
    </aside>
  );
}
