import { useEffect, useState } from 'react';
import punetoriApi from '../api/punetoriApi';
import fabrikaApi from '../api/fabrikaApi';

export default function PunetoriPage() {
  const [Punetoret, setPunetoret] = useState([]);
  const [Fabrika, setFabrika] = useState([]);
  const [form, setForm] = useState({ FirstName: '', LastName: '', Position: '' , FabrikaID: '' });
  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    const resPunetoret = await punetoriApi.getAll();
    const resFabrikat = await fabrikaApi.getAll();
    setPunetoret(resPunetoret.data);
    setFabrika(resFabrikat.data);
  };

  useEffect(() => { loadData(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await punetoriApi.update(editing, form);
    } else {
      await punetoriApi.create(form);
    }
    setForm({ FirstName: '', LastName: '', Position: '', FabrikaID: '' });
    setEditing(null);
    loadData();
  };

  const startEdit = (le) => {
    setEditing(le.PunetoriID);
    setForm({ FirstName: le.FirstName, LastName: le.LastName, Position: le.Position, FabrikaID: le.FabrikaID });
  };

  const remove = async (id) => {
    await punetoriApi.delete(id);
    loadData();
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Manage Punetoret</h1>

      {/* Card form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={submit} className="row g-3">
            <div className="col-md-6">
              <input className="form-control" placeholder="Punetori First Name"
                value={form.FirstName}
                onChange={e => setForm({ ...form, FirstName: e.target.value })}
                required />
            </div>
            <div className="col-md-6">
              <input className="form-control" placeholder="Punetori Last Name"
                value={form.LastName}
                onChange={e => setForm({ ...form, LastName: e.target.value })}
                required />
            </div>
            <div className="col-md-6">
              <input className="form-control" placeholder="Punetori Position"
                value={form.Position}
                onChange={e => setForm({ ...form, Position: e.target.value })}
                required />
            </div>
            <div className="col-md-4">
              <select className="form-select"
                value={form.FabrikaID}
                onChange={e => setForm({ ...form, FabrikaID: e.target.value })}
                required>
                <option value="">Select Fabrika</option>
                {Fabrika.map(l => (
                  <option key={l.FabrikaID} value={l.FabrikaID}>{l.Name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2 text-end">
              <button className="btn btn-success w-100">{editing ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead className="table-light">
              <tr><th>ID</th><th>FirstName</th><th>LastName</th><th>Position</th><th>Fabrika</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {Punetoret.map(le => (
                <tr key={le.ID}>
                  <td>{le.ID}</td>
                  <td>{le.FirstName}</td>
                  <td>{le.Fabrika?.Name}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(le)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => remove(le.PunetoriID)}>Delete</button>
                  </td>
                </tr>
              ))}
              {Punetoret.length === 0 && (
                <tr><td colSpan="4" className="text-center text-muted">No Punetor found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


