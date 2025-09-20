// src/pages/UnauthorizedPage.jsx
import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return(
    <div className="container py-5 text-center">
      <h1 className="display-5 text-danger">403 - Forbidden</h1>
      <p className="text-muted">You do not have permission to access this page.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}
