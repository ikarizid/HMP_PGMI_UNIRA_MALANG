import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Users, Calendar, Sparkles, ArrowRight, Trophy, ChevronRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import EventCard from '../components/EventCard';
import ArticleCard from '../components/ArticleCard';
import { eventStore, beritaStore } from '../utils/storage';
import './Homepage.css';

function useScrollAnim() {
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const els = ref.current?.querySelectorAll('.fade-up, .fade-left, .fade-right');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}



export default function Homepage() {
  const pageRef = useScrollAnim();
  const events = eventStore.getAll();
  const articles = beritaStore.getAll();
  const featuredEvents = events.filter(e => e.featured).slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  return (
    <div className="page-enter" ref={pageRef}>
      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <div className="hero__pattern" />
          <div className="hero__glow hero__glow--1" />
          <div className="hero__glow hero__glow--2" />
        </div>
        <div className="container hero__inner">
          <div className="hero__content fade-up visible">
            <span className="hero__badge">
              <Sparkles size={14} /> Himpunan Mahasiswa PGMI
            </span>
            <h1 className="hero__title">
              Bergerak untuk <span className="hero__highlight">Pendidikan</span>,
              Berinovasi untuk <span className="hero__highlight-gold">Masa Depan</span>
            </h1>
            <p className="hero__desc">
              Platform digital resmi HMP PGMI UNIRA MALANG — menjembatani informasi, akademik, dan aspirasi mahasiswa dalam satu ekosistem digital yang modern dan fungsional.
            </p>
            <div className="hero__actions">
              <Link to="/event" className="btn btn-primary btn-lg">
                <Calendar size={18} /> Daftar Lomba
              </Link>
              <Link to="/akademik" className="btn btn-secondary btn-lg">
                <BookOpen size={18} /> Baca Jurnal
              </Link>
              <Link to="/tentang" className="btn btn-gold btn-lg">
                <Users size={18} /> Kenali Kami
              </Link>
            </div>
          </div>
        </div>


      </section>

      {/* Featured Events */}
      <section className="section" id="featured-events">
        <div className="container">
          <div className="fade-up">
            <SectionTitle
              badge="📅 Event Terbaru"
              title="Program Kerja & Event"
              subtitle="Ikuti berbagai kegiatan seru dari HMP PGMI UNIRA MALANG untuk mengembangkan potensimu"
            />
          </div>
          <div className="grid-3 fade-up">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="section__cta fade-up">
            <Link to="/event" className="btn btn-secondary">
              Lihat Semua Event <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Sambutan */}
      <section className="section-alt" id="sambutan">
        <div className="container">
          <div className="sambutan fade-up">
            <div className="sambutan__text">
              <SectionTitle
                badge="👋 Sambutan Ketua"
                title="Pesan dari Ketua HMP PGMI UNIRA MALANG"
                align="left"
              />
              <blockquote className="sambutan__quote">
                "HMP PGMI UNIRA MALANG hadir sebagai wadah bagi seluruh mahasiswa PGMI untuk berkarya, berinovasi, dan berkontribusi nyata dalam dunia pendidikan dasar. Mari bersama-sama kita wujudkan generasi guru MI yang profesional, kreatif, dan berdaya saing global."
              </blockquote>
              <div className="sambutan__author">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Ketua" />
                <div>
                  <strong>Muhammad Rizky Aditya</strong>
                  <span>Ketua Umum HMP PGMI UNIRA MALANG 2025</span>
                </div>
              </div>
            </div>
            <div className="sambutan__image">
              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=450&fit=crop" alt="Kegiatan Hima" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Cards */}
      <section className="section" id="highlights">
        <div className="container">
          <div className="fade-up">
            <SectionTitle
              badge="✨ Highlights"
              title="Mengapa HMP PGMI UNIRA MALANG?"
              subtitle="Nilai-nilai unggulan yang menjadi identitas dan kekuatan organisasi kami"
            />
          </div>
          <div className="highlights__grid fade-up">
            <div className="highlight-card">
              <div className="highlight-card__icon"><Award size={28} /></div>
              <h3>Prestasi Gemilang</h3>
              <p>Mahasiswa PGMI aktif meraih prestasi di berbagai kompetisi ilmiah dan kreativitas tingkat nasional.</p>
            </div>
            <div className="highlight-card highlight-card--accent">
              <div className="highlight-card__icon"><BookOpen size={28} /></div>
              <h3>Resource Center</h3>
              <p>Bank data akademik lengkap: media pembelajaran, bank soal, referensi skripsi, dan info beasiswa.</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-card__icon"><Users size={28} /></div>
              <h3>Komunitas Solid</h3>
              <p>Jaringan alumni dan mahasiswa aktif yang saling mendukung dalam perkuliahan dan karir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="section-alt" id="latest-articles">
        <div className="container">
          <div className="fade-up">
            <SectionTitle
              badge="📰 Berita Terbaru"
              title="Media & Publikasi"
              subtitle="Ikuti berita terbaru, opini, dan tips mengajar dari komunitas PGMI"
            />
          </div>
          <div className="grid-3 fade-up">
            {latestArticles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
          <div className="section__cta fade-up">
            <Link to="/berita" className="btn btn-secondary">
              Baca Semua Artikel <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="cta-section__bg" />
        <div className="container">
          <div className="cta-section__inner fade-up">
            <h2>Siap Bergabung dengan HMP PGMI UNIRA MALANG?</h2>
            <p>Sampaikan aspirasimu, ikuti event terbaru, dan jadilah bagian dari perubahan pendidikan.</p>
            <div className="cta-section__actions">
              <Link to="/kontak" className="btn btn-primary btn-lg">
                Hubungi Kami <ArrowRight size={16} />
              </Link>
              <Link to="/event" className="btn btn-gold btn-lg">
                Lihat Event <Calendar size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
