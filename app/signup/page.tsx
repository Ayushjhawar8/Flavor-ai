"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // New state for username
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded) return null;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signUp.create({
        emailAddress: email,
        username, // Pass the username to the Clerk API
        password,
      });

      if (result.status === "complete") {
        if (result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
          router.push("/");
        } else {
          setError("Session not created. Please try logging in.");
        }
      } else if (result.status ) {
        setPendingVerification(true);
      }
    } catch (err) {
      console.error("Error creating user:", err);
      setError(err?.errors?.[0]?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      console.error("Error verifying email:", err);
      setError(err?.errors?.[0]?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error("Google sign-up failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-amber-100 justify-center min-h-screen p-4">
      <div className="w-full max-w-sm p-6 bg-colors-200 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-bold">Signup</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!pendingVerification ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* New input for username */}
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Add this div for the CAPTCHA widget */}
            {isLoaded && <div id="clerk-captcha"></div>}
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-600 rounded flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Signup"}
            </button>
          </form>
        ) : (
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
        )}

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full p-2 bg-red-500 text-white rounded flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Continue with Google"}
        </button>

        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
