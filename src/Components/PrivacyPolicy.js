import React, { useState } from 'react';

function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-6">
        Welcome to MyHome2U. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
      </p>
      
      <div className="space-y-6">
        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h2
            className="text-xl font-semibold cursor-pointer mb-4"
            onClick={() => toggleSection('collection')}
          >
            Information Collection
            <span className={`float-right transition-transform ${activeSection === 'collection' ? 'rotate-180' : ''}`}>
              &#9660;
            </span>
          </h2>
          {activeSection === 'collection' && (
            <div className="transition-opacity duration-300">
              <p className="mb-4">
                We may collect information about you in a variety of ways. The information we may collect on the site includes:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>Personal Data</li>
                <li>Derivative Data</li>
                <li>Financial Data</li>
              </ul>
            </div>
          )}
        </div>

        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h2
            className="text-xl font-semibold cursor-pointer mb-4"
            onClick={() => toggleSection('use')}
          >
            Use of Your Information
            <span className={`float-right transition-transform ${activeSection === 'use' ? 'rotate-180' : ''}`}>
              &#9660;
            </span>
          </h2>
          {activeSection === 'use' && (
            <div className="transition-opacity duration-300">
              <p className="mb-4">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>Assist law enforcement and respond to subpoenas.</li>
                <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
                <li>Create and manage your account.</li>
              </ul>
            </div>
          )}
        </div>

        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h2
            className="text-xl font-semibold cursor-pointer mb-4"
            onClick={() => toggleSection('disclosure')}
          >
            Disclosure of Your Information
            <span className={`float-right transition-transform ${activeSection === 'disclosure' ? 'rotate-180' : ''}`}>
              &#9660;
            </span>
          </h2>
          {activeSection === 'disclosure' && (
            <div className="transition-opacity duration-300">
              <p className="mb-4">
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>By Law or to Protect Rights</li>
                <li>Business Transfers</li>
                <li>Third-Party Service Providers</li>
              </ul>
            </div>
          )}
        </div>

        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h2
            className="text-xl font-semibold cursor-pointer mb-4"
            onClick={() => toggleSection('security')}
          >
            Security of Your Information
            <span className={`float-right transition-transform ${activeSection === 'security' ? 'rotate-180' : ''}`}>
              &#9660;
            </span>
          </h2>
          {activeSection === 'security' && (
            <div className="transition-opacity duration-300">
              <p className="mb-4">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h2
            className="text-xl font-semibold cursor-pointer mb-4"
            onClick={() => toggleSection('contact')}
          >
            Contact Us
            <span className={`float-right transition-transform ${activeSection === 'contact' ? 'rotate-180' : ''}`}>
              &#9660;
            </span>
          </h2>
          {activeSection === 'contact' && (
            <div className="transition-opacity duration-300">
              <p className="mb-4">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <address className="mb-4">
                <p>Email: support@myhome2u.com</p>
                <p>Phone: +252616500191</p>
              </address>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
