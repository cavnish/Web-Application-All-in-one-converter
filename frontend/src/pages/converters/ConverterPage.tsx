// src/pages/ConverterPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileUpload } from '../../components/conversion/FileUpload';
import { ConversionProgress } from '../../components/conversion/ConversionProgress';
import { AdvancedSettings } from '../../components/conversion/AdvancedSettings';
import { useConversion } from '../../contexts/ConversionContext';

export const ConverterPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const { uploadedFiles, conversionSettings, updateConversionSettings, addFiles } = useConversion();

  // Mock tool data - in real app, this would come from an API
  const toolData = {
    id: toolId || 'image-converter',
    name: 'Image Converter',
    category: 'image' as const,
    description: 'Convert images between various formats with premium quality',
    inputFormats: ['PNG', 'JPG', 'WEBP', 'GIF', 'BMP'],
    outputFormats: ['JPG', 'PNG', 'WEBP', 'GIF']
  };

  const handleFilesSelected = (files: any[]) => {
    console.log('Files selected for conversion:', files);
    // Files are already added to context by FileUpload component
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {toolData.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {toolData.description}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Conversion Area */}
          <div className="lg:col-span-2 space-y-6">
            <FileUpload
              acceptedFormats={['image/*']}
              maxFiles={5}
              onFilesSelected={handleFilesSelected}
            />
            
            {(uploadedFiles.length > 0) && (
              <ConversionProgress />
            )}
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <AdvancedSettings
              settings={conversionSettings}
              onSettingsChange={updateConversionSettings}
              toolType={toolData.category}
            />

            {/* Conversion Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                💡 Conversion Info
              </h3>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <p><strong>Input Formats:</strong> {toolData.inputFormats.join(', ')}</p>
                <p><strong>Output Formats:</strong> {toolData.outputFormats.join(', ')}</p>
                <p><strong>Max File Size:</strong> 100MB</p>
                <p><strong>Auto-delete:</strong> 1 hour after conversion</p>
                <p><strong>Quality:</strong> Lossless conversion available</p>
              </div>
            </motion.div>

            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
                🚀 Pro Tips
              </h3>
              <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                <p>• Use JPG for photos (smaller file size)</p>
                <p>• Use PNG for graphics with transparency</p>
                <p>• Use WEBP for modern web optimization</p>
                <p>• Quality 85-90% is usually optimal</p>
                <p>• Batch convert multiple files at once</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};