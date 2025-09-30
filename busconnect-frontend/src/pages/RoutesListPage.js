// src/pages/RoutesListPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoutes } from '../features/routeSlice';
import { Link } from 'react-router-dom';
import { formatDate } from '../components/dateFormat'; // at top




export default function RoutesListPage() {
  const dispatch = useDispatch();
  const { list } = useSelector(s => s.routes);
  const [filter,setFilter]=useState('');

  useEffect(()=>{dispatch(fetchRoutes());},[dispatch]);

  const filtered=list.filter(r=>
    r.origin.toLowerCase().includes(filter.toLowerCase())||
    r.destination.toLowerCase().includes(filter.toLowerCase())
  );

  return(
    <div className="container py-4">
      <h1 className="mb-3">Available Routes</h1>
      <div className="mb-3">
        <input className="form-control" placeholder="Search by origin or destination" value={filter} onChange={e=>setFilter(e.target.value)}/>
      </div>
      <table className="table table-striped">
        <thead><tr><th>Bus</th><th>Origin</th><th>Destination</th><th>Departure</th><th>Arrival</th><th>Price</th><th></th></tr></thead>
        <tbody>
          {filtered.map(r=>(
            <tr key={r.id}>
              <td>{r.bus?.name}</td>
              <td>{r.origin}</td>
              <td>{r.destination}</td>
              <td>{formatDate(r.departure_time)}</td>
              <td>{formatDate(r.arrival_time)}</td>
              <td>${r.price}</td>
              <td><Link className="btn btn-sm btn-outline-primary" to={`/routes/${r.id}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
