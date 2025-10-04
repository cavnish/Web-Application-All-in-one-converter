// src/pages/converters/ImageConverter.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Image, Download, Settings } from 'lucide-react';
import { FileUpload } from '../../components/conversion/FileUpload';
import { ConversionProgress } from '../../components/conversion/ConversionProgress';
import { AdvancedSettings } from '../../components/conversion/AdvancedSettings';
import { useConversion } from '../../contexts/ConversionContext';

interface ImageConverterProps {
  initialFormat?: string;
}

export const ImageConverter: React.FC<ImageConverterProps> = ({ initialFormat = 'jpeg' }) => {
  const { conversionSettings, updateConversionSettings } = useConversion();

  const imageFormats = [
    { value: 'jpeg', label: 'JPEG', description: 'Best for photos, smaller size' },
    { value: 'png', label: 'PNG', description: 'Lossless, supports transparency' },
    { value: 'webp', label: 'WebP', description: 'Modern format, excellent compression' },
    { value: 'gif', label: 'GIF', description: 'Supports animation' },
    { value: 'bmp', label: 'BMP', description: 'Uncompressed bitmap' },
    { value: 'ico', label: 'ICO', description: 'Windows icon format' },
  ];

  const imageSettings = {
    ...conversionSettings,
    format: conversionSettings.format || initialFormat,
    category: 'image' as const,
  };

  const handleFilesSelected = (files: any[]) => {
    console.log('Image files selected:', files);
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
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Image className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Image Converter
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                Convert images between formats with perfect quality preservation
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Conversion Area */}
          <div className="lg:col-span-2 space-y-6">
            <FileUpload
              acceptedFormats={['image/*']}
              maxFiles={10}
              onFilesSelected={handleFilesSelected}
            />
            
            <ConversionProgress />
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <AdvancedSettings
              settings={imageSettings}
              onSettingsChange={updateConversionSettings}
              toolType="image"
            />

            {/* Image Specific Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Image Options
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output Format
                  </label>
                  <select
                    value={imageSettings.format}
                    onChange={(e) => updateConversionSettings({ format: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {imageFormats.map(format => (
                      <option key={format.value} value={format.value}>
                        {format.label} - {format.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resize Options
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="original">Keep Original Size</option>
                    <option value="1080">Max 1920x1080 (HD)</option>
                    <option value="720">Max 1280x720</option>
                    <option value="480">Max 854x480</option>
                    <option value="custom">Custom Size</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="preserve-metadata"
                    defaultChecked
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="preserve-metadata" className="text-sm text-gray-700 dark:text-gray-300">
                    Preserve EXIF metadata
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Image Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                <Image className="w-5 h-5 mr-2" />
                Image Conversion Info
              </h3>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <p><strong>Supported Input:</strong> JPEG, PNG, WebP, GIF, BMP, ICO, HEIC, and more</p>
                <p><strong>Output Formats:</strong> JPEG, PNG, WebP, GIF, BMP, ICO</p>
                <p><strong>Max File Size:</strong> 50MB</p>
                <p><strong>Features:</strong> Format conversion, quality adjustment, resizing, metadata preservation</p>
                <p><strong>Quality:</strong> Lossless conversion available for supported formats</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageConverter;