import { useState, useEffect } from 'react';
import { Newspaper, Calendar, Image, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { beritaStore, eventStore, galeriStore, strukturStore, jurnalStore } from '../utils/storage';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ berita: 0, event: 0, galeri: 0, pengurus: 0, jurnal: 0 });
  const [recentBerita, setRecentBerita] = useState([]);
  const [recentEvent, setRecentEvent] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const [berita, event, galeri, bph, dept, jurnal] = await Promise.all([
        beritaStore.getAll(),
        eventStore.getAll(),
        galeriStore.getAll(),
        strukturStore.getBPH(),
        strukturStore.getDept(),
        jurnalStore.getAll()
      ]);
      setCounts({
        berita: berita.length,
        event: event.length,
        galeri: galeri.length,
        pengurus: bph.length + dept.length,
        jurnal: jurnal.length
      });
      setRecentBerita(berita.slice(0, 3));
      setRecentEvent(event.slice(0, 3));
    };
    fetch();
  }, []);

  const stats = [
    { icon: Newspaper, label: 'Berita', value: counts.berita, color: '#3498DB', bg: 'rgba(52,152,219,0.08)', link: '/admin/berita' },
    { icon: Calendar, label: 'Event', value: counts.event, color: '#E89B1C', bg: 'rgba(232,155,28,0.08)', link: '/admin/event' },
    { icon: Image, label: 'Galeri', value: counts.galeri, color: '#9B59B6', bg: 'rgba(155,89,182,0.08)', link: '/admin/galeri' },
    { icon: Users, label: 'Pengurus', value: counts.pengurus, color: '#0D7C66', bg: 'rgba(13,124,102,0.08)', link: '/admin/struktur' },
    { icon: BookOpen, label: 'Jurnal', value: counts.jurnal, color: '#E74C3C', bg: 'rgba(231,76,60,0.08)', link: '/admin/jurnal' },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <h1>📊 Dashboard</h1>
      </div>

      <div className="admin-stats">
        {stats.map((s, i) => (
          <Link to={s.link} key={i} className="admin-stat-card" style={{ textDecoration: 'none' }}>
            <div className="admin-stat-card__icon" style={{ background: s.bg, color: s.color }}>
              <s.icon size={22} />
            </div>
            <div>
              <div className="admin-stat-card__value">{s.value}</div>
              <div className="admin-stat-card__label">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>📰 Berita Terbaru</h3>
            <Link to="/admin/berita" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Semua <ArrowRight size={14} />
            </Link>
          </div>
          {recentBerita.map((b) => (
            <div key={b.id} style={{ padding: '0.6rem 0', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {b.image && <img src={b.image} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{b.title || b.judul}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{b.date || b.tanggal}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>📅 Event Terbaru</h3>
            <Link to="/admin/event" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Semua <ArrowRight size={14} />
            </Link>
          </div>
          {recentEvent.map((e) => (
            <div key={e.id} style={{ padding: '0.6rem 0', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{e.title || e.nama}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{e.date || e.tanggal}</div>
              </div>
              <span className={`badge ${e.status === 'Selesai' ? 'badge-primary' : e.status === 'Berlangsung' ? 'badge-success' : 'badge-gold'}`}>{e.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
