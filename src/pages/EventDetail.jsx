import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Phone, CheckCircle, Circle, ArrowLeft, Download, Users } from 'lucide-react';
import { eventStore } from '../utils/storage';
import './EventDetail.css';

export default function EventDetail() {
  const { slug } = useParams();
  const events = eventStore.getAll();
  const event = events.find(e => e.slug === slug);

  if (!event) {
    return (
      <div className="page-enter">
        <div className="page-hero"><div className="page-hero__bg" />
          <div className="container"><h1 className="page-hero__title">Event tidak ditemukan</h1></div>
        </div>
        <div className="section container">
          <Link to="/event" className="btn btn-secondary"><ArrowLeft size={16} /> Kembali</Link>
        </div>
      </div>
    );
  }

  const statusClass = { 'Segera': 'badge-gold', 'Berlangsung': 'badge-success', 'Selesai': 'badge-primary' }[event.status] || 'badge-primary';

  return (
    <div className="page-enter">
      <div className="event-detail-hero">
        <img src={event.image} alt={event.title} className="event-detail-hero__bg" />
        <div className="event-detail-hero__overlay" />
        <div className="container event-detail-hero__inner">
          <Link to="/event" className="btn btn-sm btn-secondary event-detail__back"><ArrowLeft size={14} /> Semua Event</Link>
          <div className="event-detail-hero__badges">
            <span className={`badge ${statusClass}`}>{event.status}</span>
            <span className="badge badge-primary">{event.category}</span>
          </div>
          <h1>{event.title}</h1>
          <div className="event-detail-hero__meta">
            <span><Calendar size={16} /> {event.date}</span>
            <span><MapPin size={16} /> {event.location}</span>
            <span><Phone size={16} /> {event.contact}</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="event-detail-grid">
            <div className="event-detail-main">
              <div className="glass-card event-detail-section">
                <h2>Tentang Event</h2>
                <p>{event.description}</p>
              </div>

              {event.competitions.length > 0 && (
                <div className="glass-card event-detail-section">
                  <h2>Cabang Lomba</h2>
                  <div className="competition-list">
                    {event.competitions.map((c, i) => (
                      <div className="competition-item" key={i}>
                        <Users size={16} /> {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass-card event-detail-section">
                <h2>Formulir Pendaftaran</h2>
                <p>Klik tombol di bawah untuk mendaftar event ini.</p>
                <button className="btn btn-primary btn-lg" style={{ marginTop: '1rem' }}>Daftar Sekarang</button>
              </div>
            </div>

            <div className="event-detail-sidebar">
              <div className="glass-card event-detail-section">
                <h3>Timeline</h3>
                <div className="event-timeline">
                  {event.timeline.map((t, i) => (
                    <div className={`event-tl-item ${t.done ? 'event-tl-item--done' : ''}`} key={i}>
                      {t.done ? <CheckCircle size={18} /> : <Circle size={18} />}
                      <div>
                        <strong>{t.phase}</strong>
                        <span>{t.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card event-detail-section">
                <h3>Download</h3>
                <a href="#" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  <Download size={14} /> Unduh Juknis (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
