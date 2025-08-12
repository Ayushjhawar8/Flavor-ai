"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const { isLoaded, signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isLoaded) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setIsEmailSent(true);
    } catch (err: any) {
      console.error("Error sending password reset email:", err);
      if (err.errors?.[0]?.code === "form_identifier_not_found") {
        setError("Account with this email does not exist.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-amber-100 justify-center min-h-screen p-4">
      <div className="w-full max-w-sm p-6 bg-colors-200 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-sm text-gray-600">
          {isEmailSent
            ? "A password reset email has been sent. Please check your inbox."
            : "Enter your email address to receive a password reset link."}
        </p>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        {!isEmailSent && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-600 rounded flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="text-center text-sm">
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}