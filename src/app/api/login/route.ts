import { NextResponse } from 'next/server';
     import { supabase } from '../../../lib/supabase-server';
     import { v4 as uuidv4 } from 'uuid';

     export async function POST(request: Request) {
       const { email, password } = await request.json();

       if (!supabase) {
         return NextResponse.json({ error: 'Supabase client is not configured' }, { status: 500 });
       }

       if (!email || !password) {
         return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
       }

       try {
         const { data, error } = await supabase
           .from('active_clients')
           .select('password_hash, status')
           .eq('email', email)
           .eq('status', 'active')
           .single();

         if (error || !data) {
           return NextResponse.json({ error: 'Invalid email or subscription status' }, { status: 401 });
         } else if (!data.password_hash) {
           return NextResponse.json({ error: 'No password hash found for this user' }, { status: 401 });
         } else {
           const isValid = await supabase.rpc('check_password', {
             provided_password: password,
             stored_hash: data.password_hash
           }).then(result => result.data ?? false);
           if (isValid) {
             const authToken = uuidv4();
             await supabase
               .from('active_clients')
               .update({ auth_token: authToken, last_login: new Date().toISOString() })
               .eq('email', email);
             console.log('Login successful, token:', authToken); // Debug
             const response = NextResponse.json({ success: true, authToken });
             response.cookies.set('auth_token', authToken, {
               path: '/',
               secure: process.env.NODE_ENV === 'production',
               httpOnly: true,
               sameSite: 'strict',
             });
             return response;
           } else {
             return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
           }
         }
       } catch (error) {
         console.error('Login error:', error);
         return NextResponse.json({ error: 'Failed to process login' }, { status: 500 });
       }
     }