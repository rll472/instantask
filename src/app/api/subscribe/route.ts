import { NextResponse } from 'next/server';
     import { supabase } from '@/lib/supabase-server'; // Updated import
     import Stripe from 'stripe';
     import { v4 as uuidv4 } from 'uuid';

     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2025-05-28.basil' });

     export async function POST(request: Request) {
       const { name, companyName, address, phone, email, password } = await request.json();

       if (!supabase) {
         return NextResponse.json({ error: 'Supabase client not configured' }, { status: 500 });
       }

       if (!name || !companyName || !address || !phone || !email || !password) {
         return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
       }

       try {
         const { data: hash, error: hashError } = await supabase.rpc('hash_password', { input_password: password });
         if (hashError) throw hashError;

         const authToken = uuidv4();
         const { error: dbError } = await supabase
           .from('active_clients')
           .insert([{ 
             name, 
             company_name: companyName, 
             address, 
             phone, 
             email, 
             auth_token: authToken,
             password_hash: hash as string
           }]);

         if (dbError) {
           console.error('Supabase insert error:', dbError);
           return NextResponse.json({ error: 'Failed to save client data' }, { status: 500 });
         }

         const customer = await stripe.customers.create({
           name,
           email,
           address: {
             line1: address.split(',')[0],
             city: address.split(',')[1]?.trim() || '',
             country: 'US',
             postal_code: address.split(',')[2]?.trim() || '',
           },
           phone,
         });

         await supabase
           .from('active_clients')
           .update({ stripe_customer_id: customer.id })
           .eq('email', email);

         const session = await stripe.checkout.sessions.create({
           payment_method_types: ['card'],
           line_items: [{
             price_data: {
               currency: 'usd',
               product_data: {
                 name: 'Instantask Unlimited Subscription',
                 description: 'Unlimited custom digital tools for $499/month',
               },
               unit_amount: 49900, // $499.00 in cents
               recurring: { interval: 'month' },
             },
             quantity: 1,
           }],
           mode: 'subscription',
           customer: customer.id,
           success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
           cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/subscribe/cancel`,
         });

         return NextResponse.json({ url: session.url });
       } catch (error) {
         console.error('Subscription error:', error);
         return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 });
       }
     }

     // Run in Supabase SQL Editor:
     /*
     CREATE OR REPLACE FUNCTION hash_password(input_password TEXT)
     RETURNS TEXT AS $$
     BEGIN
       RETURN crypt(input_password, gen_salt('bf'));
     END;
     $$ LANGUAGE plpgsql;
     */