import { createClient } from '@supabase/supabase-js';

// Получите эти значения из Supabase Dashboard → Settings → API
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Supabase credentials not found!');
  console.error('Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in environment variables');
  console.error('For Vercel: Go to Project Settings → Environment Variables');
}

// Создаем клиент только если переменные окружения установлены
// Это предотвратит ошибки при запуске без настроенных переменных
let supabaseClient: ReturnType<typeof createClient> | null = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  // Создаем заглушку, чтобы приложение не падало
  supabaseClient = createClient(
    'https://placeholder.supabase.co',
    'placeholder-key'
  );
}

export const supabase = supabaseClient;
