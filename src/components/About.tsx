import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Linkedin, Github, Mail, Award, Users, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI-ML Hub</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering the next generation of AI innovators through comprehensive education and hands-on experience
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To democratize AI and Machine Learning education by providing accessible, comprehensive, and practical learning experiences. 
              We believe that everyone should have the opportunity to learn and contribute to the future of artificial intelligence, 
              regardless of their background or experience level.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To create a global community of AI practitioners who are not only technically proficient but also ethically conscious. 
              We envision a future where AI technology is developed and deployed responsibly, with a focus on solving real-world problems 
              and improving lives across all sectors of society.
            </p>
          </motion.div>
        </div>

        {/* Sponsor Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-20"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Proudly Sponsored By</h2>
            <p className="text-gray-600">Our platform is made possible through the generous support of industry leaders</p>
          </div>
          
          <div className="flex flex-col items-center">
            <motion.a
              href="https://cyberfort.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-4 p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">CF</span>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  CyberFort
                </h3>
                <p className="text-gray-600">Leading cybersecurity and technology solutions</p>
                <div className="flex items-center space-x-1 text-blue-600 mt-2">
                  <span className="text-sm">Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Developer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Developer</h2>
            <p className="text-gray-600">The visionary behind AI-ML Hub</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-4xl">SMB</span>
                </div>
              </motion.div>

              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Syed Mohsin Bukhari</h3>
                <p className="text-lg text-blue-600 mb-4">AI & ML Researcher | M.Tech Student</p>
                
                <div className="prose prose-gray max-w-none mb-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    I am an AI & ML researcher passionate about developing cutting-edge AI solutions in healthcare, manufacturing, and automation. 
                    Currently pursuing my M.Tech in Artificial Intelligence & Machine Learning at Lovely Professional University, 
                    specializing in machine learning, deep learning, and ethical AI development.
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    My research focuses on AI in healthcare, where I am building machine learning models for breast cancer detection to improve early diagnosis. 
                    I am also working on AI-driven quality control for manufacturing, implementing defect detection and predictive maintenance to enhance efficiency.
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    I have hands-on experience in robotics and automation, working with Arduino, Raspberry Pi, and Jetson Nano to create intelligent robotic systems. 
                    Additionally, I am skilled in web development, designing user-friendly websites and scalable e-commerce platforms for businesses.
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed">
                    My technical expertise includes machine learning frameworks like TensorFlow, Keras, and PyTorch, secure coding practices, 
                    IoT and embedded systems, and Frontend web development using Flask, Django, and JavaScript.
                  </p>
                </div>

                {/* Skills & Expertise */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Machine Learning', 'Deep Learning', 'Healthcare AI', 'Computer Vision', 
                      'NLP', 'Robotics', 'IoT', 'Web Development', 'TensorFlow', 'PyTorch', 
                      'Python', 'JavaScript', 'Ethical AI'
                    ].map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Links */}
                <div className="flex justify-center lg:justify-start space-x-4">
                  <motion.a
                    href="https://www.linkedin.com/in/syed-mohsin-bukhari/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </motion.a>
                  
                  <motion.button
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact</span>
                  </motion.button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm italic">
                    "I am always open to collaborations, research opportunities, and innovative AI-driven projects. 
                    Let's connect and work together to shape the future of AI!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Impact</h2>
            <p className="text-gray-600">Making a difference in AI education worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Active Learners', value: '10,000+', color: 'from-blue-500 to-cyan-500' },
              { icon: Award, label: 'Certificates Issued', value: '2,500+', color: 'from-green-500 to-teal-500' },
              { icon: Target, label: 'Projects Completed', value: '5,000+', color: 'from-purple-500 to-pink-500' },
              { icon: Heart, label: 'Success Stories', value: '1,200+', color: 'from-orange-500 to-red-500' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;