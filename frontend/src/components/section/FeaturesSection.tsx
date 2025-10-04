// src/components/sections/FeaturesSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Cloud, 
  Smartphone,
  Lock,
  Globe,
  Award,
  Users
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Convert files in seconds with our optimized processing engine',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Military-grade encryption with automatic file deletion after 1 hour',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Cloud,
      title: 'Cloud Powered',
      description: 'No software installation required - works directly in your browser',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Perfectly optimized for all devices and screen sizes',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Lock,
      title: 'No Watermarks',
      description: 'Get clean, professional results without any branding',
      color: 'from-red-400 to-rose-500'
    },
    {
      icon: Globe,
      title: '100+ Formats',
      description: 'Support for virtually every file format you\'ll ever need',
      color: 'from-indigo-400 to-purple-500'
    },
  ];

  const stats = [
    { number: '10M+', label: 'Files Converted', icon: Users },
    { number: '100+', label: 'Supported Formats', icon: Award },
    { number: '99.9%', label: 'Uptime', icon: Zap },
    { number: '0', label: 'Watermarks', icon: Lock },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-20 h-1 bg-gradient-to-r ${feature.color} rounded-full transition-all duration-300`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Trusted by professionals worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Trust badges would go here */}
            <div className="text-2xl font-bold text-gray-400">⚡</div>
            <div className="text-2xl font-bold text-gray-400">🔒</div>
            <div className="text-2xl font-bold text-gray-400">🎯</div>
            <div className="text-2xl font-bold text-gray-400">🚀</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};