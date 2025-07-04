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

// Mock database to store users
const getUsersFromStorage = () => {
  const users = localStorage.getItem('aiml_users_db');
  return users ? JSON.parse(users) : [];
};

const saveUsersToStorage = (users: any[]) => {
  localStorage.setItem('aiml_users_db', JSON.stringify(users));
};

const getCurrentUser = () => {
  const currentUser = localStorage.getItem('aiml_current_user');
  return currentUser ? JSON.parse(currentUser) : null;
};

const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('aiml_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('aiml_current_user');
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getUsersFromStorage();
      
      // Check for demo account
      if (email === 'demo@aiml.com' && password === 'demo123') {
        const demoUser: User = {
          id: 'demo',
          name: 'Alex Chen (Demo)',
          email: 'demo@aiml.com',
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
        
        setUser(demoUser);
        setCurrentUser(demoUser);
        setLoading(false);
        return;
      }
      
      // Find user in our mock database
      const existingUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (!existingUser) {
        throw new Error('Invalid email or password. Please check your credentials.');
      }
      
      // Remove password from user object before setting state
      const { password: _, ...userWithoutPassword } = existingUser;
      
      setUser(userWithoutPassword);
      setCurrentUser(userWithoutPassword);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getUsersFromStorage();
      
      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        throw new Error('An account with this email already exists. Please try logging in instead.');
      }
      
      // Create new user
      const newUser: User = {
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

      // Save user with password to mock database
      const userWithPassword = { ...newUser, password };
      users.push(userWithPassword);
      saveUsersToStorage(users);
      
      // Set current user (without password)
      setUser(newUser);
      setCurrentUser(newUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
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