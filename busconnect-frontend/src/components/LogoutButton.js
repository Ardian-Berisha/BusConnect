import { useDispatch } from 'react-redux';
import { logoutServer } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LogoutButton({ className = 'btn btn-outline-danger' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const doLogout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await dispatch(logoutServer()).unwrap();
    } catch (_) {
      // ignore
    } finally {
      setBusy(false);
      navigate('/login', { replace: true });
    }
  };

  return (
    <button type="button" className={className} onClick={doLogout} disabled={busy}>
      {busy ? <span className="spinner-border spinner-border-sm me-2" role="status" /> : null}
      Logout
    </button>
  );
}
