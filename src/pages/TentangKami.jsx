import { useState, useEffect, useRef } from 'react';
import { Target, Eye, ChevronRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { strukturStore } from '../utils/storage';
import { visi, misi, sejarah } from '../data/team';
import './TentangKami.css';

export default function TentangKami() {
  const ref = useRef();
  const [bph, setBph] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const [bData, dData] = await Promise.all([strukturStore.getBPH(), strukturStore.getDept()]);
      setBph(bData);
      setDepartments(dData);
    };
    fetch();

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-enter tentang" ref={ref}>
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="hero__badge">🏛️ Tentang Kami</span>
          <h1 className="page-hero__title">Profil Himpunan</h1>
          <p className="page-hero__desc">Mengenal lebih dekat Himpunan Mahasiswa PGMI — visi, misi, dan struktur organisasi.</p>
        </div>
      </div>

      {/* Visi Misi */}
      <section className="section" id="visi-misi">
        <div className="container">
          <div className="fade-up">
            <SectionTitle badge="🎯 Visi & Misi" title="Arah Gerak Organisasi" />
          </div>
          <div className="vm-grid fade-up">
            <div className="vm-card vm-card--visi glass-card">
              <div className="vm-card__icon"><Eye size={28} /></div>
              <h3>Visi</h3>
              <p>{visi}</p>
            </div>
            <div className="vm-card vm-card--misi glass-card">
              <div className="vm-card__icon"><Target size={28} /></div>
              <h3>Misi</h3>
              <ul>
                {misi.map((m, i) => (
                  <li key={i}><ChevronRight size={14} /> {m}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah */}
      <section className="section-alt" id="sejarah">
        <div className="container">
          <div className="fade-up">
            <SectionTitle badge="📜 Sejarah" title="Perjalanan HMP PGMI UNIRA MALANG" subtitle="Milestone penting dalam sejarah organisasi kami" />
          </div>
          <div className="timeline fade-up">
            {sejarah.map((s, i) => (
              <div className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`} key={i}>
                <div className="timeline__dot" />
                <div className="timeline__card glass-card">
                  <span className="timeline__year">{s.year}</span>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
            <div className="timeline__line" />
          </div>
        </div>
      </section>

      {/* BPH */}
      <section className="section" id="struktur">
        <div className="container">
          <div className="fade-up">
            <SectionTitle badge="👥 Kepengurusan" title="Badan Pengurus Harian" subtitle="Pengurus inti HMP PGMI UNIRA MALANG periode 2025" />
          </div>
          <div className="grid-4 fade-up">
            {bph.map((p, i) => (
              <div className="person-card glass-card" key={i}>
                <div className="person-card__img">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <div className="person-card__info">
                  <h4>{p.name}</h4>
                  <span className="badge badge-primary">{p.role}</span>
                  <p>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departemen */}
      <section className="section-alt" id="departemen">
        <div className="container">
          <div className="fade-up">
            <SectionTitle badge="🏢 Departemen" title="Divisi & Departemen" subtitle="Unit kerja yang menggerakkan program HMP PGMI UNIRA MALANG" />
          </div>
          <div className="grid-2 fade-up">
            {departments.map((d, i) => (
              <div className="dept-card glass-card" key={i}>
                <img src={d.image} alt={d.head} className="dept-card__img" />
                <div className="dept-card__info">
                  <h4>{d.name}</h4>
                  <span className="dept-card__head">Kepala: {d.head}</span>
                  <p>{d.description}</p>
                  <span className="badge badge-gold">{d.members} anggota</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
