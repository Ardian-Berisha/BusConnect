// src/pages/RouteDetailPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoute } from '../features/routeSlice';
import { Link, useParams } from 'react-router-dom';
import { formatDate } from '../components/dateFormat'; // at top


export default function RouteDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current: route } = useSelector(s => s.routes);
  const { user } = useSelector(s => s.auth); // get logged-in user

  useEffect(() => {
    dispatch(fetchRoute(id));
  }, [dispatch, id]);

  if (!route) {
    return (
      <div className="container py-4">
        <div className="spinner-border" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1>{route.origin} → {route.destination}</h1>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <p><strong>Bus:</strong> {route.bus?.name}</p>
            <p><strong>Departure:</strong> {formatDate(route.departure_time)}</p>
            <p><strong>Arrival:</strong> {formatDate(route.arrival_time)}</p>
            <p><strong>Price:</strong> ${route.price}</p>

            {/* Only show Book button if logged in (user or admin) */}
            {user && (
              <Link to={`/book/${route.id}`} className="btn btn-success">
                Book Seat
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
