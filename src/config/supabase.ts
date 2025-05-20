import dotenv from 'dotenv';
dotenv.config(); // ✅ Ensure env is loaded

import { createClient } from '@supabase/supabase-js';

export const supabaseIndia = createClient(
  process.env.SUPABASE_INDIA_URL!,
  process.env.SUPABASE_INDIA_SERVICE_ROLE_KEY!
);

export const supabaseGlobal = createClient(
  process.env.SUPABASE_GLOBAL_URL!,
  process.env.SUPABASE_GLOBAL_SERVICE_ROLE_KEY!
);

export function getSupabase(region: 'india' | 'global') {
  return region === 'india' ? supabaseIndia : supabaseGlobal;
}
