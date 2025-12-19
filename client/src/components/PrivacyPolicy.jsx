import React from "react";

export default function PrivacyPolicy() {
 

  return (
    <div className="min-h-screen  py-16 px-6 flex justify-center">
      <div className="max-w-7xl md:p-10 transition-all duration-300">
        {/* Header */}
        <header className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-3 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Effective Date: <span className="font-medium">5/12/2025</span>
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Pullman Euro Car Spare</strong> (“we,” “us,” or “our”) operates this e-commerce platform to provide automotive parts and related services to our customers (“you” or “your”). This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the Pullman Euro Car Spare website or services.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We are committed to protecting your privacy and complying with
            applicable data protection laws, including the Information Technology Act, 2000
            (India), the General Data Protection Regulation (GDPR), and other
            global privacy regulations, where applicable.
          </p>
        </header>

        {/* Sections */}
        {[
          {
            title: "1. Information We Collect",
            content: (
              <>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  When you use Pullman Euro Car Spare, we collect and process the following types of information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Personal Information:</strong> Business name, GST number,
                    and registration details.
                  </li>
                  <li>
                    <strong>Order & Transaction Information:</strong> Name, phone number, email, and address.
                  </li>
                  <li>
                    <strong>Website Usage Data:</strong> Invoices, payments, and transaction details.
                  </li>
                </ul>
                <p className="text-gray-700 mb-3 leading-relaxed">
                 We collect this information when you create an account, place an order, contact customer support, or browse our website.
                </p>
              </>
            ),
          },
          {
            title: "2. How We Use Your Information",
            content: (
              <>
              <p className="mb-2">We use your information for the following purposes:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-3 px-2">
                  <li>To create and manage your Pullman Euro Car Spare account</li>
                  <li>To process and deliver your orders</li>
                  <li>To communicate order updates, support messages, and product notifications</li>
                  <li>To improve website performance, user experience, and security</li>
                  <li>To send transactional notifications (including via WhatsApp API, where applicable)</li>
                  <li>To comply with legal obligations and prevent fraud</li>
                </ul>
                <p className="text-gray-700">
                  We do not sell, rent, or trade your personal information.
                </p>
              </>
            ),
          },
          {
            title: "3. Legal Basis for Processing (For GDPR Users)",
            content: (
              <>
              <p className="mb-2">If you are located in the EEA, we process your data based on:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Performance of a contract.</li>
                <li>Legal obligation.</li>
                <li>Legitimate interests.</li>
                <li>Your consent (for marketing and optional features).</li>
              </ul>
              </>
            ),
          },
          {
            title: "4. Data Storage and Security",
            content: (
             <>
              <p className="text-gray-700 leading-relaxed">
                We store data securely on Aindustry-standard cloud infrastructure.
              </p>
              <p className="mb-2">We use strong technical and organizational measures to protect your data against unauthorized access, alteration, loss, or misuse.</p>
              <p>However, no online system is completely secure, and we cannot guarantee absolute protection.</p>
           
             </> 
             ),
          },
          {
            title: "5. Data Sharing and Disclosure",
            content: (
              <>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  We only share data in the following cases:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Payment Gateways:</strong> (Example: Razorpay, PhonePe, PayPal, etc.) Used to process secure payments.
                  </li>
                  <li>
                    <strong>Logistics & Delivery Partners:</strong> To deliver your orders efficiently.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Hosting and analytics and communication platforms under strict confidentiality agreements.
                   </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose information if required by law or regulatory authorities.
                  </li>
                </ul>
              </>
            ),
          },
          {
            title: "6. Data Retention",
            content: (
              <>
              <p className="text-gray-700 leading-relaxed mb-2">
                We retain your data for as long as your account remains active or as necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                 <li> Provide services </li>
                 <li> Fulfill orders </li>
                 <li> Meet legal obligations </li>
                 <li> Resolve disputes </li>
                </ul>
              </>
            ),
          },
          {
            title: "7. Your Rights",
            content: (
              <>
                <p className="text-gray-700 mb-3">
                  Depending on your region, you may have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Access your personal information.</li>
                  <li>Request corrections or deletions.</li>
                  <li>Object to or restrict processing</li>
                  <li>Withdraw consent for marketing.</li>
                  <li>File a complaint with a data authority.</li>
                </ul>
                <p className="mt-3 text-gray-700">
                  To exercise your rights, contact: {" "}
                  <a
                    href="mailto:pullmaneurospare@gmail.com"
                    className="text-blue-600 underline hover:text-blue-800 transition-colors"
                  >
                    pullmaneurospare@gmail.com
                  </a>{" "}
                  to exercise these rights.
                </p>
              </>
            ),
          },
          {
            title: "8. Cookies and Tracking Technologies",
            content: (
              <>
              <p className="text-gray-700 leading-relaxed mb-2">
                We use cookies and similar tools to.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Improve website functionality</li>
                <li>Analyze website usage</li>
                <li>Personalize your shopping experience</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                You can control cookies through your browser settings.
              </p>
              </>
            ),
          },
          {
            title: "9. International Data Transfers",
            content: (
              <>
              <p className="text-gray-700 leading-relaxed">
                Your information may be stored or processed in countries outside your own.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We ensure such transfers follow applicable data protection requirements.
              </p>
              </>
            ),
          },
          {
            title: "10. Children’s Privacy",
            content: (
              <>
              <p className="text-gray-700 leading-relaxed">
                Pullman Euro Car Spare is intended for users aged 18 and above.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We do not knowingly collect information from minors.
              </p>
              </>
            ),
          },
          {
            title: "11. Changes to This Privacy Policy",
            content: (
             <>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically.
              </p>
              <p>
                Revised versions will be posted on this page with an updated <strong> 5/12/2025</strong>.
              </p>
              <p>
                Please review this policy regularly.
              </p>
             </>
            ),
          },
          {
            title: "12. Contact Us",
            content: (
              <>
                <p className="text-gray-700 leading-relaxed">
                 If you have any questions or concerns regarding this Privacy Policy, please contact us:
                </p>
                <div className="mt-2 space-y-1">
                  <p className="font-medium text-gray-800">
                    Pullman Euro Car Spare
                  </p>
                  <p className="text-gray-700">
                    Email:{" "}
                    <a
                      href="mailto:pullmaneurospare@gmail.com"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      pullmaneurospare@gmail.com
                    </a>
                  </p>
                </div>
              </>
            ),
          },
        ].map((section, index) => (
          <section
            key={index}
            className="mb-8 border-l-4 border-[#25AFB2] pl-5 py-5 hover:bg-gray-50 rounded-md transition-colors duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {section.title}
            </h2>
            {section.content}
          </section>
        ))}

        <footer className="border-t border-gray-200 pt-6 text-right">
          <small className="text-gray-500">
            © {new Date().getFullYear()} Pullman Euro Car Spare. All
            rights reserved.
          </small>
        </footer>
      </div>
    </div>
  );
}
