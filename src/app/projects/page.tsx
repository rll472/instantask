"use client";

import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Instantask - Our Projects</title>
        <meta
          name="description"
          content="Explore our past projects and see how Instantask builds custom digital tools to streamline small business operations."
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

      {/* Projects Section */}
      <main>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center">
              Our Projects
            </h2>
            <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Discover how Instantask transforms small businesses with custom digital tools. Our past projects showcase innovative solutions that replace manual processes with efficient, tailored applications.
            </p>

            {/* Project: Fee Calculation App */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900">Fee Calculation App</h3>
              <p className="mt-4 text-gray-600">
                We developed a versatile app to automate complex fee calculations, originally designed for a specific industry but adaptable to various use cases. By integrating relevant data and user inputs, this tool eliminates manual calculations, saving time and reducing errors.
              </p>
              <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Use Case 1: Retail Pricing Calculator */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
                    alt="Retail pricing calculator"
                    width={500}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-semibold text-gray-900">Retail Pricing Calculator</h4>
                  <p className="mt-2 text-gray-600">
                    For a retail business, we repurposed the fee calculation logic to create a dynamic pricing tool. It takes inputs like wholesale costs and desired margins, pulls local tax rates via an API, and calculates final prices instantly. This replaced error-prone spreadsheet workflows, enabling real-time price updates for promotions.
                  </p>
                </div>
                {/* Use Case 2: Construction Cost Estimator */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Image
                    src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg"
                    alt="Construction cost estimator"
                    width={500}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-semibold text-gray-900">Construction Cost Estimator</h4>
                  <p className="mt-2 text-gray-600">
                    For a construction firm, we adapted the app into a cost estimation tool. It accepts project details (e.g., square footage, materials) and integrates supplier price data to generate accurate bids. This streamlined the bidding process, replacing hours of manual calculations with instant, reliable estimates.
                  </p>
                </div>
                {/* Use Case 3: AI-Powered Customer Insights Dashboard */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                    alt="AI customer insights dashboard"
                    width={500}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-semibold text-gray-900">AI Customer Insights Dashboard</h4>
                  <p className="mt-2 text-gray-600">
                    For a small business, we built an AI-powered dashboard to summarize customer feedback from reviews, emails, and surveys. With a chat interface, owners can query insights like “What are customers saying about our service?” This replaced manual analysis, delivering real-time, actionable insights.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/#contact"
                className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Contact Us to Build Your Custom Tool
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
            <a href="mailto:contact@instantask.co" className="hover:text-blue-400">
              russ@instantask.co
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}