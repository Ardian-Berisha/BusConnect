import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutServer } from '../features/authSlice';
import { useState } from 'react';

export default function Navbar() {
  const { user } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const doLogout = async () => {
    if (busy) return;
    setBusy(true);
    try { await dispatch(logoutServer()).unwrap(); } catch (_) {}
    setBusy(false);
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">BusConnect</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink end className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/routes">Routes</NavLink></li>
            {user && (
              <li className="nav-item"><NavLink className="nav-link" to="/my-bookings">My Bookings</NavLink></li>
            )}
            {user?.role === 'admin' && (
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle btn btn-link" data-bs-toggle="dropdown">Admin</button>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to="/admin">Dashboard</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/admin/users">Users</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/admin/buses">Buses</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/admin/routes">Routes</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/admin/bookings">Bookings</NavLink></li>
                </ul>
              </li>
            )}
          </ul>

          <div className="d-flex gap-2">
            {!user ? (
              <>
                <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
                <Link className="btn btn-primary btn-sm" to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light btn-sm" to="/profile">{user.name}</Link>
                <button className="btn btn-danger btn-sm" onClick={doLogout} disabled={busy}>
                  {busy ? <span className="spinner-border spinner-border-sm me-1" /> : null}
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
