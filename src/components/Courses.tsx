import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, Play, BookOpen, CheckCircle, Lock, Filter, Search } from 'lucide-react';

interface CoursesProps {
  featured?: boolean;
  user?: any;
}

const Courses: React.FC<CoursesProps> = ({ featured = false, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const courses = [
    {
      id: 1,
      title: 'Python for AI & ML',
      description: 'Master Python programming fundamentals with focus on AI and ML libraries.',
      level: 'Beginner',
      duration: '6 weeks',
      students: 12500,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Python Basics', 'NumPy', 'Pandas', 'Matplotlib'],
      progress: user ? 0 : 0,
      category: 'Programming',
      price: 'Free',
      instructor: 'Dr. Sarah Johnson',
      enrolled: user ? false : false
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      description: 'Learn core ML algorithms and concepts with hands-on implementation.',
      level: 'Intermediate',
      duration: '8 weeks',
      students: 8900,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'],
      progress: user ? 65 : 0,
      category: 'Machine Learning',
      price: 'Free',
      instructor: 'Prof. Michael Chen',
      enrolled: user ? true : false
    },
    {
      id: 3,
      title: 'Deep Learning with PyTorch',
      description: 'Build neural networks and deep learning models using PyTorch framework.',
      level: 'Advanced',
      duration: '10 weeks',
      students: 6200,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Neural Networks', 'CNN', 'RNN', 'Transfer Learning'],
      progress: user ? 25 : 0,
      category: 'Deep Learning',
      price: 'Premium',
      instructor: 'Dr. Emily Rodriguez',
      enrolled: user ? true : false
    },
    {
      id: 4,
      title: 'Natural Language Processing',
      description: 'Process and analyze text data using modern NLP techniques and transformers.',
      level: 'Advanced',
      duration: '8 weeks',
      students: 4800,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/8386433/pexels-photo-8386433.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Text Processing', 'Transformers', 'BERT', 'GPT'],
      progress: 0,
      category: 'NLP',
      price: 'Premium',
      instructor: 'Dr. James Wilson',
      enrolled: false
    },
    {
      id: 5,
      title: 'Computer Vision',
      description: 'Learn to process and analyze images using deep learning techniques.',
      level: 'Advanced',
      duration: '9 weeks',
      students: 5600,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/8386435/pexels-photo-8386435.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Image Processing', 'CNN', 'Object Detection', 'Segmentation'],
      progress: 0,
      category: 'Computer Vision',
      price: 'Premium',
      instructor: 'Dr. Lisa Zhang',
      enrolled: false
    },
    {
      id: 6,
      title: 'MLOps & Deployment',
      description: 'Deploy ML models to production with best practices and monitoring.',
      level: 'Expert',
      duration: '6 weeks',
      students: 3200,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/8386441/pexels-photo-8386441.jpeg?auto=compress&cs=tinysrgb&w=400',
      topics: ['Docker', 'Kubernetes', 'CI/CD', 'Model Monitoring'],
      progress: 0,
      category: 'MLOps',
      price: 'Premium',
      instructor: 'Alex Thompson',
      enrolled: false
    }
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const categories = ['All', 'Programming', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const displayCourses = featured ? filteredCourses.slice(0, 3) : filteredCourses;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEnrollment = (courseId: number) => {
    if (!user) {
      alert('Please sign in to enroll in courses');
      return;
    }
    
    const course = courses.find(c => c.id === courseId);
    if (course) {
      course.enrolled = true;
      alert(`Successfully enrolled in ${course.title}!`);
    }
  };

  return (
    <section className={`py-20 ${featured ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {featured ? 'Featured' : 'All'} Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {featured 
              ? 'Start your AI journey with our most popular courses designed by industry experts.'
              : 'Comprehensive curriculum covering all aspects of AI and Machine Learning.'
            }
          </p>
        </motion.div>

        {/* Search and Filters */}
        {!featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-4">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level} Level</option>
                  ))}
                </select>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category === 'All' ? 'All Categories' : category}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.price === 'Free' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {course.price}
                  </span>
                </div>
                
                {course.enrolled && course.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Progress: {course.progress}%</span>
                      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {course.title}
                  </h3>
                  {course.enrolled && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                
                <p className="text-gray-600 mb-3 leading-relaxed">
                  {course.description}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  Instructor: {course.instructor}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {course.topics.map((topic, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <motion.button
                  onClick={() => handleEnrollment(course.id)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                    course.enrolled 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : course.price === 'Premium' && !user
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  }`}
                  whileHover={{ scale: course.enrolled ? 1 : 1.02 }}
                  whileTap={{ scale: course.enrolled ? 1 : 0.98 }}
                  disabled={course.price === 'Premium' && !user}
                >
                  {course.enrolled ? (
                    <>
                      <BookOpen className="w-4 h-4" />
                      <span>Continue Learning</span>
                    </>
                  ) : course.price === 'Premium' && !user ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Sign in to Access</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Enroll Now</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-white text-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl border border-gray-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Courses
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Courses;