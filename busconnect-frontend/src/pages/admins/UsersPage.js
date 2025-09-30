// src/pages/admin/UsersPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../features/userSlice';

export default function UsersPage() {
  const dispatch = useDispatch();
  const { list, status } = useSelector(s => s.users);

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [editing, setEditing] = useState(null);

  useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

  const submit = e => {
    e.preventDefault();
    if (editing) {
      dispatch(updateUser({ id: editing, data: form }));
    } else {
      dispatch(createUser(form));
    }
    setForm({ name: '', email: '', password: '', role: 'user' });
    setEditing(null);
  };

  const editRow = u => {
    setEditing(u.id);
    setForm({ name: u.name, email: u.email, password: '', role: u.role });
  };

  return (
    <div className="container py-4">
      <h1 className="mb-3">Manage Users</h1>

      <form onSubmit={submit} className="row g-2 mb-4">
        <div className="col-md-3">
          <input className="form-control" placeholder="Name"
            value={form.name} onChange={e => setForm({...form,name:e.target.value})} required/>
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Email"
            type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required/>
        </div>
        <div className="col-md-2">
          <input className="form-control" placeholder="Password"
            type="password" value={form.password} onChange={e => setForm({...form,password:e.target.value})}
            minLength={6} required={!editing}/>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={form.role}
            onChange={e => setForm({...form,role:e.target.value})}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">
            {editing ? 'Update' : 'Add'}
          </button>
        </div>
      </form>

      {status === 'loading' && <div className="spinner-border" />}

      <table className="table table-striped">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {list.map(u=>(
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td><span className={`badge ${u.role==='admin'?'bg-danger':'bg-secondary'}`}>{u.role}</span></td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-1" onClick={()=>editRow(u)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={()=>dispatch(deleteUser(u.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
