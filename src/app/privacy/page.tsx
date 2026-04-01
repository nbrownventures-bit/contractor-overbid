'use client'

import { motion } from 'framer-motion'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 mb-10">Last updated: April 1, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              Contractor OverBid (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard information when you use our website and services at contractor-overbid.vercel.app (the &quot;Service&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-3">We collect information you provide directly when using our Service:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Quote Data:</strong> Job type, location (city and state), scope of work, line items, pricing, and contractor name you submit for analysis.</li>
              <li><strong>Payment Information:</strong> When you purchase a full report, payment is processed securely by Stripe. We do not store your credit card number, expiration date, or CVV on our servers.</li>
              <li><strong>Usage Data:</strong> We may collect standard web analytics such as pages visited, time on site, and browser type.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>To analyze your contractor quote using AI and generate your report.</li>
              <li>To process your payment through Stripe.</li>
              <li>To improve our Service and AI analysis accuracy.</li>
              <li>To communicate with you regarding your report or account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Data Storage & Security</h2>
            <p className="text-slate-600 leading-relaxed">
              Your report data is stored locally in your browser (localStorage) for convenient access. We use industry-standard security measures to protect data transmitted to our servers for AI analysis. Quote data sent for analysis is processed in real-time and is not permanently stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Third-Party Services</h2>
            <p className="text-slate-600 leading-relaxed mb-3">We use the following third-party services:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Anthropic (Claude AI):</strong> To power our quote analysis engine. Your quote data is sent to Anthropic&apos;s API for processing.</li>
              <li><strong>Stripe:</strong> To process payments securely. Stripe&apos;s privacy policy applies to payment data.</li>
              <li><strong>Vercel:</strong> To host our website. Vercel&apos;s privacy policy applies to hosting data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed">
              You may clear your locally stored reports at any time by clearing your browser data. If you have questions about data we may have processed, please contact us at support@contractoroverbid.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              We use essential cookies and localStorage to maintain your session and store report data locally. We do not use third-party tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:support@contractoroverbid.com" className="text-teal-600 hover:text-teal-700 underline">
                support@contractoroverbid.com
              </a>.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
