import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SubscriptionTier, AuthFormData } from '../types';

interface UserContextType {
  user: User | null;
  login: (data: AuthFormData) => Promise<void>;
  signup: (data: AuthFormData) => Promise<void>;
  logout: () => void;
  updateSubscription: (tier: SubscriptionTier) => Promise<void>;
  decrementGenerations: () => void;
  canGenerateArt: () => boolean;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const signup = async (data: AuthFormData) => {
    if (!data.name || !data.email || !data.password) {
      throw new Error('All fields are required');
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some((u: User) => u.email === data.email)) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password, // In a real app, this would be hashed
      subscription: 'free',
      generationsLeft: 3,
    };

    // Save user to local storage
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Log in the new user
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const login = async (data: AuthFormData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (u: User) => u.email === data.email && u.password === data.password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateSubscription = async (tier: SubscriptionTier) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      subscription: tier,
      generationsLeft: tier === 'premium' ? Infinity : 3,
    };

    setUser(updatedUser);
    
    // Update user in users list
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const decrementGenerations = () => {
    if (!user || user.subscription === 'premium') return;

    const updatedUser = {
      ...user,
      generationsLeft: Math.max(0, user.generationsLeft - 1),
    };

    setUser(updatedUser);
    
    // Update user in users list
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const canGenerateArt = () => {
    if (!user) return false;
    return user.subscription === 'premium' || user.generationsLeft > 0;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateSubscription,
        decrementGenerations,
        canGenerateArt,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}