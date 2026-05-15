import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { eventStore } from '../utils/storage';
import ImageUpload from './ImageUpload';

export default function AdminEvent() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Lomba', date: '', location: '', status: 'Segera', description: '', image: '', contact: '', slug: '' });

  useEffect(() => {
    const fetch = async () => { setItems(await eventStore.getAll()); };
    fetch();
  }, []);

  const openAdd = () => {
    setForm({ title: '', category: 'Lomba', date: '', location: '', status: 'Segera', description: '', image: '', contact: '' });
    setModal('add');
  };

  const openEdit = (item) => {
    setForm({ title: item.title || '', category: item.category || '', date: item.date || '', location: item.location || '', status: item.status || '', description: item.description || '', image: item.image || '', contact: item.contact || '' });
    setModal(item);
  };

  const handleSave = async () => {
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (modal === 'add') {
      await eventStore.add({ ...form, slug, featured: false, timeline: [], competitions: [] });
    } else {
      await eventStore.update(modal.id, { ...form, slug });
    }
    setItems(await eventStore.getAll());
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin hapus event ini?')) {
      await eventStore.delete(id);
      setItems(await eventStore.getAll());
    }
  };

  const statusColor = { Segera: 'badge-gold', Berlangsung: 'badge-success', Selesai: 'badge-primary' };

  return (
    <div>
      <div className="admin-page-header">
        <h1>📅 Event & Kegiatan</h1>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Tambah Event</button>
      </div>
      <table className="admin-table">
        <thead><tr><th>Poster</th><th>Nama Event</th><th>Kategori</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.image && <img src={item.image} alt="" />}</td>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</td>
              <td><span className="badge badge-primary">{item.category}</span></td>
              <td>{item.date}</td>
              <td><span className={`badge ${statusColor[item.status] || 'badge-primary'}`}>{item.status}</span></td>
              <td><div className="admin-actions"><button className="admin-btn-edit" onClick={() => openEdit(item)}><Pencil size={13} /></button><button className="admin-btn-delete" onClick={() => handleDelete(item.id)}><Trash2 size={13} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header"><h2>{modal === 'add' ? '➕ Tambah Event' : '✏️ Edit Event'}</h2><button className="admin-modal__close" onClick={() => setModal(null)}><X size={18} /></button></div>
            <div className="admin-modal__body">
              <div className="admin-form-group"><label>Nama Event</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group"><label>Kategori</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})}><option>Lomba</option><option>Seminar</option><option>Workshop</option><option>Sosial</option></select></div>
                <div className="admin-form-group"><label>Status</label><select value={form.status} onChange={e => setForm({...form, status: e.target.value})}><option>Segera</option><option>Berlangsung</option><option>Selesai</option></select></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group"><label>Tanggal</label><input value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="15-17 Juni 2025" /></div>
                <div className="admin-form-group"><label>Lokasi</label><input value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
              </div>
              <div className="admin-form-group"><label>Deskripsi</label><textarea rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <ImageUpload value={form.image} onChange={(url) => setForm({...form, image: url})} label="Poster Event" />
              <div className="admin-form-group"><label>Kontak</label><input value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} /></div>
            </div>
            <div className="admin-modal__footer"><button className="btn btn-secondary btn-sm" onClick={() => setModal(null)}>Batal</button><button className="btn btn-primary btn-sm" onClick={handleSave}>Simpan</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
