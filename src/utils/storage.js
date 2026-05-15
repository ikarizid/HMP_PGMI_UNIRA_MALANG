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

// Default admin credentials
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
  getAll: () => getAll(KEYS.BERITA),
  add: (item) => addItem(KEYS.BERITA, item),
  update: (id, data) => updateItem(KEYS.BERITA, id, data),
  delete: (id) => deleteItem(KEYS.BERITA, id),
};

// --- Event ---
export const eventStore = {
  getAll: () => getAll(KEYS.EVENT),
  add: (item) => addItem(KEYS.EVENT, item),
  update: (id, data) => updateItem(KEYS.EVENT, id, data),
  delete: (id) => deleteItem(KEYS.EVENT, id),
};

// --- Galeri ---
export const galeriStore = {
  getAll: () => getAll(KEYS.GALERI),
  add: (item) => addItem(KEYS.GALERI, item),
  update: (id, data) => updateItem(KEYS.GALERI, id, data),
  delete: (id) => deleteItem(KEYS.GALERI, id),
};

// --- Struktur ---
export const strukturStore = {
  getBPH: () => getAll(KEYS.STRUKTUR_BPH),
  getDept: () => getAll(KEYS.STRUKTUR_DEPT),
  addBPH: (item) => addItem(KEYS.STRUKTUR_BPH, item),
  addDept: (item) => addItem(KEYS.STRUKTUR_DEPT, item),
  updateBPH: (id, data) => updateItem(KEYS.STRUKTUR_BPH, id, data),
  updateDept: (id, data) => updateItem(KEYS.STRUKTUR_DEPT, id, data),
  deleteBPH: (id) => deleteItem(KEYS.STRUKTUR_BPH, id),
  deleteDept: (id) => deleteItem(KEYS.STRUKTUR_DEPT, id),
};

// --- Jurnal ---
export const jurnalStore = {
  getAll: () => getAll(KEYS.JURNAL),
  add: (item) => addItem(KEYS.JURNAL, item),
  update: (id, data) => updateItem(KEYS.JURNAL, id, data),
  delete: (id) => deleteItem(KEYS.JURNAL, id),
};

// --- Settings ---
export const settingsStore = {
  get: () => {
    const d = localStorage.getItem(KEYS.SETTINGS);
    return d ? JSON.parse(d) : {};
  },
  save: (settings) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },
};

// --- Auth ---
export const authStore = {
  login: (username, password) => {
    const creds = JSON.parse(localStorage.getItem(KEYS.AUTH) || '{}');
    if (username === creds.username && password === creds.password) {
      sessionStorage.setItem('hima_logged_in', 'true');
      return true;
    }
    return false;
  },
  logout: () => {
    sessionStorage.removeItem('hima_logged_in');
  },
  isLoggedIn: () => {
    return sessionStorage.getItem('hima_logged_in') === 'true';
  },
  changePassword: (oldPass, newPass) => {
    const creds = JSON.parse(localStorage.getItem(KEYS.AUTH) || '{}');
    if (oldPass === creds.password) {
      creds.password = newPass;
      localStorage.setItem(KEYS.AUTH, JSON.stringify(creds));
      return true;
    }
    return false;
  },
  changeUsername: (newUsername) => {
    const creds = JSON.parse(localStorage.getItem(KEYS.AUTH) || '{}');
    creds.username = newUsername;
    localStorage.setItem(KEYS.AUTH, JSON.stringify(creds));
  },
};
