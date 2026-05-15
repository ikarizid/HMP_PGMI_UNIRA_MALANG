import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import './EventCard.css';

export default function EventCard({ event }) {
  const statusClass = {
    'Segera': 'badge-gold',
    'Berlangsung': 'badge-success',
    'Selesai': 'badge-primary',
  }[event.status] || 'badge-primary';

  return (
    <Link to={`/event/${event.slug}`} className="event-card glass-card" id={`event-${event.id}`}>
      <div className="event-card__image">
        <img src={event.image} alt={event.title} loading="lazy" />
        <span className={`event-card__status badge ${statusClass}`}>{event.status}</span>
        <span className="event-card__category badge badge-primary">{event.category}</span>
      </div>
      <div className="event-card__content">
        <h3 className="event-card__title">{event.title}</h3>
        <div className="event-card__meta">
          <span><Calendar size={14} /> {event.date}</span>
          <span><MapPin size={14} /> {event.location}</span>
        </div>
        <p className="event-card__desc">{event.description.substring(0, 100)}...</p>
        <span className="event-card__link">
          Selengkapnya <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
