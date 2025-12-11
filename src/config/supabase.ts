import { createClient } from '@supabase/supabase-js';

// Получите эти значения из Supabase Dashboard → Settings → API
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase credentials not found. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in .env file');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
