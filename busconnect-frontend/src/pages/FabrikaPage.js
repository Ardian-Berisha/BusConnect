import { useEffect, useState } from 'react';
import fabrikaApi from '../api/fabrikaApi';

export default function FabrikaPage() {
  const [fabrikat, setfabrikat] = useState([]);
  const [form, setForm] = useState({ Name: '', Location: '' });
  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    const res = await fabrikaApi.getAll();
    setfabrikat(res.data);
  };

  useEffect(() => { loadData(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await fabrikaApi.update(editing, form);
    } else {
      await fabrikaApi.create(form);
    }
    setForm({ Name: '', Location: '' });
    setEditing(null);
    loadData();
  };

  const startEdit = (l) => {
    setEditing(l.ID);
    setForm({ Name: l.Name, Location: l.Location  });
  };

  const remove = async (id) => {
    await fabrikaApi.delete(id);
    loadData();
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Manage Fabrika</h1>

      {/* Card form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={submit} className="row g-3">
            <div className="col-md-4">
              <input className="form-control" placeholder="Name"
                value={form.Name}
                onChange={e => setForm({ ...form, Name: e.target.value })}
                required />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="Location"
                value={form.Location}
                onChange={e => setForm({ ...form, Location: e.target.value })}
                required />
            </div>
            <div className="col-12 text-end">
              <button className="btn btn-success">{editing ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead className="table-light">
              <tr><th>ID</th><th>Name</th><th>Location</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {fabrikat.map(l => (
                <tr key={l.ID}>
                  <td>{l.ID}</td>
                  <td>{l.Name}</td>
                  <td>{l.Location}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(l)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => remove(l.ID)}>Delete</button>
                  </td>
                </tr>
              ))}
              {fabrikat.length === 0 && (
                <tr><td colSpan="5" className="text-center text-muted">No Fabrika found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
