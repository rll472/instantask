"use client";

     import { useState, useEffect } from "react";
     import Head from "next/head";
     import Link from "next/link";
     import Image from "next/image";

     interface User {
       name: string;
       company_name: string;
       email: string;
       stripe_customer_id: string | null;
     }

     export default function Portal() {
       const [user, setUser] = useState<User | null>(null);
       const [message, setMessage] = useState("");
       const [loading, setLoading] = useState(true);

       useEffect(() => {
         const fetchUserData = async () => {
           const response = await fetch('/api/portal', { credentials: 'include' });
           const data = await response.json();
           console.log('Portal API Response:', data);

           if (!response.ok) {
             setMessage(data.error || 'Failed to load portal');
           } else {
             setUser(data as User);
           }
           setLoading(false);
         };

         fetchUserData();
       }, []);

       const handleUnsubscribe = async () => {
         if (!user?.stripe_customer_id) {
           setMessage("No subscription found to unsubscribe.");
           return;
         }

         const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];
         console.log('Unsubscribe Token:', token);

         if (!token) {
           setMessage("No authentication token is available.");
           return;
         }

         try {
           const response = await fetch('/api/portal/unsubscribe', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ auth_token: token }),
             credentials: 'include',
           });
           const data = await response.json();
           console.log('Unsubscribe Response:', data);
           if (response.ok) {
             setMessage(data.message || "Subscription cancelled.");
           } else {
             setMessage(data.error || "Unsubscribe failed.");
           }
         } catch (error) {
           setMessage(`Error unsubscribing: ${(error as Error).message || "Unknown error"}`);
         }
       };

       const handleUpdatePayment = async () => {
         if (!user?.stripe_customer_id) {
           setMessage("No subscription found to update payment.");
           return;
         }

         console.log('Sending Customer ID:', user.stripe_customer_id); // Debug
         try {
           const response = await fetch('/api/update-payment', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ stripe_customer_id: user.stripe_customer_id }),
             credentials: 'include',
           });
           const data = await response.json();
           console.log('Update Payment Response:', data); // Debug
           if (response.ok) {
             window.location.href = data.url;
           } else {
             setMessage(data.error || "Failed to load payment update page.");
           }
         } catch (error) {
           setMessage(`Error updating payment: ${(error as Error).message || "Unknown error"}`);
         }
       };

       if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

       return (
         <div className="min-h-screen bg-gray-50">
           <Head>
             <title>Instantask - User Portal</title>
             <meta name="description" content="Manage your Instantask subscription and payment details." />
             <link rel="icon" href="/favicon.ico" />
           </Head>

           {/* Header */}
           <header className="bg-white shadow">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
               <div className="flex items-center">
                 <Image
                   src="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg"
                   alt="Instantask Logo"
                   width={40}
                   height={40}
                   className="rounded-full"
                   style={{ width: 'auto', height: 'auto' }}
                 />
                 <Link href="/">
                   <h1 className="ml-2 text-2xl font-bold text-gray-900">Instantask</h1>
                 </Link>
               </div>
               <nav>
                 <Link href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2">
                   Home
                 </Link>
                 <Link href="/projects" className="text-gray-600 hover:text-blue-600 px-3 py-2">
                   Projects
                 </Link>
                 <Link href="/pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2">
                   Pricing
                 </Link>
                 <Link href="/#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2">
                   Contact
                 </Link>
                 <Link href="/blog" className="text-gray-600 hover:text-blue-600 px-3 py-2">
                   Blog
                 </Link>
                 <Link href="/portal" className="text-gray-600 hover:text-blue-600 px-3 py-2">
                   Portal
                 </Link>
               </nav>
             </div>
           </header>

           {/* Portal Section */}
           <main>
             <section className="py-16 bg-gray-50">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <h2 className="text-4xl font-extrabold text-gray-900 text-center">
                   User Portal
                 </h2>
                 <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
                   Manage your Instantask subscription and payment details.
                 </p>

                 {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
                 {user ? (
                   <div className="mt-12 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md text-center">
                     <h3 className="text-2xl font-semibold text-gray-900">Welcome, {user.name}!</h3>
                     <p className="mt-2 text-gray-600">Company: {user.company_name}</p>
                     <p className="mt-2 text-gray-600">Email: {user.email}</p>
                     <button
                       onClick={handleUpdatePayment}
                       className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                     >
                       Update Payment Information
                     </button>
                     <button
                       onClick={handleUnsubscribe}
                       className="mt-4 w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition"
                     >
                       Unsubscribe
                     </button>
                   </div>
                 ) : (
                   <div className="mt-12 text-center">
                     <p className="text-gray-600">
                       Please log in to access your portal.
                     </p>
                     <Link
                       href="/login"
                       className="mt-4 inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                     >
                       Log In
                     </Link>
                   </div>
                 )}
               </div>
             </section>
           </main>

           {/* Footer */}
           <footer className="bg-gray-800 text-white py-8">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <p>© 2025 Instantask. All rights reserved.</p>
               <p className="mt-2">
                 <a href="mailto:russ@instantask.co" className="hover:text-blue-400">
                   russ@instantask.co
                 </a>
               </p>
             </div>
           </footer>
         </div>
       );
     }