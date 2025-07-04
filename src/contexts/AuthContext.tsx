import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('aiml_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from your backend
      const userData: User = {
        id: '1',
        name: email === 'demo@aiml.com' ? 'Alex Chen' : 'Student User',
        email,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        level: 'Intermediate',
        xp: 2450,
        streak: 7,
        coursesCompleted: 8,
        certificates: 3,
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        preferences: {
          theme: 'light',
          notifications: true,
          emailUpdates: true
        },
        stats: {
          totalChallenges: 45,
          completedChallenges: 23,
          currentStreak: 7,
          totalXP: 2450,
          rank: 247,
          accuracy: 94.2,
          timeSpent: 156,
          languageProgress: {
            python: 85,
            javascript: 72,
            java: 45,
            cpp: 38,
            sql: 67
          }
        }
      };

      setUser(userData);
      localStorage.setItem('aiml_user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: `https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`,
        level: 'Beginner',
        xp: 0,
        streak: 0,
        coursesCompleted: 0,
        certificates: 0,
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        preferences: {
          theme: 'light',
          notifications: true,
          emailUpdates: true
        },
        stats: {
          totalChallenges: 45,
          completedChallenges: 0,
          currentStreak: 0,
          totalXP: 0,
          rank: 999,
          accuracy: 0,
          timeSpent: 0,
          languageProgress: {
            python: 0,
            javascript: 0,
            java: 0,
            cpp: 0,
            sql: 0
          }
        }
      };

      setUser(userData);
      localStorage.setItem('aiml_user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aiml_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};