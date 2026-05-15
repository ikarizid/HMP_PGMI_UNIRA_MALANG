import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { strukturStore } from '../utils/storage';
import ImageUpload from './ImageUpload';

export default function AdminStruktur() {
  const [bph, setBph] = useState([]);
  const [dept, setDept] = useState([]);
  const [tab, setTab] = useState('bph');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', image: '', desc: '', head: '', members: 5 });

  useEffect(() => {
    const fetch = async () => {
      setBph(await strukturStore.getBPH());
      setDept(await strukturStore.getDept());
    };
    fetch();
  }, []);

  const openAdd = () => {
    setForm(tab === 'bph' ? { name: '', role: '', image: '', desc: '' } : { name: '', head: '', image: '', desc: '', members: 5 });
    setModal('add');
  };

  const openEdit = (item) => {
    setForm(tab === 'bph' ? { name: item.name, role: item.role, image: item.image, desc: item.desc } : { name: item.name, head: item.head, image: item.image, desc: item.desc, members: item.members });
    setModal(item);
  };

  const handleSave = async () => {
    if (tab === 'bph') {
      modal === 'add' ? await strukturStore.addBPH(form) : await strukturStore.updateBPH(modal.id, form);
      setBph(await strukturStore.getBPH());
    } else {
      modal === 'add' ? await strukturStore.addDept(form) : await strukturStore.updateDept(modal.id, form);
      setDept(await strukturStore.getDept());
    }
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus?')) return;
    if (tab === 'bph') { await strukturStore.deleteBPH(id); setBph(await strukturStore.getBPH()); }
    else { await strukturStore.deleteDept(id); setDept(await strukturStore.getDept()); }
  };

  const items = tab === 'bph' ? bph : dept;

  return (
    <div>
      <div className="admin-page-header">
        <h1>👥 Struktur Organisasi</h1>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Tambah Pengurus</button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button className={`event-tab ${tab === 'bph' ? 'event-tab--active' : ''}`} onClick={() => setTab('bph')}>BPH</button>
        <button className={`event-tab ${tab === 'dept' ? 'event-tab--active' : ''}`} onClick={() => setTab('dept')}>Departemen</button>
      </div>

      <table className="admin-table">
        <thead><tr><th>Foto</th><th>Nama</th><th>{tab === 'bph' ? 'Jabatan' : 'Departemen'}</th><th>Deskripsi</th><th>Aksi</th></tr></thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id || item.name}>
              <td><img src={item.image} alt="" /></td>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{tab === 'bph' ? item.name : item.head}</td>
              <td>{tab === 'bph' ? item.role : item.name}</td>
              <td style={{ maxWidth: 200, fontSize: '0.82rem' }}>{item.desc}</td>
              <td><div className="admin-actions"><button className="admin-btn-edit" onClick={() => openEdit(item)}><Pencil size={13} /></button><button className="admin-btn-delete" onClick={() => handleDelete(item.id)}><Trash2 size={13} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header"><h2>{modal === 'add' ? '➕ Tambah' : '✏️ Edit'} {tab === 'bph' ? 'Pengurus BPH' : 'Departemen'}</h2><button className="admin-modal__close" onClick={() => setModal(null)}><X size={18} /></button></div>
            <div className="admin-modal__body">
              {tab === 'bph' ? (
                <>
                  <div className="admin-form-group"><label>Nama Lengkap</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                  <div className="admin-form-group"><label>Jabatan</label><input value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="Ketua Umum, Sekretaris..." /></div>
                </>
              ) : (
                <>
                  <div className="admin-form-group"><label>Nama Departemen</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                  <div className="admin-form-group"><label>Kepala Departemen</label><input value={form.head} onChange={e => setForm({...form, head: e.target.value})} /></div>
                  <div className="admin-form-group"><label>Jumlah Anggota</label><input type="number" value={form.members} onChange={e => setForm({...form, members: parseInt(e.target.value)})} /></div>
                </>
              )}
              <ImageUpload value={form.image} onChange={(url) => setForm({...form, image: url})} label="Foto Profil" />
              <div className="admin-form-group"><label>Deskripsi Tugas</label><textarea rows={3} value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} /></div>
            </div>
            <div className="admin-modal__footer"><button className="btn btn-secondary btn-sm" onClick={() => setModal(null)}>Batal</button><button className="btn btn-primary btn-sm" onClick={handleSave}>Simpan</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
