// src/pages/BookingPage.jsx
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createBooking } from '../features/bookingSlice';
import { fetchRoute } from '../features/routeSlice';
import { useNavigate,useParams } from 'react-router-dom';

export default function BookingPage() {
  const { id }=useParams(); // route id
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { current:route }=useSelector(s=>s.routes);
  const [seat,setSeat]=useState('');

  useEffect(()=>{dispatch(fetchRoute(id));},[dispatch,id]);

  const submit=e=>{
    e.preventDefault();
    dispatch(createBooking({bus_route_id:id,seat_number:seat,status:'booked'})).unwrap().then(()=>{
      navigate('/my-bookings');
    });
  };

  if(!route) return <div className="container py-4"><div className="spinner-border"/></div>;

  return(
    <div className="container py-4">
      <h1>Book a Seat on {route.origin} → {route.destination}</h1>
      <form onSubmit={submit} className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Seat Number</label>
          <input type="number" className="form-control" value={seat} onChange={e=>setSeat(e.target.value)} required/>
        </div>
        <div className="col-md-12">
          <button className="btn btn-primary">Confirm Booking</button>
        </div>
      </form>
    </div>
  );
}
