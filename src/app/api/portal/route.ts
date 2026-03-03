import { NextResponse } from 'next/server';
     import { supabase } from '../../../lib/supabase-server';

     export async function GET(request: Request) {
       const cookies = request.headers.get('cookie');
       const token = cookies?.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

       if (!supabase || !token) {
         return NextResponse.json({ error: 'Supabase client not configured or no token' }, { status: 500 });
       }

       try {
         const { data, error } = await supabase
           .from('active_clients')
           .select('name, company_name, email, agents_count, stripe_customer_id')
           .eq('auth_token', token)
           .single();

         if (error || !data) {
           console.error('Portal User Fetch Error:', error);
           return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
         }

         await supabase
           .from('active_clients')
           .update({ last_login: new Date().toISOString() })
           .eq('auth_token', token);

         return NextResponse.json(data);
       } catch (error) {
         console.error('Portal error:', error);
         return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
       }
     }