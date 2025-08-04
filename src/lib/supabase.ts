import { createClient } from '@supabase/supabase-js';
     import { Database } from './database.types';

     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
     const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

     console.log('Initializing Client-Side Supabase Client - Environment Check:');
     console.log('Process Env:', process.env);
     console.log('Supabase Config:', { supabaseUrl, supabaseAnonKey });

     if (!supabaseUrl || !supabaseAnonKey) {
       console.error('Client-Side Supabase Configuration Failed:', {
         supabaseUrl: supabaseUrl || 'undefined',
         supabaseAnonKey: supabaseAnonKey || 'undefined'
       });
       throw new Error('Supabase URL or Anon Key is not configured in environment variables');
     }

     export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
       auth: { autoRefreshToken: false, persistSession: false },
     });