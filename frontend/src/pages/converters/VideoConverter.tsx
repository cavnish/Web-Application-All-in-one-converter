// src/pages/converters/VideoConverter.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Video, Download, Play, Settings } from 'lucide-react';
import { FileUpload } from '../../components/conversion/FileUpload';
import { ConversionProgress } from '../../components/conversion/ConversionProgress';
import { AdvancedSettings } from '../../components/conversion/AdvancedSettings';
import { useConversion } from '../../contexts/ConversionContext';

interface VideoConverterProps {
  initialFormat?: string;
}

export const VideoConverter: React.FC<VideoConverterProps> = ({ initialFormat = 'mp4' }) => {
  const { conversionSettings, updateConversionSettings } = useConversion();

  const videoFormats = [
    { value: 'mp4', label: 'MP4', description: 'Most compatible format' },
    { value: 'avi', label: 'AVI', description: 'High quality, larger file size' },
    { value: 'mov', label: 'MOV', description: 'Apple QuickTime format' },
    { value: 'mkv', label: 'MKV', description: 'Matroska video format' },
    { value: 'webm', label: 'WebM', description: 'Web-optimized format' },
    { value: 'mp3', label: 'MP3', description: 'Audio extraction only' },
    { value: 'gif', label: 'GIF', description: 'Animated GIF' },
  ];

  const videoSettings = {
    ...conversionSettings,
    format: conversionSettings.format || initialFormat,
    category: 'video' as const,
  };

  const handleFilesSelected = (files: any[]) => {
    console.log('Video files selected:', files);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center space-x-4 mb-6"
          >
            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Video className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Video Converter
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                Convert videos between formats and extract audio
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Conversion Area */}
          <div className="lg:col-span-2 space-y-6">
            <FileUpload
              acceptedFormats={['video/*']}
              maxFiles={3}
              onFilesSelected={handleFilesSelected}
            />
            
            <ConversionProgress />
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <AdvancedSettings
              settings={videoSettings}
              onSettingsChange={updateConversionSettings}
              toolType="video"
            />

            {/* Video Specific Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Video Options
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output Format
                  </label>
                  <select
                    value={videoSettings.format}
                    onChange={(e) => updateConversionSettings({ format: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {videoFormats.map(format => (
                      <option key={format.value} value={format.value}>
                        {format.label} - {format.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quality Preset
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="high">High Quality (Large file)</option>
                    <option value="medium">Balanced (Recommended)</option>
                    <option value="low">Small File Size</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="extract-audio"
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="extract-audio" className="text-sm text-gray-700 dark:text-gray-300">
                    Extract audio only
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Video Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Video Conversion Info
              </h3>
              <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                <p><strong>Supported Input:</strong> MP4, AVI, MOV, MKV, WebM, and more</p>
                <p><strong>Output Formats:</strong> MP4, AVI, MOV, MKV, WebM, MP3, GIF</p>
                <p><strong>Max File Size:</strong> 500MB</p>
                <p><strong>Features:</strong> Format conversion, audio extraction, quality adjustment</p>
                <p><strong>Quality:</strong> Preserve original quality or optimize for web</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoConverter;