"use client";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthStatus() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  if (loading) return null;
  if (!user) {
    return (
      <div className="flex gap-2 ml-2">
        <a href="/login" className="btn btn-sm btn-outline text-white">Login</a>
        <a href="/register" className="btn btn-sm btn-primary text-white">Register</a>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 ml-2">
      <span className="text-white">Hello, {user.name}</span>
      <button className="btn btn-sm btn-error" onClick={() => { logout(); router.push("/"); }}>Logout</button>
    </div>
  );
} 