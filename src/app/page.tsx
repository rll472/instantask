"use client";

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setStatus(null);
    setIsSubmitting(true);
    console.log('Submitting form:', { name, email, phone });

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });

      const data = await response.json();
      console.log('API response:', data);

      if (!response.ok) {
        if (data.error === 'Please wait before submitting again') {
          throw new Error('Please wait a few seconds before resubmitting');
        }
        if (data.errors) {
          const failed = [];
          if (data.errors.autoresponder !== 'Sent') failed.push('autoresponder');
          if (data.errors.notification !== 'Sent') failed.push('notification');
          throw new Error(`Failed to send ${failed.join(' and ')} email(s)`);
        }
        throw new Error(data.error || 'Failed to process request');
      }

      setStatus('Success! Your information has been submitted. We’ll be in touch shortly.');
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus(`Oops! ${String(error)}. Please try again or contact russ@instantask.co.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Instantask - Digital Tools for Small Businesses</title>
        <meta
          name="description"
          content="Transform your small business with custom digital tools to replace manual, redundant tasks."
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
            <h1 className="ml-2 text-2xl font-bold text-gray-900">Instantask</h1>
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
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Modernize Your Small Business
              </h2>
              <p className="mt-4 text-lg md:text-xl">
                Replace outdated, manual tasks with custom digital tools designed to boost efficiency
                and save time for your small business.
              </p>
              <Link
                href="#contact"
                className="mt-6 inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
              >
                Get Started
              </Link>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                alt="From paper to digital tools"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          id="contact"
          className="py-16 bg-gray-50 relative"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-white text-center">
              Let’s Build Your Digital Future
            </h3>
            <p className="mt-4 text-lg text-gray-200 text-center max-w-2xl mx-auto">
              Contact us to discuss how we can create custom tools to streamline your business
              operations.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-8 max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow-md"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-755">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(123) 456-7890"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              {status && (
                <p className={`mt-4 text-center ${status.includes('Oops') ? 'text-red-600' : 'text-green-600'}`}>
                  {status}
                </p>
              )}
            </form>
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