import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Calendar, BookOpen, Code, Award, TrendingUp, Clock, Star, Users, Brain, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total XP', value: user?.xp?.toLocaleString() || '0', icon: Trophy, color: 'text-yellow-500', change: '+120 this week' },
    { label: 'Courses Completed', value: user?.coursesCompleted?.toString() || '0', icon: BookOpen, color: 'text-blue-500', change: '+2 this month' },
    { label: 'Coding Hours', value: user?.stats?.timeSpent?.toString() || '0', icon: Code, color: 'text-purple-500', change: '+12 this week' },
    { label: 'Certificates', value: user?.certificates?.toString() || '0', icon: Award, color: 'text-green-500', change: '+1 this month' },
  ];

  const recentActivity = [
    { title: 'Completed: Python for AI & ML', time: '2 hours ago', type: 'course', icon: BookOpen },
    { title: 'Solved: Linear Regression Challenge', time: '1 day ago', type: 'challenge', icon: Trophy },
    { title: 'Started: Deep Learning with PyTorch', time: '3 days ago', type: 'course', icon: BookOpen },
    { title: 'Earned: ML Fundamentals Certificate', time: '1 week ago', type: 'certificate', icon: Award },
    { title: 'Joined: Neural Networks Study Group', time: '1 week ago', type: 'community', icon: Users },
  ];

  const achievements = [
    { title: 'First Steps', description: 'Complete your first course', earned: user?.coursesCompleted > 0, icon: '🎯', rarity: 'Common' },
    { title: 'Code Warrior', description: 'Solve 10 coding challenges', earned: user?.stats?.completedChallenges >= 10, icon: '⚔️', rarity: 'Uncommon' },
    { title: 'Speed Learner', description: 'Complete a course in under 3 days', earned: user?.coursesCompleted >= 3, icon: '⚡', rarity: 'Rare' },
    { title: 'ML Master', description: 'Complete all ML courses', earned: false, icon: '🧠', rarity: 'Epic' },
    { title: 'Community Helper', description: 'Help 50 fellow learners', earned: false, icon: '🤝', rarity: 'Rare' },
    { title: 'Research Pioneer', description: 'Publish an AI research paper', earned: false, icon: '🔬', rarity: 'Legendary' },
  ];

  const learningPath = [
    { title: 'Python Fundamentals', progress: user?.stats?.languageProgress?.python || 0, status: user?.stats?.languageProgress?.python >= 100 ? 'completed' : user?.stats?.languageProgress?.python > 0 ? 'in-progress' : 'locked', modules: 12, timeSpent: '24h' },
    { title: 'Machine Learning Basics', progress: 85, status: 'in-progress', modules: 15, timeSpent: '32h' },
    { title: 'Deep Learning', progress: 30, status: 'in-progress', modules: 20, timeSpent: '18h' },
    { title: 'Natural Language Processing', progress: 0, status: 'locked', modules: 18, timeSpent: '0h' },
    { title: 'Computer Vision', progress: 0, status: 'locked', modules: 16, timeSpent: '0h' },
    { title: 'MLOps & Deployment', progress: 0, status: 'locked', modules: 14, timeSpent: '0h' },
  ];

  const upcomingDeadlines = [
    { title: 'Deep Learning Assignment', dueDate: 'Tomorrow', course: 'Deep Learning with PyTorch', priority: 'high' },
    { title: 'ML Challenge Submission', dueDate: 'In 3 days', course: 'Weekly Challenge', priority: 'medium' },
    { title: 'Computer Vision Quiz', dueDate: 'Next week', course: 'Computer Vision', priority: 'low' },
  ];

  const recommendations = [
    { title: 'Advanced Neural Networks', reason: 'Based on your progress in Deep Learning', type: 'course' },
    { title: 'Kaggle Competition: House Prices', reason: 'Perfect for your ML skills level', type: 'challenge' },
    { title: 'TensorFlow Study Group', reason: 'Connect with peers learning similar topics', type: 'community' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in to access your personalized learning dashboard and track your progress.
          </p>
        </div>
      </div>
    );
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100';
      case 'Uncommon': return 'text-green-600 bg-green-100';
      case 'Rare': return 'text-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 bg-purple-100';
      case 'Legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 text-red-700';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-700';
      case 'low': return 'border-green-200 bg-green-50 text-green-700';
      default: return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-xl text-gray-600">
                Ready to continue your AI journey?
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{user.xp} XP</div>
              <div className="text-sm text-gray-500">{user.level} Level</div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                </div>
              </div>
              <p className="text-xs text-green-600 font-medium">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'learning', label: 'Learning Path' },
                { id: 'achievements', label: 'Achievements' },
                { id: 'activity', label: 'Activity' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Learning Streak */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-orange-500" />
                    Learning Streak
                  </h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-4xl font-bold text-orange-500 mb-2">{user.streak}</div>
                      <p className="text-gray-600">Days in a row</p>
                      <p className="text-sm text-gray-500 mt-2">Keep it up! 🔥</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">Next Milestone</div>
                      <div className="text-sm text-gray-500">10 days streak</div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all"
                          style={{ width: `${(user.streak / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-red-500" />
                    Upcoming Deadlines
                  </h2>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(deadline.priority)}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{deadline.title}</h3>
                            <p className="text-sm opacity-75">{deadline.course}</p>
                          </div>
                          <span className="text-sm font-medium">{deadline.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rank</span>
                      <span className="font-semibold">#{user.stats?.rank || 999}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Study Time</span>
                      <span className="font-semibold">{user.stats?.timeSpent || 0}h this month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accuracy</span>
                      <span className="font-semibold">{user.stats?.accuracy || 0}%</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    Recommended for You
                  </h3>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900">{rec.title}</h4>
                        <p className="text-xs text-blue-700 mt-1">{rec.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-blue-500" />
                Your Learning Path
              </h2>
              
              <div className="space-y-6">
                {learningPath.map((item, index) => (
                  <div key={index} className="flex items-center space-x-6 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      {item.status === 'completed' ? (
                        <Trophy className="w-6 h-6 text-white" />
                      ) : item.status === 'in-progress' ? (
                        <Clock className="w-6 h-6 text-white" />
                      ) : (
                        <span className="text-white text-lg">🔒</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <span className="text-sm text-gray-500">{item.progress}%</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span>{item.modules} modules</span>
                        <span>•</span>
                        <span>{item.timeSpent} spent</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            item.status === 'completed' ? 'bg-green-500' :
                            item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-yellow-500" />
                Achievements
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      achievement.earned 
                        ? 'border-yellow-200 bg-yellow-50 shadow-lg' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h3 className={`font-bold text-lg mb-2 ${
                        achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm mb-3 ${
                        achievement.earned ? 'text-yellow-600' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-purple-500" />
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'course' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'challenge' ? 'bg-orange-100 text-orange-600' :
                      activity.type === 'certificate' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;