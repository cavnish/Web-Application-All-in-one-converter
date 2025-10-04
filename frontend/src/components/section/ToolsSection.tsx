// src/components/sections/ToolsSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  Image, 
  FileText, 
  Smile, 
  Settings,
  Zap,
  Star,
  TrendingUp
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: 'video' | 'image' | 'pdf' | 'gif' | 'other';
  icon: any;
  description: string;
  featured?: boolean;
  popular?: boolean;
  route: string;
}

export const ToolsSection: React.FC = () => {
  const navigate = useNavigate();

  const tools: Tool[] = [
    // Video & Audio
    { 
      id: 'video-converter', 
      name: 'Video Converter', 
      category: 'video', 
      icon: Video, 
      description: 'Convert between 50+ video formats', 
      featured: true, 
      popular: true,
      route: '/convert/video'
    },
    { 
      id: 'audio-converter', 
      name: 'Audio Converter', 
      category: 'video', 
      icon: FileText, 
      description: 'Transform audio files effortlessly', 
      popular: true,
      route: '/convert/audio'
    },
    { 
      id: 'mp4-to-mp3', 
      name: 'MP4 to MP3', 
      category: 'video', 
      icon: TrendingUp, 
      description: 'Extract audio from videos quickly',
      route: '/convert/mp4-to-mp3'
    },
    { 
      id: 'video-to-gif', 
      name: 'Video to GIF', 
      category: 'video', 
      icon: Smile, 
      description: 'Create GIFs from video clips',
      route: '/convert/video-to-gif'
    },

    // Image
    { 
      id: 'image-converter', 
      name: 'Image Converter', 
      category: 'image', 
      icon: Image, 
      description: 'Convert between image formats', 
      featured: true,
      route: '/convert/image'
    },
    { 
      id: 'webp-to-png', 
      name: 'WEBP to PNG', 
      category: 'image', 
      icon: Image, 
      description: 'Modern format conversion', 
      popular: true,
      route: '/convert/webp-to-png'
    },
    { 
      id: 'heic-to-jpg', 
      name: 'HEIC to JPG', 
      category: 'image', 
      icon: Image, 
      description: 'Apple format conversion',
      route: '/convert/image' // Can use query params for specific conversion
    },
    { 
      id: 'jpg-to-png', 
      name: 'JPG to PNG', 
      category: 'image', 
      icon: Image, 
      description: 'Convert JPG images to PNG',
      route: '/convert/jpg-to-png'
    },

    // PDF & Documents
    { 
      id: 'pdf-converter', 
      name: 'PDF Converter', 
      category: 'pdf', 
      icon: FileText, 
      description: 'Convert PDFs to various formats', 
      featured: true,
      route: '/convert/pdf'
    },
    { 
      id: 'pdf-to-word', 
      name: 'PDF to Word', 
      category: 'pdf', 
      icon: FileText, 
      description: 'Edit PDFs in Word', 
      popular: true,
      route: '/convert/pdf-to-word'
    },
    { 
      id: 'jpg-to-pdf', 
      name: 'JPG to PDF', 
      category: 'pdf', 
      icon: Image, 
      description: 'Create PDFs from images',
      route: '/convert/jpg-to-pdf'
    },

    // GIF
    { 
      id: 'gif-maker', 
      name: 'GIF Maker', 
      category: 'gif', 
      icon: Smile, 
      description: 'Create animated GIFs', 
      popular: true,
      route: '/convert/gif'
    },

    // Others
    { 
      id: 'unit-converter', 
      name: 'Unit Converter', 
      category: 'other', 
      icon: Settings, 
      description: 'Convert measurements',
      route: '/convert/unit'
    },
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

  const getCategoryColor = (category: string) => {
    const colors = {
      video: 'from-purple-500 to-pink-500',
      image: 'from-blue-500 to-cyan-500',
      pdf: 'from-red-500 to-orange-500',
      gif: 'from-green-500 to-emerald-500',
      other: 'from-gray-500 to-slate-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-slate-500';
  };

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-4">
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">100+ Conversion Tools</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Conversion Tools
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to convert files between formats, optimized for speed and quality.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(tool.route)}
                className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-800"
              >
                {/* Badges */}
                <div className="absolute -top-2 -right-2 flex space-x-1">
                  {tool.featured && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </div>
                  )}
                  {tool.popular && (
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Popular
                    </div>
                  )}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getCategoryColor(tool.category)} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>

                {/* Hover Action */}
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    Convert Now
                  </span>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/category/video')}
            className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View All Tools
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};