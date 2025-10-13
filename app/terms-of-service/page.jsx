"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const TermsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-300 transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="relative mt-10">
        <BackButton />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 pt-32">
        <div className="w-full max-w-4xl bg-base-100 rounded-2xl shadow-xl p-8 space-y-6 border border-base-300 transition-all duration-300 ease-in-out">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary">Terms of Service</h1>
            <p className="text-base-content/70 mt-2">
              Please read these terms carefully before using Flavor AI.
            </p>
          </div>

          <section className="space-y-6 text-base-content/80 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using Flavor AI ("the Service"), you accept and agree to these Terms of Service. Flavor AI is an AI-powered platform designed to help users discover recipes, meal ideas, and intelligent cooking methods. The service is for personal guidance and should be used responsibly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                2. Use License
              </h2>
              <p>
                Permission is granted to temporarily use the materials on Flavor AI’s
                website for personal, non-commercial purposes only. This license
                shall automatically terminate if you violate any of these restrictions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                3. Disclaimer
              </h2>
              <p>
                The materials on Flavor AI’s website are provided “as is.” Flavor AI
                makes no warranties, expressed or implied, and hereby disclaims all
                other warranties including, without limitation, implied warranties or
                conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                4. Limitations
              </h2>
              <p>
                In no event shall Flavor AI or its suppliers be liable for any damages
                (including, without limitation, damages for loss of data or profit)
                arising out of the use or inability to use the materials on its website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                5. Governing Law
              </h2>
              <p>
                Any claim relating to Flavor AI’s website shall be governed by the laws
                applicable in your jurisdiction without regard to its conflict of law provisions.
              </p>
            </div>

             <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                6. Modifications
              </h2>
              <p>
                We may update these Terms of Service periodically. Continued use of the platform after changes constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">
                6. Contact Information
              </h2>
              <p>
                For any questions regarding these Terms of Service, please contact us at{" "}
                <a
                  href="mailto:ayushjhawar499@gmail.com"
                  className="text-primary hover:underline font-medium"
                >
                  ayushjhawar499@gmail.com.
                </a>.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsPage;
