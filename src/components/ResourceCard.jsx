import { Download, FileText } from 'lucide-react';
import './ResourceCard.css';

export default function ResourceCard({ resource }) {
  return (
    <div className="resource-card glass-card" id={`resource-${resource.id}`}>
      <div className="resource-card__image">
        <img src={resource.image} alt={resource.title} loading="lazy" />
        <span className="resource-card__type badge badge-gold">{resource.type}</span>
      </div>
      <div className="resource-card__content">
        <h3 className="resource-card__title">{resource.title}</h3>
        <p className="resource-card__author"><FileText size={13} /> {resource.author}</p>
        <p className="resource-card__desc">{resource.description}</p>
        <a href={resource.downloadUrl} className="btn btn-sm btn-secondary resource-card__btn">
          <Download size={14} /> Unduh / Lihat
        </a>
      </div>
    </div>
  );
}
