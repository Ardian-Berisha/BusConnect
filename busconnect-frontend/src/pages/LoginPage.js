import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, status, error } = useSelector(s => s.auth);

  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onBlur = e => setTouched({ ...touched, [e.target.name]: true });

  const invalidEmail = touched.email && !/^\S+@\S+\.\S+$/.test(form.email);
  const invalidPassword = touched.password && form.password.length < 6;

  const onSubmit = e => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (invalidEmail || invalidPassword) return;
    dispatch(login(form));
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-sm" style={{ maxWidth: 420, width: '100%' }}>
        <div className="card-body p-4">
          <h1 className="h4 text-center mb-3">Sign in to BusConnect</h1>

          {error && status === 'failed' && (
            <div className="alert alert-danger py-2" role="alert">
              {error || 'Login failed'}
            </div>
          )}

          <form onSubmit={onSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${invalidEmail ? 'is-invalid' : ''}`}
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="email"
                required
              />
              {invalidEmail && <div className="invalid-feedback">Enter a valid email.</div>}
            </div>

            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${invalidPassword ? 'is-invalid' : ''}`}
                placeholder="••••••••"
                value={form.password}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="current-password"
                required
                minLength={6}
              />
              {invalidPassword && <div className="invalid-feedback">Min length 6.</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" />
              ) : null}
              Sign in
            </button>
          </form>

          <div className="text-center mt-3">
            <span className="text-muted">No account?</span>{' '}
            <Link to="/register">Create one</Link>
          </div>
        </div>
        <div className="card-footer bg-white text-center small text-muted">
          &copy; {new Date().getFullYear()} BusConnect
        </div>
      </div>
    </div>
  );
}
