import { createClient } from '@supabase/supabase-js';

// Получите эти значения из Supabase Dashboard → Settings → API
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Supabase credentials not found!');
  console.error('Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in environment variables');
  console.error('For Vercel: Go to Project Settings → Environment Variables');
}

// Создаем клиент даже с пустыми значениями, чтобы приложение не падало
// Но запросы будут возвращать ошибки до настройки переменных окружения
export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder-key'
);
