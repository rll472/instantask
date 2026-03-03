"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

function getPricePerAgent(count: number): number {
  if (count >= 5) return 199;
  if (count >= 2) return 249;
  return 299;
}

export default function Subscribe() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  const [agentsCount, setAgentsCount] = useState(1);
  const [message, setMessage] = useState("");

  const pricePerAgent = getPricePerAgent(agentsCount);
  const totalMonthly = pricePerAgent * agentsCount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, agentsCount }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Redirecting to payment...");
        window.location.href = data.url;
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${(error as Error).message || "Unknown error"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Instantask - Subscribe</title>
        <meta
          name="description"
          content="Deploy your custom AI agents. Simple per-agent pricing starting at $299/month."
        />
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
            <Link href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2">Home</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2">Pricing</Link>
            <Link href="/#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2">Contact</Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 px-3 py-2">Blog</Link>
            <Link href="/portal" className="text-gray-600 hover:text-blue-600 px-3 py-2">Portal</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center">Deploy Your Agents</h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Create your account, choose how many agents you need, and complete payment to get started.
            </p>

            <div className="mt-12 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
              {/* Agent Count Selector */}
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Agents
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setAgentsCount(Math.max(1, agentsCount - 1))}
                    className="w-10 h-10 rounded-full bg-white border border-gray-300 text-lg font-bold hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="text-3xl font-extrabold text-gray-900 w-8 text-center">{agentsCount}</span>
                  <button
                    type="button"
                    onClick={() => setAgentsCount(agentsCount + 1)}
                    className="w-10 h-10 rounded-full bg-white border border-gray-300 text-lg font-bold hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-gray-600">${pricePerAgent}/agent/month</span>
                  <span className="font-semibold text-blue-600">${totalMonthly}/month total</span>
                </div>
                {agentsCount >= 2 && agentsCount < 5 && (
                  <p className="mt-1 text-xs text-green-600">2–4 agent discount applied — saving ${(299 - pricePerAgent) * agentsCount}/month</p>
                )}
                {agentsCount >= 5 && (
                  <p className="mt-1 text-xs text-green-600">5+ agent discount applied — saving ${(299 - pricePerAgent) * agentsCount}/month</p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: 'name', label: 'Name', type: 'text' },
                  { id: 'companyName', label: 'Company Name', type: 'text' },
                  { id: 'address', label: 'Address', type: 'text' },
                  { id: 'phone', label: 'Phone Number', type: 'tel' },
                  { id: 'email', label: 'Email Address', type: 'email' },
                  { id: 'password', label: 'Password', type: 'password' },
                ].map(({ id, label, type }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                    <input
                      type={type}
                      id={id}
                      name={id}
                      value={formData[id as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                >
                  Subscribe — ${totalMonthly}/month
                </button>
                {message && <p className="mt-2 text-center text-sm text-gray-600">{message}</p>}
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                You'll be redirected to Stripe to complete payment. Cancel anytime from your portal.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2026 Instantask. All rights reserved.</p>
          <p className="mt-2">
            <a href="mailto:russ@instantask.co" className="hover:text-blue-400">russ@instantask.co</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
