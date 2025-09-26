"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Terms of Service Content */}
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By
              accessing or using Flavor AI, you agree to be bound by these
              terms.
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
                  <p className="text-lg leading-relaxed text-base-content/80 mb-4">
                    Welcome to Flavor AI. These Terms of Service govern your use
                    of our website, applications, and services. By accessing or
                    using Flavor AI, you agree to comply with and be bound by
                    these terms.
                  </p>
                  <p className="text-lg leading-relaxed text-base-content/80">
                    If you do not agree with these terms, please do not use our
                    services. We reserve the right to modify these terms at any
                    time, and continued use constitutes acceptance of changes.
                  </p>
                </div>
              </div>
            </section>

            {/* Acceptance of Terms */}
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
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Acceptance of Terms
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80 mb-4">
                    By creating an account or using our services, you
                    acknowledge that you have read, understood, and agree to be
                    bound by these Terms of Service.
                  </p>
                  <ul className="space-y-3 text-base-content/70">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 mr-2 text-success mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      You must be at least 13 years old to use our services
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 mr-2 text-success mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      You agree to provide accurate and complete registration
                      information
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 mr-2 text-success mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      You are responsible for maintaining the confidentiality of
                      your account
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
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
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    User Responsibilities
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80 mb-4">
                    As a user of Flavor AI, you agree to the following
                    responsibilities:
                  </p>
                  <ul className="space-y-3 text-base-content/70">
                    <li className="flex items-start">
                      <span className="text-primary font-semibold mr-2">•</span>
                      Maintain the security and confidentiality of your account
                      credentials
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-semibold mr-2">•</span>
                      Provide accurate and current information in your profile
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-semibold mr-2">•</span>
                      Use the service in compliance with all applicable laws and
                      regulations
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-semibold mr-2">•</span>
                      Report any unauthorized use of your account immediately
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary font-semibold mr-2">•</span>
                      Be responsible for all activities that occur under your
                      account
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Prohibited Activities */}
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
                        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Prohibited Activities
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80 mb-4">
                    You may not use our services for any illegal or unauthorized
                    purpose. Prohibited activities include:
                  </p>
                  <ul className="space-y-3 text-base-content/70">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 mr-2 text-error mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Violating any laws or regulations
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 mr-2 text-error mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Infringing on intellectual property rights
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 mr-2 text-error mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Distributing malware or harmful code
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 mr-2 text-error mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Spamming or harassing other users
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 mr-2 text-error mt-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Attempting to gain unauthorized access to systems
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
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
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Intellectual Property
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80 mb-4">
                    All content, features, and functionality available on Flavor
                    AI are the exclusive property of our company and are
                    protected by international copyright, trademark, and other
                    intellectual property laws.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-base-content/70">
                    <div>
                      <h4 className="font-semibold text-base-content mb-2">
                        You Retain:
                      </h4>
                      <ul className="space-y-1">
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
                          Rights to your original content
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
                          Control over your personal data
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base-content mb-2">
                        We Retain:
                      </h4>
                      <ul className="space-y-1">
                        <li className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-warning"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Platform code and infrastructure
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-warning"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Brand trademarks and logos
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
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
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Limitation of Liability
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80 mb-4">
                    To the fullest extent permitted by applicable law, Flavor AI
                    shall not be liable for any indirect, incidental, special,
                    consequential, or punitive damages, or any loss of profits
                    or revenues.
                  </p>
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <p className="text-warning-content text-sm">
                      <strong>Important:</strong> Our liability is limited to
                      the maximum extent permitted by law. We provide the
                      service "as is" without warranties of any kind.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Termination of Access */}
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
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Termination of Access
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80 mb-4">
                    We may suspend or terminate your access to our services at
                    our sole discretion, without notice, for conduct that we
                    believe violates these Terms of Service or is harmful to
                    other users, us, or third parties, or for any other reason.
                  </p>
                  <ul className="space-y-2 text-base-content/70">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-info"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      We may terminate accounts that are inactive for an
                      extended period
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-info"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      You may terminate your account at any time through account
                      settings
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Governing Law */}
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
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Governing Law
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80">
                    These Terms of Service shall be governed by and construed in
                    accordance with the laws of [Your Country/State], without
                    regard to its conflict of law provisions. Any legal action
                    or proceeding arising under these Terms will be brought
                    exclusively in the courts located in [Your Jurisdiction].
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
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
                    Contact Information
                  </h2>
                  <p className="text-lg leading-relaxed text-base-content/80 mb-4">
                    If you have any questions about these Terms of Service,
                    please contact us:
                  </p>
                  <div className="space-y-2 text-base-content/70">
                    <a
                      href="https://github.com/Ayushjhawar8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-primary"
                    >
                      https://github.com/Ayushjhawar8
                    </a>
                  </div>
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
