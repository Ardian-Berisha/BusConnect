// src/pages/MyBookingsPage.jsx
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchBookings,deleteBooking } from '../store/bookingSlice';

export default function MyBookingsPage() {
  const dispatch=useDispatch();
  const { list,status }=useSelector(s=>s.bookings);

  useEffect(()=>{dispatch(fetchBookings());},[dispatch]);

  return(
    <div className="container py-4">
      <h1 className="mb-3">My Bookings</h1>
      {status==='loading'&&<div className="spinner-border"/>}
      <table className="table table-striped">
        <thead><tr><th>Route</th><th>Bus</th><th>Seat</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {list.map(b=>(
            <tr key={b.id}>
              <td>{b.bus_route?.origin} → {b.bus_route?.destination}</td>
              <td>{b.bus_route?.bus?.name}</td>
              <td>{b.seat_number}</td>
              <td><span className={`badge ${b.status==='booked'?'bg-success':'bg-secondary'}`}>{b.status}</span></td>
              <td><button className="btn btn-sm btn-outline-danger" onClick={()=>dispatch(deleteBooking(b.id))}>Cancel</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
