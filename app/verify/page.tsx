"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  // We use the useSignUp hook to get access to the Clerk sign-up functionality
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // If the Clerk SDK is not loaded, we return null to prevent rendering issues
  if (!isLoaded) return null;

  /**
   * Handles the email verification process.
   * It attempts to verify the email with the code provided by the user.
   * On success, it creates a new active session and redirects to the home page.
   */
  const handleVerification = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      // If the verification is complete, set the active session and redirect
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // After successful verification, we redirect the user to the home page
        router.push("/");
      }
    } catch (err) {
      console.error("Error verifying email:", err);
      // Display the error message from Clerk or a generic one
      setError(err?.errors?.[0]?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-amber-100 justify-center min-h-screen p-4">
      <div className="w-full max-w-sm p-6 bg-colors-200 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-bold">Verify Your Email</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleVerification} className="space-y-4">
          <p className="text-sm text-gray-600">
            Please check your email for the verification code.
          </p>
          <input
            type="text"
            placeholder="Verification Code"
            className="w-full p-2 border rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Verify and Complete Signup"}
          </button>
        </form>

        <p className="text-sm">
          Didn't receive the code?{" "}
          <Link href="/signup" className="text-blue-500">
            Go back to signup
          </Link>
        </p>
      </div>
    </div>
  );
}
