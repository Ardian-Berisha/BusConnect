// src/pages/admin/BusesPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuses, createBus, updateBus, deleteBus } from '../../store/busSlice';

export default function BusesPage() {
  const dispatch = useDispatch();
  const { list } = useSelector(s => s.buses);
  const [form, setForm] = useState({ name:'', plate_number:'', capacity:'' });
  const [editing,setEditing]=useState(null);

  useEffect(()=>{dispatch(fetchBuses());},[dispatch]);

  const submit=e=>{
    e.preventDefault();
    if(editing) dispatch(updateBus({id:editing,data:form}));
    else dispatch(createBus(form));
    setForm({name:'',plate_number:'',capacity:''});
    setEditing(null);
  };

  const editRow=b=>{
    setEditing(b.id);
    setForm({name:b.name,plate_number:b.plate_number,capacity:b.capacity});
  };

  return(
    <div className="container py-4">
      <h1 className="mb-3">Manage Buses</h1>

      <form onSubmit={submit} className="row g-2 mb-4">
        <div className="col-md-3"><input className="form-control" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></div>
        <div className="col-md-3"><input className="form-control" placeholder="Plate" value={form.plate_number} onChange={e=>setForm({...form,plate_number:e.target.value})} required/></div>
        <div className="col-md-2"><input className="form-control" placeholder="Capacity" type="number" value={form.capacity} onChange={e=>setForm({...form,capacity:e.target.value})} required/></div>
        <div className="col-md-2"><button className="btn btn-primary w-100">{editing?'Update':'Add'}</button></div>
      </form>

      <table className="table table-striped">
        <thead><tr><th>Name</th><th>Plate</th><th>Capacity</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(b=>(
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.plate_number}</td>
              <td>{b.capacity}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-1" onClick={()=>editRow(b)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={()=>dispatch(deleteBus(b.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
