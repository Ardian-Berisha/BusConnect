import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerThunk } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector(s => s.auth);

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onBlur = e => setTouched({ ...touched, [e.target.name]: true });

  const invalidName = touched.name && form.name.trim().length < 2;
  const invalidEmail = touched.email && !/^\S+@\S+\.\S+$/.test(form.email);
  const invalidPassword = touched.password && form.password.length < 6;

  const onSubmit = e => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (invalidName || invalidEmail || invalidPassword) return;
    dispatch(registerThunk({ name: form.name.trim(), email: form.email, password: form.password, role: form.role }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-sm" style={{ maxWidth: 520, width: '100%' }}>
        <div className="card-body p-4">
          <h1 className="h4 text-center mb-3">Create your account</h1>

          {error && status === 'failed' && (
            <div className="alert alert-danger py-2" role="alert">
              {error || 'Registration failed'}
            </div>
          )}

          <form onSubmit={onSubmit} noValidate>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Full name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${invalidName ? 'is-invalid' : ''}`}
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={onChange}
                  onBlur={onBlur}
                  required
                />
                {invalidName && <div className="invalid-feedback">Enter your name.</div>}
              </div>

              <div className="col-12">
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

              <div className="col-12">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${invalidPassword ? 'is-invalid' : ''}`}
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={onChange}
                  onBlur={onBlur}
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
                {invalidPassword && <div className="invalid-feedback">Min length 6.</div>}
              </div>

              <div className="col-12">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={form.role}
                  onChange={onChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="form-text">Keep “User” unless you will manage buses and routes.</div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 mt-3"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" />
              ) : null}
              Create account
            </button>
          </form>

          <div className="text-center mt-3">
            <span className="text-muted">Already have an account?</span>{' '}
            <Link to="/login">Sign in</Link>
          </div>
        </div>
        <div className="card-footer bg-white text-center small text-muted">
          &copy; {new Date().getFullYear()} BusConnect
        </div>
      </div>
    </div>
  );
}
