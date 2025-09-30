import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../features/authSlice';
import axiosClient from '../api/AxiosClient';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector(s => s.auth);

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login', { replace: true }); return; }
    if (!user) dispatch(me());
    else setForm({ name: user.name, email: user.email, password: '' });
  }, [dispatch, user, navigate]);

  if (!localStorage.getItem('token')) return null;

  const saveChanges = async () => {
    setSaving(true);
    try {
      await axiosClient.put('/me', {
        name: form.name,
        email: form.email,
        password: form.password || undefined
      });
      dispatch(me()); // refresh
      setForm(f => ({ ...f, password: '' }));
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1 className="h4 mb-0">Your profile</h1>
                <LogoutButton />
              </div>

              {status === 'loading' && (
                <div className="mt-3">
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Loading…
                </div>
              )}

              {user && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Full name</label>
                    <input className="form-control" value={form.name}
                      onChange={e=>setForm({...form,name:e.target.value})}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" type="email" value={form.email}
                      onChange={e=>setForm({...form,email:e.target.value})}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Change password</label>
                    <input className="form-control" type="password" value={form.password}
                      onChange={e=>setForm({...form,password:e.target.value})} placeholder="Leave blank to keep current"/>
                  </div>
                  <div className="mb-3">
                    <span className="text-muted">Role:</span>{' '}
                    <span className={`badge ${user.role==='admin'?'bg-danger':'bg-secondary'}`}>{user.role}</span>
                  </div>
                  <button className="btn btn-primary" disabled={saving} onClick={saveChanges}>
                    {saving ? <span className="spinner-border spinner-border-sm me-2" /> : null}
                    Save changes
                  </button>
                </>
              )}
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
