import React from "react";

const TermsAndConditions = () => {
  const effectiveDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: (
        <>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using our e-commerce Platform, you confirm that:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li>You are at least 18 years old.</li>
            <li>You have read, understood, and agree to all the Terms stated herein.</li>
            <li>You agree to comply with all applicable laws and these Terms.</li>
          </ul>
        </>
      ),
    },
    {
      title: "2. Description of Services",
      content: (
        <>
          <p className="text-gray-700 leading-relaxed">
           Pullman Euro Car Spare is an online platform that allows customers to:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li>Browse and purchase automobile spare parts</li>
            <li>Manage orders and track deliveries</li>
            <li>Make secure payments</li>
            <li>Communicate with customer support</li>
            <li>Access product information, offers, and notifications</li>
          </ul>
          <p className="mt-3 text-gray-700 leading-relaxed">
           We may modify, update, or discontinue any part of the Service at any time without prior notice.
          </p>
        </>
      ),
    },
    {
      title: "3. Account Registration and Security",
      content: (
        <>
          <p className="text-gray-700 leading-relaxed">
           To make purchases or access certain features, you may need to create an account with accurate and complete information.
          </p>
          <p>You are responsible for: </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li>Maintaining the confidentiality of your login credentials</li>
            <li>All activities that occur under your account</li>
          </ul>
          <p className="mt-3 text-gray-700 leading-relaxed">
           You must notify us immediately in the event of unauthorized access or suspected security breaches.
We are not liable for losses caused by failure to secure your account.
          </p>
        </>
      ),
    },
    {
      title: "4. Use of the Service",
      content: (
        <>
          <p className="text-gray-700 leading-relaxed">
            You agree to use Billway only for lawful business purposes. You
            must not:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li>Engage in fraudulent, illegal, or unauthorized transactions</li>
            <li>Attempt to hack, disrupt, or gain unauthorized access to our systems.</li>
            <li>Copy, sell, or exploit any part of the Platform</li>
            <li>Interfere with our website’s functionality or security.</li>
          </ul>
          <p className="mt-3 text-gray-700">
            Violation of these Terms may result in suspension or termination of access.
          </p>
        </>
      ),
    },
    {
      title: "5. Product Orders and Payments",
      content: (
        <>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li>Product prices, descriptions, and availability may change without notice.</li>
            <li>Orders are subject to acceptance and confirmation.</li>
            <li>Payments may be processed through trusted third-party gateways.</li>
            <li>By using third-party payment services, you agree to their respective terms.</li>
          </ul>
          <p className="mt-3 text-gray-700">
            You are responsible for ensuring accurate billing information.
We reserve the right to cancel orders in case of suspected fraud or incorrect pricing.
          </p>
        </>
      ),
    },
    {
      title: "6. Shipping, Delivery & Risk",
      content: (
        <>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li>Delivery timelines are estimates and may vary based on location and courier conditions.</li>
            <li>Risk of loss or damage passes to you once the product is handed to the courier.</li>
            <li>You must provide correct shipping details; incorrect addresses may cause delays or failed deliveries.</li>
          </ul>
        </>
      ),
    },
    {
      title: "7. Third-Party Services ",
      content: (
        <>
        <p>The Platform may include integrations such as:</p>
        <ul>
          <li>Payment processors</li>
          <li>Shipping and logistics partners</li>
          <li>Messaging services (e.g., WhatsApp notifications)</li>
        </ul>
        <p>We are not responsible for the policies or performance of third-party services.
         Your use of them is governed by their own terms.
        </p>
        </>
      ),
    },
    {
      title: "8. Data Protection and Privacy",
      content: (
        <>
        <p className="text-gray-700 leading-relaxed">
          Your use of the Platform is governed by our Privacy Policy.
By using the Service, you consent to the collection and use of data as outlined there.
        </p>
        <p>While we take strong security measures, you understand that no online service is completely risk-free.</p>
        </>
      ),
    },
    {
      title: "9. Intellectual Property",
      content: (
        <>
        <p className="text-gray-700 leading-relaxed">
          All content on Pullman Euro Car Spare—including website design, logos, product data, text, graphics, and software—is our exclusive property.
        </p>
        <p>You may not:</p>
        <ul>
          <li>Copy</li>
          <li>Distribute</li>
          <li>Modify</li>
          <li>Reproduce</li>
          <li>Create derivative works</li>
        </ul>
        <p>without our prior written permission.</p>
        </>
      ),
    },
    {
      title: "10. Order Cancellation",
      content: (
        <>
        <p>We may cancel orders due to:</p>
        <ul>
          <li>Product unavailability</li>
          <li>Payment errors</li>
          <li>Incorrect pricing</li>
          <li>Fraud or policy violations</li>
        </ul>
        <p>If an order is cancelled from our side, applicable refunds will be issued.</p>
        </>
      ),
    },
    {
      title: "11. Limitation of Liability",
      content: (
        <>
        <p>To the fullest extent permitted by law:</p>
        <ul>
          <li>Pullman Euro Car Spare is not liable for indirect, incidental, special, or consequential damages.</li>
          <li>We are not responsible for delays, technical issues, or losses caused by third-party services</li>
          <li>Our total liability will not exceed the amount you paid for the specific order involved.</li>
        </ul>
        </>
      ),
    },
    {
      title: "12. Indemnification",
      content: (
        <>
        <p>You agree to indemnify and hold harmless Pullman Euro Car Spare, its employees, partners, and affiliates from claims, damages, losses, or expenses arising from:</p>
        <ul>
          <li>Your use of the Platform</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of laws or third-party rights</li>
        </ul>
        </>
      ),
    },
    {
      title: "13. Disclaimer of Warranties",
      content: (
        <>
        <p>The Platform and all services are provided “as is” and “as available” without warranties of any kind.
We do not guarantee:</p>
        <ul>
          <li>Uninterrupted access</li>
          <li>Error-free functionality</li>
          <li>Security against all threats</li>
          <li>Accuracy of product information (though we strive for accuracy)</li>
        </ul>
        </>
      ),
    },
    {
      title: "14. Modifications to Terms",
      content: (
        <>
        <p>We may update these Terms at any time.</p>
        <p>Updated Terms will be posted on this page with a revised “Effective Date.”</p>
        <p>Continued use of the Platform indicates acceptance of the updated Terms.</p>
        </>
      ),
    },
    {
      title: "15. Governing Law and Jurisdiction",
      content: (
        <p className="text-gray-700 leading-relaxed">
          These Terms are governed by the laws of India. Any disputes shall be
          subject to the exclusive jurisdiction of courts in [Your City, India].
        </p>
      ),
    },
    {
      title: "16. Refund and Cancellation Policy",
      content: (
        <>
        <p className="text-gray-700 leading-relaxed">
          Payments for products are generally non-refundable, except where required by law or in specific approved cases.
        </p>
        <p>You may request cancellation before the order is shipped.</p>
        <p>No refunds are provided for:</p>
        <ul>
          <li>Shipped orders</li>
          <li>Incorrect addresses provided by you</li>
          <li>Items damaged due to misuse</li>
        </ul>
        <p>For billing errors or duplicate charges:</p>
        <ul>
          <li>Contact us within 7 days at [Insert Email]</li>
          <li>Refunds (if approved) will be processed within 7–14 business days to the original payment method.</li>
        </ul>
        </>
      ),
    },
    {
      title: "17. Contact Us",
      content: (
        <>
          <p className="text-gray-700 leading-relaxed">
            For questions or concerns regarding these Terms, please contact:
          </p>
          <div className="mt-3 space-y-1">
            <p className="font-medium text-gray-800">
              Pullman Euro Car Spare
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:bluebexsoftware@gmail.com"
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                bluebexsoftware@gmail.com
              </a>
            </p>
          </div>
        </>
      ),
    }
  ];

  return (
    <div className="min-h-screen py-16 px-6 flex justify-center">
      <div className="max-w-7xl md:p-10 transition-all duration-300">
        <header className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-3 tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Effective Date: <span className="font-medium">{effectiveDate}</span>
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            Welcome to <strong>Billway</strong>, a billing and business
            management platform by{" "}
            <strong>Bluebex Software Private Limited</strong> (“we,” “us,” or
            “our”).
          </p>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using Billway, you agree to these Terms. If you do
            not agree, please discontinue use of the Service.
          </p>
        </header>

        {sections.map((section, index) => (
          <section
            key={index}
            className="mb-8 border-l-4 border-orange-400 pl-5 py-5 rounded-md hover:bg-gray-50 transition-colors duration-200"
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
};

export default TermsAndConditions;
