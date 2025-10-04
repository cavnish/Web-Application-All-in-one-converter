// src/components/sections/HeroSection.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Zap, 
  Shield, 
  Clock, 
  Upload,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const demos = [
    { 
      from: 'PNG', 
      to: 'JPG', 
      color: 'from-purple-500 to-pink-500',
      icon: '🖼️'
    },
    { 
      from: 'MP4', 
      to: 'GIF', 
      color: 'from-blue-500 to-cyan-500',
      icon: '🎬'
    },
    { 
      from: 'PDF', 
      to: 'DOCX', 
      color: 'from-green-500 to-emerald-500',
      icon: '📄'
    },
    { 
      from: 'MP3', 
      to: 'WAV', 
      color: 'from-orange-500 to-red-500',
      icon: '🎵'
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentDemo((prev) => (prev + 1) % demos.length);
        setIsVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div>
            <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">World's Fastest File Converter</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Convert Anything,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Anytime
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Transform your files between 100+ formats with military-grade security, 
              lightning speed, and stunning quality. All in one beautiful interface.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/category/video')}
                className="inline-flex items-center px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                <Upload className="mr-3 w-5 h-5" />
                Start Converting Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-lg backdrop-blur-sm border border-white/20 transition-all duration-200"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 text-sm text-gray-300">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                <span>Auto-delete in 1 hour</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                <span>No registration required</span>
              </div>
            </motion.div>
          </div>

          {/* Animated Demo */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400">Online Converter</div>
              </div>

              <div className="text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDemo}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-center space-x-8 mb-6">
                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${demos[currentDemo].color} flex items-center justify-center shadow-lg`}>
                        <span className="text-white text-3xl">{demos[currentDemo].icon}</span>
                      </div>
                      
                      <motion.div
                        animate={{ 
                          x: [-10, 10, -10],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ArrowRight className="w-8 h-8 text-blue-400" />
                      </motion.div>

                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${demos[currentDemo].color} flex items-center justify-center shadow-lg`}>
                        <span className="text-white text-2xl font-bold">{demos[currentDemo].to}</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {demos[currentDemo].from} → {demos[currentDemo].to}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Lightning fast conversion with premium quality
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 text-center">
                  <div className="inline-flex space-x-1">
                    {demos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentDemo(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentDemo ? 'bg-blue-500 w-6' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements around the demo */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg"
            >
              <Zap className="w-4 h-4 text-white" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -right-4 w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center shadow-lg"
            >
              <Shield className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};