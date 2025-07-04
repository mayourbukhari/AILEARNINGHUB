import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Courses from './components/Courses';
import Playground from './components/Playground';
import Dashboard from './components/Dashboard';
import Community from './components/Community';
import Footer from './components/Footer';
import About from './components/About';

type Section = 'home' | 'courses' | 'playground' | 'dashboard' | 'community' | 'about';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'courses':
        return <Courses />;
      case 'playground':
        return <Playground />;
      case 'dashboard':
        return <Dashboard />;
      case 'community':
        return <Community />;
      case 'about':
        return <About />;
      default:
        return (
          <>
            <Hero onGetStarted={() => setActiveSection('courses')} />
            <Features />
            <Courses featured={true} />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Header 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
        />
        
        <motion.main
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-16"
        >
          {renderSection()}
        </motion.main>
        
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;