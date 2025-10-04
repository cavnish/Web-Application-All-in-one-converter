// src/pages/CategoryPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Video, 
  Image, 
  FileText, 
  Smile, 
  Settings,
  ArrowRight
} from 'lucide-react';

export const CategoryPage: React.FC = () => {
  // Map tool id to correct route
  const toolRoutes: Record<string, string> = {
    'video-converter': '/convert/video',
    'audio-converter': '/convert/audio',
    'mp4-to-mp3': '/convert/mp4-to-mp3',
    'video-to-gif': '/convert/video-to-gif',
    'mp4-converter': '/convert/video',
    'image-converter': '/convert/image',
    'webp-to-png': '/convert/webp-to-png',
    'heic-to-jpg': '/convert/image',
    'png-to-svg': '/convert/image',
    'pdf-converter': '/convert/pdf',
    'pdf-to-word': '/convert/pdf-to-word',
    'jpg-to-pdf': '/convert/jpg-to-pdf',
    'docx-to-pdf': '/convert/pdf',
    'gif-maker': '/convert/gif',
    'image-to-gif': '/convert/gif',
    'unit-converter': '/convert/unit',
    'time-converter': '/convert/unit',
    'archive-converter': '/convert/unit',
  };
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const categories = {
    video: {
      name: 'Video & Audio',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      description: 'Convert between video and audio formats with premium quality',
      tools: [
        { id: 'video-converter', name: 'Video Converter', description: 'Convert between 50+ video formats' },
        { id: 'audio-converter', name: 'Audio Converter', description: 'Transform audio files effortlessly' },
        { id: 'mp4-to-mp3', name: 'MP4 to MP3', description: 'Extract audio from videos quickly' },
        { id: 'video-to-gif', name: 'Video to GIF', description: 'Create GIFs from video clips' },
        { id: 'mp4-converter', name: 'MP4 Converter', description: 'Convert to and from MP4 format' },
      ]
    },
    image: {
      name: 'Image',
      icon: Image,
      color: 'from-blue-500 to-cyan-500',
      description: 'Transform images between formats with perfect quality preservation',
      tools: [
        { id: 'image-converter', name: 'Image Converter', description: 'Convert between image formats' },
        { id: 'webp-to-png', name: 'WEBP to PNG', description: 'Modern format conversion' },
        { id: 'heic-to-jpg', name: 'HEIC to JPG', description: 'Apple format conversion' },
        { id: 'png-to-svg', name: 'PNG to SVG', description: 'Raster to vector conversion' },
      ]
    },
    pdf: {
      name: 'PDF & Documents',
      icon: FileText,
      color: 'from-red-500 to-orange-500',
      description: 'Handle document conversions with precision and security',
      tools: [
        { id: 'pdf-converter', name: 'PDF Converter', description: 'Convert PDFs to various formats' },
        { id: 'pdf-to-word', name: 'PDF to Word', description: 'Edit PDFs in Word' },
        { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Create PDFs from images' },
        { id: 'docx-to-pdf', name: 'DOCX to PDF', description: 'Convert documents to PDF' },
      ]
    },
    gif: {
      name: 'GIF',
      icon: Smile,
      color: 'from-green-500 to-emerald-500',
      description: 'Create and convert animated GIFs with ease',
      tools: [
        { id: 'gif-maker', name: 'GIF Maker', description: 'Create animated GIFs' },
        { id: 'video-to-gif', name: 'Video to GIF', description: 'Convert videos to GIFs' },
        { id: 'image-to-gif', name: 'Image to GIF', description: 'Create GIFs from images' },
      ]
    },
    other: {
      name: 'Other Tools',
      icon: Settings,
      color: 'from-gray-500 to-slate-500',
      description: 'Additional utility tools for various conversion needs',
      tools: [
        { id: 'unit-converter', name: 'Unit Converter', description: 'Convert measurements' },
        { id: 'time-converter', name: 'Time Converter', description: 'Convert time zones' },
        { id: 'archive-converter', name: 'Archive Converter', description: 'Convert archive formats' },
      ]
    }
  };

  const currentCategory = categories[category as keyof typeof categories] || categories.video;
  const Icon = currentCategory.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentCategory.color} flex items-center justify-center shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {currentCategory.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentCategory.tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(toolRoutes[tool.id] || `/convert/${tool.id}`)}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentCategory.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {tool.description}
              </p>

              <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Use Tool
                </span>
                <ArrowRight className="w-5 h-5 text-blue-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Back to All Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
          >
            ← Back to All Tools
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};