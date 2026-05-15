import { supabase } from './supabase';

const KEYS = {
  BERITA: 'hima_berita',
  EVENT: 'hima_event',
  GALERI: 'hima_galeri',
  STRUKTUR_BPH: 'hima_struktur_bph',
  STRUKTUR_DEPT: 'hima_struktur_dept',
  JURNAL: 'hima_jurnal',
  SETTINGS: 'hima_settings',
  AUTH: 'hima_auth',
};

// Default admin credentials (fallback jika Supabase Auth belum diset)
const DEFAULT_ADMIN = { username: 'admin', password: 'pgmi2025' };

// Initialize localStorage — semua konten mulai KOSONG
export function seedData() {
  // Force reset for clean slate before Supabase migration
  const HAS_RESET = 'hima_reset_v1';
  if (!localStorage.getItem(HAS_RESET)) {
    localStorage.setItem(KEYS.BERITA, JSON.stringify([]));
    localStorage.setItem(KEYS.EVENT, JSON.stringify([]));
    localStorage.setItem(KEYS.GALERI, JSON.stringify([]));
    localStorage.setItem(KEYS.STRUKTUR_BPH, JSON.stringify([]));
    localStorage.setItem(KEYS.STRUKTUR_DEPT, JSON.stringify([]));
    localStorage.setItem(KEYS.JURNAL, JSON.stringify([]));
    localStorage.setItem(HAS_RESET, 'true');
  }

  // Settings: nilai default
  if (!localStorage.getItem(KEYS.SETTINGS)) {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify({
      heroTitle: 'Bergerak untuk Pendidikan, Berinovasi untuk Masa Depan',
      heroSubtitle: 'Platform digital resmi HMP PGMI UNIRA MALANG',
      instagram: '',
      tiktok: '',
      youtube: '',
      whatsapp: '',
      email: '',
    }));
  }
  // Auth: tetap diinisialisasi agar admin bisa login sementara
  if (!localStorage.getItem(KEYS.AUTH)) {
    localStorage.setItem(KEYS.AUTH, JSON.stringify(DEFAULT_ADMIN));
  }
}

// Generic CRUD helpers
function getAll(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveAll(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function addItem(key, item) {
  const data = getAll(key);
  item.id = Date.now();
  data.unshift(item);
  saveAll(key, data);
  return item;
}

function updateItem(key, id, updates) {
  const data = getAll(key);
  const idx = data.findIndex(i => i.id === id);
  if (idx !== -1) {
    data[idx] = { ...data[idx], ...updates };
    saveAll(key, data);
    return data[idx];
  }
  return null;
}

function deleteItem(key, id) {
  const data = getAll(key).filter(i => i.id !== id);
  saveAll(key, data);
}

// --- Berita ---
export const beritaStore = {
  getAll: async () => {
    const { data, error } = await supabase.from('berita').select('*').order('created_at', { ascending: false });
    if (!error && data) return data;
    return getAll(KEYS.BERITA); // Fallback
  },
  add: async (item) => {
    const { data, error } = await supabase.from('berita').insert([item]).select();
    if (!error && data) return data[0];
    return addItem(KEYS.BERITA, item); // Fallback
  },
  update: async (id, updates) => {
    const { data, error } = await supabase.from('berita').update(updates).eq('id', id).select();
    if (!error && data) return data[0];
    return updateItem(KEYS.BERITA, id, updates); // Fallback
  },
  delete: async (id) => {
    const { error } = await supabase.from('berita').delete().eq('id', id);
    if (error) deleteItem(KEYS.BERITA, id); // Fallback
  },
};

// --- Event ---
export const eventStore = {
  getAll: async () => {
    const { data, error } = await supabase.from('event').select('*').order('tanggal', { ascending: true });
    if (!error && data) return data;
    return getAll(KEYS.EVENT);
  },
  add: async (item) => {
    const { data, error } = await supabase.from('event').insert([item]).select();
    if (!error && data) return data[0];
    return addItem(KEYS.EVENT, item);
  },
  update: async (id, updates) => {
    const { data, error } = await supabase.from('event').update(updates).eq('id', id).select();
    if (!error && data) return data[0];
    return updateItem(KEYS.EVENT, id, updates);
  },
  delete: async (id) => {
    const { error } = await supabase.from('event').delete().eq('id', id);
    if (error) deleteItem(KEYS.EVENT, id);
  },
};

// --- Galeri ---
export const galeriStore = {
  getAll: async () => {
    const { data, error } = await supabase.from('galeri').select('*').order('tanggal', { ascending: false });
    if (!error && data) return data;
    return getAll(KEYS.GALERI);
  },
  add: async (item) => {
    const { data, error } = await supabase.from('galeri').insert([item]).select();
    if (!error && data) return data[0];
    return addItem(KEYS.GALERI, item);
  },
  update: async (id, updates) => {
    const { data, error } = await supabase.from('galeri').update(updates).eq('id', id).select();
    if (!error && data) return data[0];
    return updateItem(KEYS.GALERI, id, updates);
  },
  delete: async (id) => {
    const { error } = await supabase.from('galeri').delete().eq('id', id);
    if (error) deleteItem(KEYS.GALERI, id);
  },
};

// --- Struktur ---
export const strukturStore = {
  getBPH: async () => {
    const { data, error } = await supabase.from('struktur').select('*').eq('divisi', 'BPH').order('urutan', { ascending: true });
    if (!error && data) return data;
    return getAll(KEYS.STRUKTUR_BPH);
  },
  getDept: async () => {
    const { data, error } = await supabase.from('struktur').select('*').neq('divisi', 'BPH').order('urutan', { ascending: true });
    if (!error && data) return data;
    return getAll(KEYS.STRUKTUR_DEPT);
  },
  addBPH: async (item) => {
    const { data, error } = await supabase.from('struktur').insert([{ ...item, divisi: 'BPH' }]).select();
    if (!error && data) return data[0];
    return addItem(KEYS.STRUKTUR_BPH, item);
  },
  addDept: async (item) => {
    const { data, error } = await supabase.from('struktur').insert([item]).select();
    if (!error && data) return data[0];
    return addItem(KEYS.STRUKTUR_DEPT, item);
  },
  updateBPH: async (id, updates) => {
    const { data, error } = await supabase.from('struktur').update(updates).eq('id', id).select();
    if (!error && data) return data[0];
    return updateItem(KEYS.STRUKTUR_BPH, id, updates);
  },
  updateDept: async (id, updates) => {
    const { data, error } = await supabase.from('struktur').update(updates).eq('id', id).select();
    if (!error && data) return data[0];
    return updateItem(KEYS.STRUKTUR_DEPT, id, updates);
  },
  deleteBPH: async (id) => {
    const { error } = await supabase.from('struktur').delete().eq('id', id);
    if (error) deleteItem(KEYS.STRUKTUR_BPH, id);
  },
  deleteDept: async (id) => {
    const { error } = await supabase.from('struktur').delete().eq('id', id);
    if (error) deleteItem(KEYS.STRUKTUR_DEPT, id);
  },
};

// --- Jurnal ---
export const jurnalStore = {
  getAll: async () => {
    const { data, error } = await supabase.from('jurnal').select('*').order('created_at', { ascending: false });
    if (!error && data) return data;
    return getAll(KEYS.JURNAL);
  },
  add: async (item) => {
    const { data, error } = await supabase.from('jurnal').insert([item]).select();
    if (!error && data) return data[0];
    return addItem(KEYS.JURNAL, item);
  },
  update: async (id, updates) => {
    const { data, error } = await supabase.from('jurnal').update(updates).eq('id', id).select();
    if (!error && data) return data[0];
    return updateItem(KEYS.JURNAL, id, updates);
  },
  delete: async (id) => {
    const { error } = await supabase.from('jurnal').delete().eq('id', id);
    if (error) deleteItem(KEYS.JURNAL, id);
  },
};

// --- Settings ---
export const settingsStore = {
  get: async () => {
    const { data, error } = await supabase.from('settings').select('*').single();
    if (!error && data) return data;
    const d = localStorage.getItem(KEYS.SETTINGS);
    return d ? JSON.parse(d) : {};
  },
  save: async (settings) => {
    const { error } = await supabase.from('settings').upsert([{ id: 1, ...settings }]);
    if (error) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },
};

// --- Auth ---
export const authStore = {
  login: async (email, password) => {
    // Cobalah Supabase Auth dahulu jika sudah dikonfigurasi
    if (import.meta.env.VITE_SUPABASE_ANON_KEY && import.meta.env.VITE_SUPABASE_ANON_KEY !== 'no-key') {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data.user) {
        sessionStorage.setItem('hima_logged_in', 'true');
        sessionStorage.setItem('hima_user_id', data.user.id);
        return { success: true };
      }
    }

    // Fallback ke localStorage
    const creds = JSON.parse(localStorage.getItem(KEYS.AUTH) || '{}');
    if (email === creds.username && password === creds.password) {
      sessionStorage.setItem('hima_logged_in', 'true');
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  },
  logout: async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('hima_logged_in');
    sessionStorage.removeItem('hima_user_id');
  },
  isLoggedIn: () => {
    return sessionStorage.getItem('hima_logged_in') === 'true';
  },
  // Update pass/user via Supabase nantinya
  changePassword: async (newPass) => {
    const { error } = await supabase.auth.updateUser({ password: newPass });
    return !error;
  }
};
