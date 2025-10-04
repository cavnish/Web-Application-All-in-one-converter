// src/components/conversion/ConversionProgress.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, X, Check, AlertCircle, Clock, Download, Zap } from 'lucide-react';
import { useConversion } from '../../contexts/ConversionContext';

export const ConversionProgress: React.FC = () => {
  const { 
    conversionState, 
    uploadedFiles, 
    startConversion,
    pauseConversion, 
    resumeConversion, 
    cancelConversion,
    downloadAllFiles
  } = useConversion();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'converting':
        return <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />;
      case 'completed':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'converting': return 'text-blue-600';
      case 'completed': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const totalFiles = uploadedFiles.length;
  const completedFiles = uploadedFiles.filter(f => f.status === 'completed').length;
  const hasCompletedFiles = completedFiles > 0;
  const allCompleted = completedFiles === totalFiles && totalFiles > 0;

  if (!conversionState.isConverting && !hasCompletedFiles) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Ready to Convert
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {uploadedFiles.length} file(s) selected
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startConversion}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/25"
          >
            Start Conversion
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Conversion Progress
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {completedFiles} of {totalFiles} files completed
            {allCompleted && ' • All files converted!'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Download All Button */}
          {hasCompletedFiles && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadAllFiles}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download All</span>
            </motion.button>
          )}

          {/* Control Buttons */}
          {conversionState.isConverting && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={conversionState.isPaused ? resumeConversion : pauseConversion}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {conversionState.isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={cancelConversion}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {Math.round((completedFiles / totalFiles) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedFiles / totalFiles) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* File List */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {uploadedFiles.map((file) => (
          <div key={file.id} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {getStatusIcon(file.status)}
              <div className="min-w-0 flex-1">
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate block">
                  {file.name}
                </span>
                {file.status === 'converting' && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
                    <motion.div
                      className="bg-blue-500 h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${file.progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {file.status === 'converting' && (
                <span className="text-xs text-blue-600 font-medium">
                  {Math.round(file.progress)}%
                </span>
              )}
              <span className={`text-xs font-medium ${getStatusColor(file.status)}`}>
                {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Stats */}
      {allCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
              <Check className="w-5 h-5" />
              <span className="font-medium">All files converted successfully!</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadAllFiles}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download All</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};