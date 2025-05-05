"use client";

import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Instantask - Blog</title>
        <meta
          name="description"
          content="Read about our latest client projects and how Instantask builds custom digital tools to transform small businesses."
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
            <Link href="/#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2">
              Contact
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 px-3 py-2">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Blog Section */}
      <main>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center">
              Instantask Blog
            </h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Stay tuned for stories about our client projects, showcasing how we build custom digital tools to streamline small business operations. Check back soon for our latest posts!
            </p>

            {/* Sample Blog Post */}
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                  alt="AI customer insights dashboard"
                  width={500}
                  height={300}
                  className="rounded-lg mb-4"
                  style={{ width: 'auto', height: 'auto' }}
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  Transforming a Restaurant with an AI Customer Insights Dashboard
                </h3>
                <p className="mt-2 text-gray-600">
                  For a local restaurant, we built an AI-powered dashboard to summarize customer feedback from Yelp reviews and emails. The owner used the chat interface to uncover service issues, leading to operational improvements that boosted customer satisfaction by 20%.
                </p>
                <Link
                  href="/#contact"
                  className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
                >
                  Contact us to build your tool
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/#contact"
                className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Get Your Custom Digital Tool
              </Link>
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