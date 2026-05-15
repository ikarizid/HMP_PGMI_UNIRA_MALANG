import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import { beritaStore } from '../utils/storage';
import './BeritaDetail.css';

export default function BeritaDetail() {
  const { slug } = useParams();
  const articles = beritaStore.getAll();
  const article = articles.find(a => a.slug === slug);
  const related = articles.filter(a => a.slug !== slug).slice(0, 2);

  if (!article) {
    return (
      <div className="page-enter">
        <div className="page-hero"><div className="page-hero__bg" />
          <div className="container"><h1 className="page-hero__title">Artikel tidak ditemukan</h1></div>
        </div>
        <div className="section container">
          <Link to="/berita" className="btn btn-secondary"><ArrowLeft size={16} /> Kembali</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div className="event-detail-hero">
        <img src={article.image} alt={article.title} className="event-detail-hero__bg" />
        <div className="event-detail-hero__overlay" />
        <div className="container event-detail-hero__inner">
          <Link to="/berita" className="btn btn-sm btn-secondary event-detail__back"><ArrowLeft size={14} /> Semua Berita</Link>
          <span className="badge badge-primary">{article.category}</span>
          <h1 style={{ marginTop: '0.5rem' }}>{article.title}</h1>
          <div className="event-detail-hero__meta">
            <span><User size={16} /> {article.author}</span>
            <span><Calendar size={16} /> {article.date}</span>
            <span><Clock size={16} /> {article.readTime}</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="berita-detail-grid">
            <article className="berita-content glass-card">
              {article.content.split('\n\n').map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </article>
            <aside className="berita-sidebar">
              <div className="glass-card berita-sidebar__section">
                <h3>Artikel Terkait</h3>
                {related.map(r => (
                  <Link to={`/berita/${r.slug}`} key={r.id} className="berita-related">
                    <img src={r.image} alt={r.title} />
                    <div>
                      <strong>{r.title}</strong>
                      <span>{r.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
