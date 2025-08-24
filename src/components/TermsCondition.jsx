import React from "react";
import { X } from "lucide-react";

const TermsCondition = ({ setTermsConditions }) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 transition-colors"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Terms <span className="text-gray-600">& Conditions</span>
          </h2>
          <button
            onClick={() => setTermsConditions(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>
            These are the Terms and Conditions governing the use of this Service
            and the agreement that operates between You and the Company. These
            Terms and Conditions set out the rights and obligations of all users
            regarding the use of the Service.
          </p>

          <p>
            Your access to and use of the Service is conditioned on Your
            acceptance of and compliance with these Terms and Conditions. These
            Terms and Conditions apply to all visitors, users and others who
            access or use the Service.
          </p>

          <p>
            By accessing or using our Service You agree to be bound by these
            Terms and Conditions. If You disagree with any part of these terms
            and conditions then You may not access the Service.
          </p>

          <p>
            You represent that you are over the age of 18. The Company does not
            permit those under 18 to use the Service. Your access to and use of
            the Service is also conditioned on Your acceptance of and compliance
            with the Privacy Policy of the Company.
          </p>

          <p>
            Our Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your personal information when You
            use the Application or the Website and tells You about Your privacy
            rights and how the law protects You. Please read Our Privacy Policy
            carefully before using Our Service.
          </p>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200  sm:justify-end">
          <button
            onClick={() => setTermsConditions(false)}
            className="px-8 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
