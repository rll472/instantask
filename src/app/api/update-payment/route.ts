import { NextResponse } from 'next/server';
     import Stripe from 'stripe';

     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2025-05-28.basil' });

     export async function POST(request: Request) {
       const { stripe_customer_id } = await request.json();
       console.log('Update Payment Request - Customer ID:', stripe_customer_id); // Debug

       if (!stripe_customer_id) {
         return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
       }

       try {
         const session = await stripe.billingPortal.sessions.create({
           customer: stripe_customer_id,
           return_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/portal`,
         });
         console.log('Billing Portal Session Created:', session.url); // Debug
         return NextResponse.json({ url: session.url });
       } catch (error) {
        console.error('Update Payment Error:', error);
        return NextResponse.json({ error: 'Failed to create billing portal session' }, { status: 500 });
      }
     }