import React, { createContext, useContext, useState } from 'react';

interface User {
  email: string;
  uid: string;
}

interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signup = async (email: string, password: string) => {
    // Mock signup - just create a user object
    const user: User = {
      email,
      uid: Math.random().toString(36).substring(7)
    };
    setCurrentUser(user);
  };

  const login = async (email: string, password: string) => {
    // Mock login - just create a user object
    const user: User = {
      email,
      uid: Math.random().toString(36).substring(7)
    };
    setCurrentUser(user);
  };

  const logout = async () => {
    setCurrentUser(null);
  };

  const signInWithGoogle = async () => {
    // Mock Google sign in
    const user: User = {
      email: 'demo@google.com',
      uid: Math.random().toString(36).substring(7)
    };
    setCurrentUser(user);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 