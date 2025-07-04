export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: string;
  xp: number;
  streak: number;
  coursesCompleted: number;
  certificates: number;
  joinedAt: string;
  lastActive: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    emailUpdates: boolean;
  };
  stats: {
    totalChallenges: number;
    completedChallenges: number;
    currentStreak: number;
    totalXP: number;
    rank: number;
    accuracy: number;
    timeSpent: number;
    languageProgress: {
      python: number;
      javascript: number;
      java: number;
      cpp: number;
      sql: number;
    };
  };
}