import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Heart, Share2, BookOpen, Code, Trophy, Star, Plus, Search, Filter } from 'lucide-react';

interface CommunityProps {
  user?: any;
}

const Community: React.FC<CommunityProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const discussions = [
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      title: 'Best practices for hyperparameter tuning in neural networks?',
      content: 'I\'ve been working on a deep learning project and struggling with finding the optimal hyperparameters. What are your go-to strategies?',
      category: 'Deep Learning',
      likes: 24,
      replies: 8,
      timeAgo: '2 hours ago',
      tags: ['neural-networks', 'hyperparameters', 'optimization'],
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      author: 'Alex Rodriguez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      title: 'Sharing my first ML project - Sentiment Analysis!',
      content: 'Just completed my first real ML project analyzing movie reviews. Used LSTM and achieved 89% accuracy. Would love feedback!',
      category: 'Project Showcase',
      likes: 42,
      replies: 15,
      timeAgo: '4 hours ago',
      tags: ['nlp', 'lstm', 'sentiment-analysis', 'beginner'],
      isLiked: true,
      isBookmarked: true
    },
    {
      id: 3,
      author: 'Dr. Emily Watson',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      title: 'Weekly Challenge: Predict House Prices with Limited Data',
      content: 'This week\'s challenge focuses on feature engineering and handling missing data. Dataset has only 200 samples. Let\'s see who can achieve the best score!',
      category: 'Challenges',
      likes: 67,
      replies: 23,
      timeAgo: '1 day ago',
      tags: ['challenge', 'regression', 'feature-engineering'],
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 4,
      author: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      title: 'Career advice: Transitioning from web dev to ML engineer',
      content: 'Been a web developer for 5 years, now want to pivot to ML. What skills should I focus on? Any bootcamp recommendations?',
      category: 'Career',
      likes: 18,
      replies: 12,
      timeAgo: '2 days ago',
      tags: ['career', 'transition', 'advice'],
      isLiked: false,
      isBookmarked: false
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', points: 4580, badge: 'ML Expert', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop', change: '+120' },
    { rank: 2, name: 'Sarah Kim', points: 4120, badge: 'Data Scientist', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop', change: '+85' },
    { rank: 3, name: 'David Park', points: 3890, badge: 'AI Researcher', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop', change: '+92' },
    { rank: 4, name: 'Emma Wilson', points: 3650, badge: 'Deep Learning Pro', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop', change: '+67' },
    { rank: 5, name: 'John Martinez', points: 3420, badge: 'ML Engineer', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop', change: '+54' },
  ];

  const studyGroups = [
    {
      name: 'Neural Networks Study Group',
      members: 156,
      description: 'Weekly discussions on deep learning architectures and implementations',
      nextSession: 'Tomorrow 7:00 PM',
      level: 'Intermediate',
      isJoined: user ? true : false
    },
    {
      name: 'Beginner ML Bootcamp',
      members: 89,
      description: 'Perfect for those starting their ML journey. We cover basics together!',
      nextSession: 'Friday 6:00 PM',
      level: 'Beginner',
      isJoined: false
    },
    {
      name: 'Computer Vision Club',
      members: 203,
      description: 'Image processing, CNNs, and latest vision research discussions',
      nextSession: 'Sunday 4:00 PM',
      level: 'Advanced',
      isJoined: false
    },
    {
      name: 'NLP Research Group',
      members: 134,
      description: 'Exploring transformers, GPT, and cutting-edge NLP techniques',
      nextSession: 'Wednesday 8:00 PM',
      level: 'Advanced',
      isJoined: user ? true : false
    }
  ];

  const categories = ['All', 'Deep Learning', 'Project Showcase', 'Challenges', 'Career', 'Research', 'Beginner'];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || discussion.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Deep Learning': return 'bg-purple-100 text-purple-800';
      case 'Project Showcase': return 'bg-green-100 text-green-800';
      case 'Challenges': return 'bg-orange-100 text-orange-800';
      case 'Career': return 'bg-blue-100 text-blue-800';
      case 'Research': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLike = (discussionId: number) => {
    if (!user) {
      alert('Please sign in to like posts');
      return;
    }
    // Handle like functionality
  };

  const handleJoinGroup = (groupName: string) => {
    if (!user) {
      alert('Please sign in to join study groups');
      return;
    }
    alert(`Successfully joined ${groupName}!`);
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                AI-ML <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Community</span>
              </h1>
              <p className="text-xl text-gray-600">
                Connect, learn, and grow with fellow AI enthusiasts worldwide
              </p>
            </div>
            {user && (
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                <span>New Post</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Active Members', value: '12,500+', icon: Users, change: '+234 this week' },
            { label: 'Discussions', value: '3,200+', icon: MessageCircle, change: '+89 today' },
            { label: 'Projects Shared', value: '890+', icon: Code, change: '+12 this week' },
            { label: 'Study Groups', value: '45+', icon: BookOpen, change: '+3 this month' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                </div>
              </div>
              <p className="text-xs text-green-600 font-medium">{stat.change}</p>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'discussions', label: 'Discussions', icon: MessageCircle },
                { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
                { id: 'study-groups', label: 'Study Groups', icon: Users },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Search and Filters for Discussions */}
        {activeTab === 'discussions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'discussions' && (
            <div className="space-y-6">
              {filteredDiscussions.map((discussion) => (
                <div key={discussion.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={discussion.avatar} 
                      alt={discussion.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-gray-900">{discussion.author}</h3>
                          <span className="text-sm text-gray-500">{discussion.timeAgo}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(discussion.category)}`}>
                          {discussion.category}
                        </span>
                      </div>
                      
                      <h2 className="text-xl font-bold text-gray-900 mb-3">{discussion.title}</h2>
                      <p className="text-gray-600 mb-4">{discussion.content}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {discussion.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <motion.button 
                          onClick={() => handleLike(discussion.id)}
                          className={`flex items-center space-x-1 transition-colors ${
                            discussion.isLiked ? 'text-red-500' : 'hover:text-red-500'
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Heart className={`w-4 h-4 ${discussion.isLiked ? 'fill-current' : ''}`} />
                          <span>{discussion.likes}</span>
                        </motion.button>
                        <motion.button 
                          className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{discussion.replies} replies</span>
                        </motion.button>
                        <motion.button 
                          className="flex items-center space-x-1 hover:text-green-500 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                  Top Contributors This Month
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {leaderboard.map((user) => (
                  <motion.div 
                    key={user.rank} 
                    className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        user.rank === 1 ? 'bg-yellow-500' :
                        user.rank === 2 ? 'bg-gray-400' :
                        user.rank === 3 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {user.rank}
                      </div>
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.badge}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-green-600">{user.change} this week</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'study-groups' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyGroups.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(group.level)}`}>
                      {group.level}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Next: {group.nextSession}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => handleJoinGroup(group.name)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      group.isJoined
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {group.isJoined ? 'Joined ✓' : 'Join Group'}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Community;