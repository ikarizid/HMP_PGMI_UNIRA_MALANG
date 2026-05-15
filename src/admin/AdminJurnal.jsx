import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { jurnalStore } from '../utils/storage';

const TYPES = ['Jurnal', 'E-Book', 'Referensi Skripsi', 'Modul Ajar', 'PTK', 'Beasiswa', 'Info Karir', 'Desmos', 'PowerPoint', 'Canva', 'PDF', 'Koleksi', 'Magang'];

export default function AdminJurnal() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Media Pembelajaran', type: 'Jurnal', author: '', description: '', image: '', downloadUrl: '#' });

  useEffect(() => { setItems(jurnalStore.getAll()); }, []);

  const openAdd = () => { setForm({ title: '', category: 'Media Pembelajaran', type: 'Jurnal', author: '', description: '', image: '', downloadUrl: '#' }); setModal('add'); };
  const openEdit = (item) => { setForm({ title: item.title, category: item.category, type: item.type, author: item.author, description: item.description, image: item.image, downloadUrl: item.downloadUrl || '#' }); setModal(item); };

  const handleSave = () => {
    if (modal === 'add') jurnalStore.add(form); else jurnalStore.update(modal.id, form);
    setItems(jurnalStore.getAll()); setModal(null);
  };

  const handleDelete = (id) => { if (confirm('Yakin?')) { jurnalStore.delete(id); setItems(jurnalStore.getAll()); } };

  return (
    <div>
      <div className="admin-page-header"><h1>📚 Jurnal & Materi</h1><button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Tambah</button></div>
      <table className="admin-table">
        <thead><tr><th>Img</th><th>Judul</th><th>Tipe</th><th>Kategori</th><th>Aksi</th></tr></thead>
        <tbody>{items.map(i => (
          <tr key={i.id}><td>{i.image && <img src={i.image} alt="" />}</td><td style={{fontWeight:600,color:'var(--text-primary)',maxWidth:220}}>{i.title}</td><td><span className="badge badge-gold">{i.type}</span></td><td><span className="badge badge-primary">{i.category}</span></td>
          <td><div className="admin-actions"><button className="admin-btn-edit" onClick={()=>openEdit(i)}><Pencil size={13}/></button><button className="admin-btn-delete" onClick={()=>handleDelete(i.id)}><Trash2 size={13}/></button></div></td></tr>
        ))}</tbody>
      </table>
      {modal && (
        <div className="admin-modal-overlay" onClick={()=>setModal(null)}><div className="admin-modal" onClick={e=>e.stopPropagation()}>
          <div className="admin-modal__header"><h2>{modal==='add'?'➕ Tambah':'✏️ Edit'} Materi</h2><button className="admin-modal__close" onClick={()=>setModal(null)}><X size={18}/></button></div>
          <div className="admin-modal__body">
            <div className="admin-form-group"><label>Judul</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <div className="admin-form-group"><label>Kategori</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Media Pembelajaran</option><option>Bank Soal</option><option>Beasiswa</option></select></div>
              <div className="admin-form-group"><label>Tipe</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>{TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
            </div>
            <div className="admin-form-group"><label>Penulis</label><input value={form.author} onChange={e=>setForm({...form,author:e.target.value})}/></div>
            <div className="admin-form-group"><label>Deskripsi</label><textarea rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
            <div className="admin-form-group"><label>URL Gambar</label><input value={form.image} onChange={e=>setForm({...form,image:e.target.value})}/></div>
            <div className="admin-form-group"><label>Link Download</label><input value={form.downloadUrl} onChange={e=>setForm({...form,downloadUrl:e.target.value})}/></div>
          </div>
          <div className="admin-modal__footer"><button className="btn btn-secondary btn-sm" onClick={()=>setModal(null)}>Batal</button><button className="btn btn-primary btn-sm" onClick={handleSave}>Simpan</button></div>
        </div></div>
      )}
    </div>
  );
}
