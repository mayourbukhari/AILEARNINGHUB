import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Trophy, Users, Bot, Award } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Courses',
      description: 'Learn from beginner to advanced with hands-on tutorials, quizzes, and real-world projects.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'Live Playground',
      description: 'Code and train ML models in real-time with our interactive Jupyter-like environment.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Challenges & Hackathons',
      description: 'Test your skills with coding challenges, competitions, and earn rewards.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Get instant help with code, explanations, and personalized learning guidance.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with learners worldwide, collaborate on projects, and share knowledge.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Award,
      title: 'Certificates',
      description: 'Earn industry-recognized certificates and showcase your AI/ML expertise.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Master AI
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools, resources, and community support 
            you need to become an AI expert.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;