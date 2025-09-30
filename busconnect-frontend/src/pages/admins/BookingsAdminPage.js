// src/pages/admin/BookingsAdminPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, deleteBooking } from '../../features/bookingSlice';

export default function BookingsAdminPage() {
  const dispatch=useDispatch();
  const { list }=useSelector(s=>s.bookings);

  useEffect(()=>{dispatch(fetchBookings());},[dispatch]);

  return(
    <div className="container py-4">
      <h1 className="mb-3">All Bookings</h1>

      <table className="table table-striped">
        <thead><tr><th>User ID</th><th>Bus</th><th>Origin</th><th>Destination</th><th>Seat</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(b=>(
            <tr key={b.id}>
              <td>{b.user_id}</td>
              <td>{b.bus_route?.bus?.name}</td>
              <td>{b.bus_route?.origin}</td>
              <td>{b.bus_route?.destination}</td>
              <td>{b.seat_number}</td>
              <td><span className={`badge ${b.status==='booked'?'bg-success':'bg-secondary'}`}>{b.status}</span></td>
              <td><button className="btn btn-sm btn-outline-danger" onClick={()=>dispatch(deleteBooking(b.id))}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
