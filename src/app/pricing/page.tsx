"use client";

import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Instantask - Pricing</title>
        <meta
          name="description"
          content="Discover our limited-time special pricing: $499/month for unlimited custom digital tools to streamline your small business operations."
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

      {/* Pricing Section */}
      <main>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center">
              Limited-Time Special Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
              For a limited time, get unlimited custom digital tools for your small business at just $499/month. Streamline operations with solutions tailored to your needs—no task limits, no extra fees.
            </p>

            {/* Pricing Card */}
            <div className="mt-12 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 text-center">Unlimited Subscription</h3>
              <p className="mt-4 text-4xl font-extrabold text-gray-900 text-center">$499</p>
              <p className="mt-2 text-lg text-gray-600 text-center">Per month</p>
              <p className="mt-4 text-gray-600 text-center">
                <span className="text-red-600 font-semibold">Limited-Time Offer!</span> Unlock unlimited tasks—pricing calculators, cost estimators, AI dashboards, and more—for one flat monthly rate.
              </p>
              <ul className="mt-6 space-y-4 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3">Unlimited custom tools (e.g., pricing calculators, cost estimators)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3">Unlimited data source integrations (e.g., APIs, databases)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3">Unlimited inquiries and support</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3">Cancel anytime</span>
                </li>
                
              </ul>
              <div className="mt-8 text-center">
                <Link
                  href="/#contact"
                  className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                >
                  Contact us
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 text-center">What’s Included?</h3>
              <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
                Your $499/month subscription unlocks unlimited custom digital tools to transform your business. Examples include:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 max-w-2xl mx-auto">
                <li>• Pricing calculators that combine wholesale costs and tax rates.</li>
                <li>• Cost estimators for construction projects using material and labor data.</li>
                <li>• AI dashboards to summarize customer feedback from reviews.</li>
                <li>• And any other automation your business needs—no limits!</li>                
              </ul>
              <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
                <span className="text-red-600 font-semibold">Act now</span> to lock in this special pricing. Contact us to discuss your business needs and start streamlining today.
              </p>
            </div>
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