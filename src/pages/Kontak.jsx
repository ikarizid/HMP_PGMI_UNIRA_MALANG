import { useState } from 'react';
import { Send, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import './Kontak.css';

const socials = [
  { icon: Instagram, label: 'Instagram', value: '@hima_pgmi', href: '#', color: '#E1306C' },
  { icon: Youtube, label: 'YouTube', value: 'HMP PGMI UNIRA MALANG Official', href: '#', color: '#FF0000' },
  { icon: MessageCircle, label: 'WhatsApp', value: '0812-XXXX-XXXX', href: '#', color: '#25D366' },
  { icon: Mail, label: 'Email', value: 'hima@pgmi.ac.id', href: '#', color: '#4285F4' },
];

export default function Kontak() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="hero__badge">📣 Kontak</span>
          <h1 className="page-hero__title">Hubungi Kami</h1>
          <p className="page-hero__desc">Sampaikan aspirasi, pertanyaan, atau masukanmu kepada HMP PGMI UNIRA MALANG.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="kontak-grid">
            <div className="kontak-form-wrapper">
              <div className="glass-card kontak-form-card">
                <h2><MessageCircle size={22} /> Formulir Aspirasi</h2>
                <p>Sampaikan keluhan, masukan, atau ide kreatifmu untuk kemajuan HMP PGMI UNIRA MALANG.</p>
                {submitted && (
                  <div className="kontak-success">
                    ✅ Pesan berhasil dikirim! Terima kasih atas aspirasimu.
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Nama Lengkap</label>
                    <input type="text" id="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Masukkan nama lengkap" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="contoh@email.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subjek</label>
                    <input type="text" id="subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required placeholder="Tentang apa?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Pesan</label>
                    <textarea id="message" rows="5" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required placeholder="Tulis pesanmu di sini..." />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    <Send size={16} /> Kirim Aspirasi
                  </button>
                </form>
              </div>
            </div>

            <div className="kontak-sidebar">
              <div className="glass-card kontak-info-card">
                <h3><MapPin size={18} /> Lokasi</h3>
                <p>Kampus PGMI, Gedung Fakultas Tarbiyah, Lantai 2</p>
                <div className="kontak-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sid!2sid!4v1234567890"
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: '12px' }}
                    loading="lazy"
                    title="Lokasi Kampus"
                  />
                </div>
              </div>

              <div className="glass-card kontak-info-card">
                <h3>Media Sosial</h3>
                <div className="kontak-socials">
                  {socials.map((s, i) => (
                    <a href={s.href} key={i} className="kontak-social-item">
                      <div className="kontak-social-icon" style={{ background: `${s.color}20`, color: s.color }}>
                        <s.icon size={20} />
                      </div>
                      <div>
                        <strong>{s.label}</strong>
                        <span>{s.value}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
