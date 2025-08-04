import { createClient } from '@supabase/supabase-js';
     import { Database } from './database.types';

     console.log('Initializing Supabase Server Client - Environment Check:');
     console.log('Process Env:', process.env);
     const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
     const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

     console.log('Supabase Server Config:', { supabaseUrl, supabaseServiceRoleKey });

     if (!supabaseUrl || !supabaseServiceRoleKey) {
       console.error('Supabase Server Configuration Failed:', {
         supabaseUrl: supabaseUrl || 'undefined',
         supabaseServiceRoleKey: supabaseServiceRoleKey || 'undefined'
       });
       throw new Error('Supabase URL or Service Role Key is not configured in environment variables');
     }

     export const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
       auth: { autoRefreshToken: false, persistSession: false },
     });