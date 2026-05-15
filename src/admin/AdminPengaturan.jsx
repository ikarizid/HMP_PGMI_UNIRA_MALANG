import { useState, useEffect } from 'react';
import { Save, Shield } from 'lucide-react';
import { settingsStore, authStore } from '../utils/storage';

export default function AdminPengaturan() {
  const [settings, setSettings] = useState({});
  const [saved, setSaved] = useState(false);
  const [passForm, setPassForm] = useState({ old: '', new1: '', new2: '' });
  const [passMsg, setPassMsg] = useState('');

  useEffect(() => {
    const fetch = async () => { setSettings(await settingsStore.get()); };
    fetch();
  }, []);

  const handleSaveSettings = async () => {
    await settingsStore.save(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePass = async () => {
    setPassMsg('');
    if (passForm.new1 !== passForm.new2) { setPassMsg('❌ Password baru tidak cocok!'); return; }
    if (passForm.new1.length < 6) { setPassMsg('❌ Password minimal 6 karakter (syarat Supabase)!'); return; }
    
    const success = await authStore.changePassword(passForm.new1);
    if (success) {
      setPassMsg('✅ Password berhasil diubah!');
      setPassForm({ old: '', new1: '', new2: '' });
    } else {
      setPassMsg('❌ Gagal mengubah password. Pastikan Anda sudah login via Supabase.');
    }
  };

  return (
    <div>
      <div className="admin-page-header"><h1>⚙️ Pengaturan</h1></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: '#FFF', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>🌐 Informasi Website</h3>
          <div className="admin-form-group"><label>Teks Hero Banner</label><input value={settings.heroTitle || ''} onChange={e => setSettings({...settings, heroTitle: e.target.value})} /></div>
          <div className="admin-form-group"><label>Subtitle Hero</label><input value={settings.heroSubtitle || ''} onChange={e => setSettings({...settings, heroSubtitle: e.target.value})} /></div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.5rem 0 1rem' }}>📱 Media Sosial</h3>
          <div className="admin-form-group"><label>Instagram</label><input value={settings.instagram || ''} onChange={e => setSettings({...settings, instagram: e.target.value})} /></div>
          <div className="admin-form-group"><label>TikTok</label><input value={settings.tiktok || ''} onChange={e => setSettings({...settings, tiktok: e.target.value})} /></div>
          <div className="admin-form-group"><label>YouTube</label><input value={settings.youtube || ''} onChange={e => setSettings({...settings, youtube: e.target.value})} /></div>
          <div className="admin-form-group"><label>WhatsApp</label><input value={settings.whatsapp || ''} onChange={e => setSettings({...settings, whatsapp: e.target.value})} /></div>
          <div className="admin-form-group"><label>Email</label><input value={settings.email || ''} onChange={e => setSettings({...settings, email: e.target.value})} /></div>
          <button className="btn btn-primary" onClick={handleSaveSettings}><Save size={16} /> Simpan Perubahan</button>
          {saved && <span style={{ marginLeft: '1rem', color: '#27AE60', fontWeight: 600, fontSize: '0.85rem' }}>✅ Tersimpan!</span>}
        </div>

        <div style={{ background: '#FFF', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', alignSelf: 'start' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={18} /> Keamanan Akun</h3>
          {passMsg && <div style={{ padding: '0.6rem 1rem', borderRadius: 8, background: passMsg.includes('✅') ? 'rgba(39,174,96,0.08)' : 'rgba(231,76,60,0.08)', color: passMsg.includes('✅') ? '#27AE60' : '#E74C3C', fontSize: '0.85rem', marginBottom: '1rem' }}>{passMsg}</div>}
          <div className="admin-form-group"><label>Password Lama</label><input type="password" value={passForm.old} onChange={e => setPassForm({...passForm, old: e.target.value})} /></div>
          <div className="admin-form-group"><label>Password Baru</label><input type="password" value={passForm.new1} onChange={e => setPassForm({...passForm, new1: e.target.value})} /></div>
          <div className="admin-form-group"><label>Konfirmasi Password Baru</label><input type="password" value={passForm.new2} onChange={e => setPassForm({...passForm, new2: e.target.value})} /></div>
          <button className="btn btn-primary" onClick={handleChangePass}><Save size={16} /> Ganti Password</button>
        </div>
      </div>
    </div>
  );
}
