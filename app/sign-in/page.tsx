"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      if (err.errors?.[0]?.code === "identifier_not_found") {
        setError("Could not find your account. Please signup to continue.");
      } else if (err.errors?.[0]?.code === "invalid_credentials") {
        setError("Invalid email or password.");
      } else {
        setError("Something went wrong.");
      }
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error("Google login failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-amber-100 min-h-screen p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-6  bg-colors-200 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-600 rounded flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Login"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full p-2 bg-red-500 text-white rounded flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Continue with Google"}
        </button>

        <Link href="/forget_password" className="text-sm text-blue-500">
          Forgot password?
        </Link>

        <p className="text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}