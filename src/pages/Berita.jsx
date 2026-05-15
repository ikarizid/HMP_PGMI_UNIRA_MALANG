import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { beritaStore } from '../utils/storage';
import './Berita.css';

export default function Berita() {
  const [active, setActive] = useState('Semua');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await beritaStore.getAll();
      setArticles(data);
    };
    fetch();
  }, []);

  const categories = ['Semua', ...new Set(articles.map(a => a.category).filter(Boolean))];
  const filtered = active === 'Semua' ? articles : articles.filter(a => a.category === active);

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="hero__badge">📰 Media & Publikasi</span>
          <h1 className="page-hero__title">Berita & Artikel</h1>
          <p className="page-hero__desc">Liputan kegiatan, opini mahasiswa, dan tips mengajar dari komunitas PGMI.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="event-tabs" style={{ marginBottom: '2rem' }}>
            {categories.map(c => (
              <button key={c} className={`event-tab ${active === c ? 'event-tab--active' : ''}`} onClick={() => setActive(c)}>{c}</button>
            ))}
          </div>
          <div className="grid-3">
            {filtered.map((a, i) => (
              <ArticleCard key={a.id} article={a} featured={i === 0 && active === 'Semua'} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
