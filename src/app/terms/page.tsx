'use client'

import { motion } from 'framer-motion'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-slate-500 mb-10">Last updated: April 1, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing or using Contractor OverBid (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Description of Service</h2>
            <p className="text-slate-600 leading-relaxed">
              Contractor OverBid provides AI-powered analysis of contractor quotes and estimates. Users submit quote details and receive an automated analysis comparing pricing against market rates. The Service includes a free summary verdict and a paid detailed report ($4.99 per report).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Important Disclaimer</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800">
              <p className="font-medium mb-2">⚠️ Not Professional Advice</p>
              <p className="text-sm leading-relaxed">
                Our AI-generated reports are for <strong>informational purposes only</strong> and do not constitute professional advice from a licensed contractor, appraiser, engineer, or legal professional. Market rates vary by region, season, project complexity, and many other factors that our AI may not fully account for. Always obtain multiple quotes from licensed contractors and consult with qualified professionals before making decisions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Accuracy of Analysis</h2>
            <p className="text-slate-600 leading-relaxed">
              While we strive to provide accurate and helpful analysis, we cannot guarantee the accuracy, completeness, or reliability of our AI-generated reports. Construction costs vary significantly based on location, timing, materials, labor availability, project complexity, and other factors. Our analysis is based on general market data and AI estimation, not on-site inspection or professional assessment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Payments & Refunds</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Full reports are available for a one-time payment of $4.99 per report.</li>
              <li>Payments are processed securely through Stripe.</li>
              <li>All sales are final. Due to the instant delivery of digital content, refunds are generally not available.</li>
              <li>If you experience a technical issue that prevents you from accessing a paid report, please contact us and we will resolve the issue or provide a refund at our discretion.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>You agree to provide accurate quote information for analysis.</li>
              <li>You understand that the analysis is AI-generated and not a substitute for professional advice.</li>
              <li>You will not use the Service for any unlawful purpose.</li>
              <li>You will not attempt to reverse-engineer, exploit, or abuse the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">
              The Service, including its design, code, AI models, and content, is owned by Contractor OverBid. Reports generated for you are for your personal use. You may share your report with contractors or advisors but may not resell or redistribute reports commercially.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              To the maximum extent permitted by law, Contractor OverBid shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, arising out of your use of the Service or reliance on any analysis provided. Our total liability for any claim shall not exceed the amount you paid for the specific report in question.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Modifications</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated date. Continued use of the Service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Governing Law</h2>
            <p className="text-slate-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">11. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions about these Terms, please contact us at{' '}
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
