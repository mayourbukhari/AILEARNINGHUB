import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [user, setUser] = useState<any>(null);

  const renderSection = () => {
    switch (activeSection) {
      case 'courses':
        return <Courses user={user} />;
      case 'playground':
        return <Playground user={user} />;
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'community':
        return <Community user={user} />;
      case 'about':
        return <About />;
      default:
        return (
          <>
            <Hero onGetStarted={() => setActiveSection('courses')} />
            <Features />
            <Courses featured={true} user={user} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        user={user}
        setUser={setUser}
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
  );
}

export default App;