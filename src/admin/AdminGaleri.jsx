import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { galeriStore } from '../utils/storage';
import ImageUpload from './ImageUpload';

export default function AdminGaleri() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ judul: '', kategori: 'Kegiatan', foto_url: '', tanggal: '', deskripsi: '' });

  useEffect(() => { setItems(galeriStore.getAll()); }, []);

  const openAdd = () => {
    setForm({ judul: '', kategori: 'Kegiatan', foto_url: '', tanggal: new Date().toISOString().split('T')[0], deskripsi: '' });
    setModal('add');
  };

  const openEdit = (item) => {
    setForm({ judul: item.judul || '', kategori: item.kategori || 'Kegiatan', foto_url: item.foto_url || '', tanggal: item.tanggal || '', deskripsi: item.deskripsi || '' });
    setModal(item);
  };

  const handleSave = () => {
    if (modal === 'add') {
      galeriStore.add({ ...form });
    } else {
      galeriStore.update(modal.id, { ...form });
    }
    setItems(galeriStore.getAll());
    setModal(null);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin hapus foto ini?')) {
      galeriStore.delete(id);
      setItems(galeriStore.getAll());
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>🖼️ Galeri Foto & Narasi Kegiatan</h1>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={16} /> Tambah Foto
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {items.map(item => (
          <div key={item.id} style={{ background: '#FFF', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <div style={{ height: 150, overflow: 'hidden' }}>
              <img src={item.foto_url} alt={item.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '0.75rem' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>{item.judul}</div>
              {item.deskripsi && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.deskripsi}</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span className="badge badge-primary">{item.kategori}</span>
                <div className="admin-actions">
                  <button className="admin-btn-edit" onClick={() => openEdit(item)}><Pencil size={13} /></button>
                  <button className="admin-btn-delete" onClick={() => handleDelete(item.id)}><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header"><h2>{modal === 'add' ? '➕ Tambah Foto' : '✏️ Edit Foto'}</h2><button className="admin-modal__close" onClick={() => setModal(null)}><X size={18} /></button></div>
            <div className="admin-modal__body">
              <div className="admin-form-group"><label>Judul Kegiatan</label><input value={form.judul} onChange={e => setForm({...form, judul: e.target.value})} placeholder="Contoh: Ospek 2025" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group"><label>Kategori</label><select value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})}><option>Kegiatan</option><option>Seminar</option><option>Lomba</option><option>Workshop</option><option>Sosial</option><option>Akademik</option><option>Festival</option><option>Organisasi</option></select></div>
                <div className="admin-form-group"><label>Tanggal</label><input type="date" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} /></div>
              </div>
              <div className="admin-form-group"><label>Narasi / Deskripsi Singkat</label><textarea rows={3} value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})} placeholder="Ceritakan sedikit tentang kegiatan ini..." /></div>
              <ImageUpload value={form.foto_url} onChange={(url) => setForm({...form, foto_url: url})} label="Foto Kegiatan" />
            </div>
            <div className="admin-modal__footer"><button className="btn btn-secondary btn-sm" onClick={() => setModal(null)}>Batal</button><button className="btn btn-primary btn-sm" onClick={handleSave}>Simpan</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
