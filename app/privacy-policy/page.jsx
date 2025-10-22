"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  // dynamic tab title

  useEffect(() => {
    document.title = "Flavor AI-Privacy Policy";
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Privacy Policy Content */}
      <main className="min-h-screen bg-base-100 text-base-content transition-colors duration-300 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header Section with Gradient */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-base-200/50 dark:bg-base-300 rounded-2xl p-8 shadow-lg border border-base-300 dark:border-base-100/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Introduction
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80">
                    Welcome to Flavor AI. We value your trust and are committed
                    to protecting your privacy. This Privacy Policy explains how
                    we collect, use, and protect your information when you use
                    our website and services.
                  </p>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="bg-base-200/50 dark:bg-base-300 rounded-2xl p-8 shadow-lg border border-base-300 dark:border-base-100/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Information We Collect
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80 mb-4">
                    We may collect personal details such as your name, email
                    address, usage data, and preferences when you interact with
                    our services. We also collect data automatically for
                    analytics purposes to improve user experience.
                  </p>
                  <ul className="space-y-2 text-base-content/70">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-success"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Personal identification information
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-success"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Usage data and analytics
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-success"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Preferences and settings
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="bg-base-200/50 dark:bg-base-300 rounded-2xl p-8 shadow-lg border border-base-300 dark:border-base-100/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    How We Use Your Information
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80">
                    Your information is used to personalize your experience,
                    improve our services, communicate important updates, and
                    ensure security and compliance.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section className="bg-base-200/50 dark:bg-base-300 rounded-2xl p-8 shadow-lg border border-base-300 dark:border-base-100/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Data Protection & Security
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80">
                    We implement appropriate technical and organizational
                    measures to protect your personal data from unauthorized
                    access, disclosure, alteration, or destruction.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="bg-base-200/50 dark:bg-base-300 rounded-2xl p-8 shadow-lg border border-base-300 dark:border-base-100/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Third-Party Services
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80">
                    Our website may include links to third-party services.
                    Please note we are not responsible for the privacy practices
                    of these external services. We recommend reviewing their
                    privacy policies.
                  </p>
                </div>
              </div>
            </section>

            {/* User Rights */}
            <section className="bg-base-200/50 dark:bg-base-300 rounded-2xl p-8 shadow-lg border border-base-300 dark:border-base-100/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    User Rights & Choices
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80">
                    You have the right to access, update, or delete your
                    personal data. You may opt out of marketing communications
                    at any time via the provided links or by contacting us
                    directly.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-base-200/50 dark:bg-base-300 rounded-2xl p-8 shadow-lg border border-base-300 dark:border-base-100/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-base-content mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Contact Us
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80">
                    If you have questions about this Privacy Policy, please
                    contact us at{" "}
                    <a
                      href="mailto:support@flavorai.com"
                      className="text-primary hover:text-secondary font-medium transition-colors duration-200 underline"
                    >
                      support@flavorai.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Last Updated */}
          <div className="text-center mt-12 pt-8 border-t border-base-300 dark:border-base-100/20">
            <p className="text-sm text-base-content/60">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
