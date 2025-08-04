"use client";

     import { useState, useEffect } from "react";
     import Head from "next/head";
     import Link from "next/link";
     import { useRouter } from "next/navigation";

     export default function Login() {
       const [formData, setFormData] = useState({ email: "", password: "" });
       const [message, setMessage] = useState("");
       const router = useRouter();

       useEffect(() => {
         console.log('Login Page Env:', process.env.NEXT_PUBLIC_SUPABASE_URL);
       }, []); // Debug env loading

       const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
       };

       const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();
         setMessage("Logging in...");

         try {
           const response = await fetch('/api/login', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(formData),
           });

           const data = await response.json();
           if (response.ok && data.success) {
             document.cookie = `auth_token=${data.authToken}; path=/; secure; HttpOnly`;
             setMessage("Login successful! Redirecting...");
             router.push('/portal');
           } else {
             setMessage(data.error || 'Login failed');
           }
         } catch (error) {
           setMessage(`Error logging in: ${(error as Error).message || "Unknown error"}`);
         }
       };

       return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
           <Head>
             <title>Instantask - Log In</title>
             <meta name="description" content="Log in to manage your Instantask subscription." />
             <link rel="icon" href="/favicon.ico" />
           </Head>
           <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
             <h2 className="text-2xl font-bold text-gray-900 text-center">Log In</h2>
             <p className="mt-2 text-center text-gray-600">Enter your email and password to access your portal.</p>
             <form onSubmit={handleSubmit} className="mt-6 space-y-6">
               <div>
                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                   Email Address
                 </label>
                 <input
                   type="email"
                   id="email"
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   required
                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                 />
               </div>
               <div>
                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                   Password
                 </label>
                 <input
                   type="password"
                   id="password"
                   name="password"
                   value={formData.password}
                   onChange={handleChange}
                   required
                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                 />
               </div>
               <button
                 type="submit"
                 className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
               >
                 Log In
               </button>
               {message && <p className="mt-2 text-center text-sm text-gray-600">{message}</p>}
             </form>
             <p className="mt-4 text-center text-sm text-gray-600">
               Forgot your password? Contact{" "}
               <a href="mailto:russ@instantask.co" className="text-blue-600 hover:underline">
                 russ@instantask.co
               </a>{" "}
               for assistance.
             </p>
           </div>
         </div>
       );
     }