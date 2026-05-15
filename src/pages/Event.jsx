import { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import EventCard from '../components/EventCard';
import { eventStore } from '../utils/storage';
import './Event.css';

const tabs = ['Semua', 'Lomba', 'Seminar', 'Workshop', 'Sosial'];

export default function Event() {
  const [active, setActive] = useState('Semua');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await eventStore.getAll();
      setEvents(data);
    };
    fetch();
  }, []);

  const filtered = active === 'Semua' ? events : events.filter(e => e.category === active);

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="hero__badge">📅 Portal Event</span>
          <h1 className="page-hero__title">Program Kerja & Event</h1>
          <p className="page-hero__desc">Pusat manajemen acara dan aktivitas HMP PGMI UNIRA MALANG. Temukan event menarik dan daftar sekarang!</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="event-tabs">
            {tabs.map(t => (
              <button key={t} className={`event-tab ${active === t ? 'event-tab--active' : ''}`} onClick={() => setActive(t)}>{t}</button>
            ))}
          </div>
          {filtered.length > 0 ? (
            <div className="grid-3">
              {filtered.map(e => <EventCard key={e.id} event={e} />)}
            </div>
          ) : (
            <div className="empty-state">
              <p>Belum ada event untuk kategori ini.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
