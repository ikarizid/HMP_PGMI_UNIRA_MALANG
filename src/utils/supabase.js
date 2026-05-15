import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Cek apakah env terdeteksi
const isConfigured = supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey;

if (!isConfigured) {
  console.warn('⚠️ Supabase URL/Key tidak ditemukan. Aplikasi akan berjalan menggunakan LocalStorage (Offline Mode).');
}

export const supabase = createClient(
  isConfigured ? supabaseUrl : 'https://nosfgrciwqadkqopufoe.supabase.co', // Gunakan URL Anda sebagai default jika di localhost tanpa env
  isConfigured ? supabaseAnonKey : 'no-key'
);
