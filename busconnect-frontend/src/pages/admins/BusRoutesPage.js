// src/pages/admin/BusRoutesPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoutes, createRoute, updateRoute, deleteRoute } from '../../store/routeSlice';
import { fetchBuses } from '../../store/busSlice';

export default function BusRoutesPage() {
  const dispatch=useDispatch();
  const { list }=useSelector(s=>s.routes);
  const { list:busList }=useSelector(s=>s.buses);

  const [form,setForm]=useState({bus_id:'',origin:'',destination:'',departure_time:'',arrival_time:'',price:''});
  const [editing,setEditing]=useState(null);

  useEffect(()=>{dispatch(fetchRoutes());dispatch(fetchBuses());},[dispatch]);

  const submit=e=>{
    e.preventDefault();
    if(editing) dispatch(updateRoute({id:editing,data:form}));
    else dispatch(createRoute(form));
    setForm({bus_id:'',origin:'',destination:'',departure_time:'',arrival_time:'',price:''});
    setEditing(null);
  };

  const editRow=r=>{
    setEditing(r.id);
    setForm({
      bus_id:r.bus_id,
      origin:r.origin,
      destination:r.destination,
      departure_time:r.departure_time,
      arrival_time:r.arrival_time,
      price:r.price
    });
  };

  return(
    <div className="container py-4">
      <h1 className="mb-3">Manage Bus Routes</h1>

      <form onSubmit={submit} className="row g-2 mb-4">
        <div className="col-md-2">
          <select className="form-select" value={form.bus_id} onChange={e=>setForm({...form,bus_id:e.target.value})} required>
            <option value="">Bus</option>
            {busList.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div className="col-md-2"><input className="form-control" placeholder="Origin" value={form.origin} onChange={e=>setForm({...form,origin:e.target.value})} required/></div>
        <div className="col-md-2"><input className="form-control" placeholder="Destination" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} required/></div>
        <div className="col-md-2"><input type="datetime-local" className="form-control" value={form.departure_time} onChange={e=>setForm({...form,departure_time:e.target.value})} required/></div>
        <div className="col-md-2"><input type="datetime-local" className="form-control" value={form.arrival_time} onChange={e=>setForm({...form,arrival_time:e.target.value})} required/></div>
        <div className="col-md-1"><input className="form-control" placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required/></div>
        <div className="col-md-1"><button className="btn btn-primary w-100">{editing?'Update':'Add'}</button></div>
      </form>

      <table className="table table-striped">
        <thead><tr><th>Bus</th><th>Origin</th><th>Destination</th><th>Departure</th><th>Arrival</th><th>Price</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(r=>(
            <tr key={r.id}>
              <td>{r.bus?.name||r.bus_id}</td>
              <td>{r.origin}</td>
              <td>{r.destination}</td>
              <td>{r.departure_time}</td>
              <td>{r.arrival_time}</td>
              <td>{r.price}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-1" onClick={()=>editRow(r)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={()=>dispatch(deleteRoute(r.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
