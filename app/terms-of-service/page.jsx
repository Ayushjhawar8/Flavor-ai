// app/terms/page.jsx
import React from 'react';

const TermsPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold mb-4">Terms of Service</h1>
        <p className="text-lg">
          Welcome to Flavour AI! By using our services, you agree to the following terms:
        </p>

        <ul className="list-disc list-inside text-left text-lg space-y-3">
          <li>You agree to use the platform responsibly and comply with all applicable laws.</li>
          <li>All generated content is for personal and informational purposes only.</li>
          <li>We are not liable for any misuse or consequences arising from using the platform.</li>
          <li>Accounts, if any, should be used by the rightful owner and not shared.</li>
          <li>We reserve the right to suspend or terminate access for violations of our terms.</li>
          <li>Content uploaded or shared must not infringe on third-party rights.</li>
          <li>We may update these terms periodically; please review them regularly.</li>
          <li>By using our platform, you consent to our privacy policy and data usage practices.</li>
          <li>All disputes shall be governed by the laws applicable to our jurisdiction.</li>
        </ul>

        <p className="text-lg mt-6">
          If you have any questions, please contact us at{' '}
          <a href="mailto:ayushjhawar499@gmail.com" className="text-purple-600 hover:underline">
            ayushjhawar499@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsPage;