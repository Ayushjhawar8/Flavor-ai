"use client";

import { useState, useEffect } from "react";
import { mockUsers, getCurrentUser, setCurrentUser } from "@/lib/mockAuth";
import { User } from "lucide-react";

export default function MockUserSwitcher() {
  const [currentUser, setCurrentUserState] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentUserState(getCurrentUser());
  }, []);

  const handleUserSwitch = (userId) => {
    const newUser = setCurrentUser(userId);
    setCurrentUserState(newUser);
    setIsOpen(false);
    window.location.reload(); 
  };

  if (!currentUser) return null;

  return (
    <div className="dropdown dropdown-end">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost btn-circle avatar"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 rounded-full">
          <img src={currentUser.avatar} alt={currentUser.name} />
        </div>
      </div>
      
      {isOpen && (
        <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li className="menu-title">
            <span>Switch User (Demo)</span>
          </li>
          {mockUsers.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => handleUserSwitch(user.id)}
                className={`flex items-center gap-2 ${
                  currentUser.id === user.id ? 'active' : ''
                }`}
              >
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs opacity-60">{user.email}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}