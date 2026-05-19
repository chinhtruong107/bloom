"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Initialize from local storage on mount (simulating persisted session)
  useEffect(() => {
    const storedUser = localStorage.getItem("bloom_auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }
  }, []);

  const login = (userData: User) => {
    // Generate an avatar if not provided
    const userWithAvatar = {
      ...userData,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(userData.name)}`
    };
    setUser(userWithAvatar);
    localStorage.setItem("bloom_auth_user", JSON.stringify(userWithAvatar));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bloom_auth_user");
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updatedUser = { ...prev, ...data };
      localStorage.setItem("bloom_auth_user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
