"use client";

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const tiers = [
  {
    label: '1 Agent',
    pricePerAgent: 299,
    agents: 1,
    total: 299,
    highlight: false,
    badge: null,
  },
  {
    label: '2–4 Agents',
    pricePerAgent: 249,
    agents: null,
    total: null,
    highlight: true,
    badge: 'Most Popular',
  },
  {
    label: '5+ Agents',
    pricePerAgent: 199,
    agents: null,
    total: null,
    highlight: false,
    badge: 'Best Value',
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Instantask - Pricing</title>
        <meta
          name="description"
          content="Simple per-agent pricing. One agent at $299/month, with discounts when you deploy multiple agents."
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
          </nav>
        </div>
      </header>

      <main>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center">Simple Agent Pricing</h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Each agent is a flat monthly subscription. Deploy more agents and the per-agent price drops — no contracts, cancel anytime.
            </p>

            {/* Pricing Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tiers.map((tier) => (
                <div
                  key={tier.label}
                  className={`relative bg-white rounded-lg shadow-md p-8 flex flex-col ${
                    tier.highlight ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {tier.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 text-center">{tier.label}</h3>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-extrabold text-gray-900">${tier.pricePerAgent}</span>
                    <span className="text-gray-500 ml-1">/agent/month</span>
                  </div>
                  {tier.total !== null && (
                    <p className="mt-1 text-center text-gray-500 text-sm">${tier.total}/month total</p>
                  )}
                  <ul className="mt-6 space-y-3 text-gray-600 flex-1">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2">Custom-built for your workflow</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2">Ongoing updates & support</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2">Cancel anytime</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Link
                      href="/subscribe"
                      className={`block w-full text-center font-semibold py-3 px-6 rounded-lg transition ${
                        tier.highlight
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="mt-16 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 text-center">Common Questions</h3>
              <dl className="mt-8 space-y-6">
                {[
                  {
                    q: 'What exactly is an agent?',
                    a: 'An agent is a custom-built AI workflow that handles a specific recurring task in your business — such as responding to inquiries, generating quotes, or following up with customers.',
                  },
                  {
                    q: 'How long does it take to build?',
                    a: 'Most agents are up and running within 1–2 weeks after we align on your requirements.',
                  },
                  {
                    q: 'Can I add more agents later?',
                    a: 'Yes. You can add agents at any time and your per-agent rate will automatically adjust to the lower tier if you qualify.',
                  },
                  {
                    q: 'What if I want to cancel?',
                    a: 'Cancel anytime from your portal. No cancellation fees.',
                  },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <dt className="font-semibold text-gray-900">{q}</dt>
                    <dd className="mt-1 text-gray-600">{a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600">Not sure which agents you need?</p>
              <Link
                href="/#contact"
                className="mt-3 inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Talk to Us First
              </Link>
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
