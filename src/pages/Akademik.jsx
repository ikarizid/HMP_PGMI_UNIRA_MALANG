import { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import ResourceCard from '../components/ResourceCard';
import { jurnalStore } from '../utils/storage';
import './Akademik.css';

export default function Akademik() {
  const [active, setActive] = useState('Semua');
  const [search, setSearch] = useState('');
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await jurnalStore.getAll();
      setResources(data);
    };
    fetch();
  }, []);

  const resourceCategories = ['Semua', ...new Set(resources.map(r => r.category).filter(Boolean))];
  const filtered = resources.filter(r => {
    const matchCat = active === 'Semua' || r.category === active;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="hero__badge">📚 Pojok Akademik</span>
          <h1 className="page-hero__title">Pojok Akademik & Bank Data</h1>
          <p className="page-hero__desc">Resource center mahasiswa PGMI — media pembelajaran, bank soal, referensi, dan info beasiswa.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="akademik-controls">
            <div className="event-tabs">
              {resourceCategories.map(c => (
                <button key={c} className={`event-tab ${active === c ? 'event-tab--active' : ''}`} onClick={() => setActive(c)}>{c}</button>
              ))}
            </div>
            <input
              type="text"
              className="akademik-search"
              placeholder="🔍 Cari materi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="search-resources"
            />
          </div>
          {filtered.length > 0 ? (
            <div className="grid-3">
              {filtered.map(r => <ResourceCard key={r.id} resource={r} />)}
            </div>
          ) : (
            <div className="empty-state"><p>Tidak ada materi yang ditemukan.</p></div>
          )}
        </div>
      </section>
    </div>
  );
}
