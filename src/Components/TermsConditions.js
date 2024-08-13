import React, { useState } from 'react';

function TermsConditions() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">Terms & Conditions</h1>
      <p className="mb-6">
        Welcome to MyHome2U. These terms and conditions outline the rules and regulations for the use of our website. By accessing or using this website, you agree to be bound by these terms and conditions.
      </p>
      
      <div className="space-y-6">
        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h2
            className="text-xl font-semibold cursor-pointer mb-4"
            onClick={() => toggleSection('intellectual')}
          >
            Intellectual Property Rights
            <span className={`float-right transition-transform ${activeSection === 'intellectual' ? 'rotate-180' : ''}`}>
              &#9660;
            </span>
          </h2>
          {activeSection === 'intellectual' && (
            <div className="transition-opacity duration-300">
              <p className="mb-4">
                Other than the content you own, under these Terms, MyHome2U and/or its licensors own all the intellectual property rights and materials contained in this website.
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h2
            className="text-xl font-semibold cursor-pointer mb-4"
            onClick={() => toggleSection('restrictions')}
          >
            Restrictions
            <span className={`float-right transition-transform ${activeSection === 'restrictions' ? 'rotate-180' : ''}`}>
              &#9660;
            </span>
          </h2>
          {activeSection === 'restrictions' && (
            <div className="transition-opacity duration-300">
              <p className="mb-4">
                You are specifically restricted from all of the following:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>Publishing any website material in any other media.</li>
                <li>Selling, sublicensing, and/or otherwise commercializing any website material.</li>
                <li>Publicly performing and/or showing any website material.</li>
              </ul>
            </div>
          )}
        </div>

        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h2
            className="text-xl font-semibold cursor-pointer mb-4"
            onClick={() => toggleSection('content')}
          >
            Your Content
            <span className={`float-right transition-transform ${activeSection === 'content' ? 'rotate-180' : ''}`}>
              &#9660;
            </span>
          </h2>
          {activeSection === 'content' && (
            <div className="transition-opacity duration-300">
              <p className="mb-4">
                In these Terms and Conditions, “Your Content” shall mean any audio, text, video, images, or other material you choose to display on this website. By displaying Your Content, you grant MyHome2U a non-exclusive, worldwide, royalty-free, sub-licensable license to use, reproduce, adapt, publish, and distribute it in any and all media.
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h2
            className="text-xl font-semibold cursor-pointer mb-4"
            onClick={() => toggleSection('warranties')}
          >
            No Warranties
            <span className={`float-right transition-transform ${activeSection === 'warranties' ? 'rotate-180' : ''}`}>
              &#9660;
            </span>
          </h2>
          {activeSection === 'warranties' && (
            <div className="transition-opacity duration-300">
              <p className="mb-4">
                This website is provided “as is,” with all faults, and MyHome2U expresses no representations or warranties, of any kind related to this website or the materials contained on this website.
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h2
            className="text-xl font-semibold cursor-pointer mb-4"
            onClick={() => toggleSection('liability')}
          >
            Limitation of Liability
            <span className={`float-right transition-transform ${activeSection === 'liability' ? 'rotate-180' : ''}`}>
              &#9660;
            </span>
          </h2>
          {activeSection === 'liability' && (
            <div className="transition-opacity duration-300">
              <p className="mb-4">
                In no event shall MyHome2U, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract.
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h2
            className="text-xl font-semibold cursor-pointer mb-4"
            onClick={() => toggleSection('changes')}
          >
            Changes to These Terms
            <span className={`float-right transition-transform ${activeSection === 'changes' ? 'rotate-180' : ''}`}>
              &#9660;
            </span>
          </h2>
          {activeSection === 'changes' && (
            <div className="transition-opacity duration-300">
              <p className="mb-4">
                We may update our Terms and Conditions from time to time. We will notify you of any changes by posting the new Terms and Conditions on this page.
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
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <address className="mb-4">
                <p>Email: support@myhome2u.com</p>
                <p>Phone: +601113323658</p>
              </address>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
