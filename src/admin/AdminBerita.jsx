import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { beritaStore } from '../utils/storage';
import ImageUpload from './ImageUpload';

export default function AdminBerita() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null); // null | 'add' | item
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'Liputan', author: '', date: '', image: '', readTime: '3 min' });

  useEffect(() => {
    const fetch = async () => { setItems(await beritaStore.getAll()); };
    fetch();
  }, []);

  const openAdd = () => {
    setForm({ title: '', excerpt: '', content: '', category: 'Liputan', author: '', date: new Date().toISOString().split('T')[0], image: '', readTime: '3 min' });
    setModal('add');
  };

  const openEdit = (item) => {
    setForm({ title: item.title || '', excerpt: item.excerpt || '', content: item.content || '', category: item.category || '', author: item.author || '', date: item.date || '', image: item.image || '', readTime: item.readTime || '3 min' });
    setModal(item);
  };

  const handleSave = async () => {
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (modal === 'add') {
      await beritaStore.add({ ...form, slug, featured: false });
    } else {
      await beritaStore.update(modal.id, { ...form, slug });
    }
    setItems(await beritaStore.getAll());
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin hapus berita ini?')) {
      await beritaStore.delete(id);
      setItems(await beritaStore.getAll());
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>📰 Berita & Artikel</h1>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Tulis Berita</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr><th>Foto</th><th>Judul</th><th>Kategori</th><th>Penulis</th><th>Tanggal</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.image && <img src={item.image} alt="" />}</td>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)', maxWidth: 250 }}>{item.title}</td>
              <td><span className="badge badge-primary">{item.category}</span></td>
              <td>{item.author}</td>
              <td>{item.date}</td>
              <td>
                <div className="admin-actions">
                  <button className="admin-btn-edit" onClick={() => openEdit(item)}><Pencil size={13} /></button>
                  <button className="admin-btn-delete" onClick={() => handleDelete(item.id)}><Trash2 size={13} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2>{modal === 'add' ? '➕ Tulis Berita Baru' : '✏️ Edit Berita'}</h2>
              <button className="admin-modal__close" onClick={() => setModal(null)}><X size={18} /></button>
            </div>
            <div className="admin-modal__body">
              <div className="admin-form-group"><label>Judul Berita</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Masukkan judul" /></div>
              <div className="admin-form-group"><label>Ringkasan</label><input value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} placeholder="Ringkasan singkat" /></div>
              <div className="admin-form-group"><label>Isi Berita</label><textarea rows={6} value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Tulis konten berita..." /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label>Kategori</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option>Liputan</option><option>Opini</option><option>Tips</option><option>Akademik</option>
                  </select>
                </div>
                <div className="admin-form-group"><label>Penulis</label><input value={form.author} onChange={e => setForm({...form, author: e.target.value})} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group"><label>Tanggal</label><input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
                <div className="admin-form-group"><label>Waktu Baca</label><input value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})} /></div>
              </div>
              <ImageUpload value={form.image} onChange={(url) => setForm({...form, image: url})} label="Foto Sampul" />
            </div>
            <div className="admin-modal__footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setModal(null)}>Batal</button>
              <button className="btn btn-primary btn-sm" onClick={handleSave}>{modal === 'add' ? 'Publikasikan' : 'Simpan Perubahan'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
