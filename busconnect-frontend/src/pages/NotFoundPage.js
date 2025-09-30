// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return(
    <div className="container py-5 text-center">
      <h1 className="display-5 text-danger">404 - Page Not Found</h1>
      <p className="text-muted">The page you’re looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}
