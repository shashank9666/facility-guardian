import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "technician" | "supervisor" | "admin" | "superadmin";

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers: Record<UserRole, User> = {
  technician: { id: "t1", name: "Ravi Kumar", role: "technician", email: "ravi@facility.com" },
  supervisor: { id: "s1", name: "Priya Sharma", role: "supervisor", email: "priya@facility.com" },
  admin: { id: "a1", name: "Amit Patel", role: "admin", email: "amit@facility.com" },
  superadmin: { id: "sa1", name: "System Admin", role: "superadmin", email: "admin@system.com" },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((role: UserRole) => {
    setUser(mockUsers[role]);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
