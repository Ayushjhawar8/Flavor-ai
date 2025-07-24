"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      fetch("/api/user", { headers: { Authorization: `Bearer ${t}` } })
        .then(res => res.json())
        .then(data => {
          if (data.authenticated) {
            setUser(data.user);
            setToken(t);
          } else {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, action: "login" }),
    });
    const data = await res.json();
    if (data.token) {
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const register = async (name, email, password) => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, action: "register" }),
    });
    let data;
    try {
      data = await res.json();
    } catch {
      return { success: false, error: "Server error. Please try again." };
    }
    if (data.token) {
      // Registration successful, but require login
      return { success: true, message: "Registration successful! Please login." };
    }
    return { success: false, error: data.error };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 