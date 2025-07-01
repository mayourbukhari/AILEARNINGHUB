import React from 'react';
import { Brain, Twitter, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AI-ML Hub</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              The premier platform for learning AI and Machine Learning. Join thousands of learners 
              mastering the future of technology with interactive courses and hands-on projects.
            </p>
            
            {/* Sponsor Credit */}
            <div className="mb-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Proudly sponsored by:</p>
              <a 
                href="https://cyberfort.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span className="font-semibold">CyberFort</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Developer Credit */}
            <div className="mb-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Developed by:</p>
              <a 
                href="https://www.linkedin.com/in/syed-mohsin-bukhari/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span className="font-semibold">Syed Mohsin Bukhari</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-xs text-gray-500 mt-1">AI & ML Researcher</p>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/syed-mohsin-bukhari/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Playground</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Challenges</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 AI-ML Hub. All rights reserved. Made with ❤️ for the AI community.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Sponsored by <a href="https://cyberfort.tech" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">CyberFort</a> • 
            Developed by <a href="https://www.linkedin.com/in/syed-mohsin-bukhari/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Syed Mohsin Bukhari</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;