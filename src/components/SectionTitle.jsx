import './SectionTitle.css';

export default function SectionTitle({ badge, title, subtitle, align = 'center' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      {badge && <span className="section-title__badge">{badge}</span>}
      <h2 className="section-title__heading">{title}</h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </div>
  );
}
