import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector(s => s.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login', { replace: true }); return; }
    if (!user) dispatch(me());
  }, [dispatch, user, navigate]);

  if (!localStorage.getItem('token')) return null;

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h1 className="h4 mb-1">Your profile</h1>
                  <p className="text-muted mb-0">Account details and session info</p>
                </div>
                <LogoutButton />
              </div>

              {status === 'loading' && (
                <div className="mt-3">
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Loading…
                </div>
              )}

              {user && (
                <div className="mt-3">
                  <div className="list-group list-group-flush">
                    <div className="list-group-item px-0 d-flex justify-content-between">
                      <span className="text-muted">Name</span>
                      <strong>{user.name}</strong>
                    </div>
                    <div className="list-group-item px-0 d-flex justify-content-between">
                      <span className="text-muted">Email</span>
                      <strong>{user.email}</strong>
                    </div>
                    <div className="list-group-item px-0 d-flex justify-content-between">
                      <span className="text-muted">Role</span>
                      <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="list-group-item px-0 d-flex justify-content-between">
                      <span className="text-muted">User ID</span>
                      <code>{user.id}</code>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => dispatch(me())}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                  ) : null}
                  Refresh
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
            </div>
            <div className="card-footer bg-white text-end">
              <small className="text-muted">JWT stored in localStorage</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
