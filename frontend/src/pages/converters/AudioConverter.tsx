// src/pages/converters/AudioConverter.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Music, Download, Volume2, Settings } from 'lucide-react';
import { FileUpload } from '../../components/conversion/FileUpload';
import { ConversionProgress } from '../../components/conversion/ConversionProgress';
import { AdvancedSettings } from '../../components/conversion/AdvancedSettings';
import { useConversion } from '../../contexts/ConversionContext';

interface AudioConverterProps {
  initialFormat?: string;
}

export const AudioConverter: React.FC<AudioConverterProps> = ({ initialFormat = 'mp3' }) => {
  const { conversionSettings, updateConversionSettings } = useConversion();

  const audioFormats = [
    { value: 'mp3', label: 'MP3', description: 'Most compatible, good compression' },
    { value: 'wav', label: 'WAV', description: 'Uncompressed, high quality' },
    { value: 'flac', label: 'FLAC', description: 'Lossless compression' },
    { value: 'ogg', label: 'OGG', description: 'Open source format' },
    { value: 'm4a', label: 'M4A', description: 'Apple audio format' },
    { value: 'aac', label: 'AAC', description: 'Advanced audio coding' },
  ];

  const audioSettings = {
    ...conversionSettings,
    format: conversionSettings.format || initialFormat,
    category: 'audio' as const,
  };

  const handleFilesSelected = (files: any[]) => {
    console.log('Audio files selected:', files);
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
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Audio Converter
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                Convert audio files between formats with perfect quality
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Conversion Area */}
          <div className="lg:col-span-2 space-y-6">
            <FileUpload
              acceptedFormats={['audio/*', 'video/*']}
              maxFiles={5}
              onFilesSelected={handleFilesSelected}
            />
            
            <ConversionProgress />
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <AdvancedSettings
              settings={audioSettings}
              onSettingsChange={updateConversionSettings}
              toolType="audio"
            />

            {/* Audio Specific Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Audio Options
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output Format
                  </label>
                  <select
                    value={audioSettings.format}
                    onChange={(e) => updateConversionSettings({ format: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {audioFormats.map(format => (
                      <option key={format.value} value={format.value}>
                        {format.label} - {format.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bitrate
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="320">320 kbps (Best Quality)</option>
                    <option value="256">256 kbps (High Quality)</option>
                    <option value="192">192 kbps (Good Quality)</option>
                    <option value="128">128 kbps (Standard)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="normalize"
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="normalize" className="text-sm text-gray-700 dark:text-gray-300">
                    Normalize audio volume
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Audio Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                <Volume2 className="w-5 h-5 mr-2" />
                Audio Conversion Info
              </h3>
              <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <p><strong>Supported Input:</strong> MP3, WAV, FLAC, OGG, M4A, AAC, and video files</p>
                <p><strong>Output Formats:</strong> MP3, WAV, FLAC, OGG, M4A, AAC</p>
                <p><strong>Max File Size:</strong> 100MB</p>
                <p><strong>Features:</strong> Extract audio from videos, bitrate control, volume normalization</p>
                <p><strong>Quality:</strong> Preserve original quality or compress for storage</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioConverter;