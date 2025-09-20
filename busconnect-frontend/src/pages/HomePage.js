// src/pages/HomePage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoutes } from '../store/routeSlice';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const dispatch = useDispatch();
  const { list: routes, status } = useSelector(s => s.routes);

  useEffect(() => { dispatch(fetchRoutes()); }, [dispatch]);

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1>Welcome to BusConnect</h1>
        <p className="text-muted">Book your bus trips easily and securely</p>
      </div>

      {status === 'loading' && <div className="text-center"><div className="spinner-border"/></div>}

      <div className="row g-3">
        {routes.slice(0,6).map(r=>(
          <div className="col-md-4" key={r.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{r.origin} → {r.destination}</h5>
                <p className="card-text text-muted mb-1">Bus: {r.bus?.name}</p>
                <p className="card-text mb-1"><strong>${r.price}</strong></p>
                <p className="card-text small text-muted">Departs: {r.departure_time}</p>
                <Link className="btn btn-primary btn-sm" to={`/routes/${r.id}`}>View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
