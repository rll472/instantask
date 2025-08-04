import { NextResponse } from 'next/server';
     import { supabase } from '../../../../lib/supabase-server';

     export async function POST(request: Request) {
       const { auth_token } = await request.json();
       console.log('Unsubscribe Request - Token:', auth_token); // Debug

       if (!supabase) {
         console.error('Supabase client not configured in unsubscribe');
         return NextResponse.json({ error: 'Supabase client not configured' }, { status: 500 });
       }

       if (!auth_token) {
         console.error('No auth token provided in unsubscribe request');
         return NextResponse.json({ error: 'No token provided' }, { status: 400 });
       }

       try {
         const { error } = await supabase
           .from('active_clients')
           .update({ status: 'cancelled' })
           .eq('auth_token', auth_token);

         if (error) {
           console.error('Unsubscribe Error:', error);
           return NextResponse.json({ error: error.message }, { status: 500 });
         }

         return NextResponse.json({ message: 'Subscription cancelled successfully' });
       } catch (error) {
         console.error('Unsubscribe error:', error);
         return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
       }
     }