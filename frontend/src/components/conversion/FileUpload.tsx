// src/components/conversion/FileUpload.tsx
import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, File, Image, Video, FileText, Music, Download, AlertCircle } from 'lucide-react';
import { useConversion } from '../../contexts/ConversionContext';
import { UploadedFile } from '../../types';

interface FileUploadProps {
  acceptedFormats?: string[];
  maxFiles?: number;
  onFilesSelected: (files: UploadedFile[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  acceptedFormats = ['*/*'],
  maxFiles = 10,
  onFilesSelected,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const { uploadedFiles, addFiles, removeFile, downloadFile } = useConversion();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const processFiles = (files: FileList): UploadedFile[] => {
    return Array.from(files).slice(0, maxFiles - uploadedFiles.length).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      status: 'queued' as const,
      progress: 0,
    }));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files.length > 0) {
      const newFiles = processFiles(e.dataTransfer.files);
      addFiles(newFiles);
      onFilesSelected(newFiles);
    }
  }, [addFiles, onFilesSelected, uploadedFiles.length, maxFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = processFiles(e.target.files);
      addFiles(newFiles);
      onFilesSelected(newFiles);
    }
  }, [addFiles, onFilesSelected, uploadedFiles.length, maxFiles]);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (type.startsWith('video/')) return <Video className="w-5 h-5" />;
    if (type.startsWith('audio/')) return <Music className="w-5 h-5" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'converting': return 'text-blue-600';
      case 'completed': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Area */}
      <motion.div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50'
          }
          backdrop-blur-sm
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          type="file"
          multiple
          accept={acceptedFormats.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-4"
        >
          <div className="w-16 h-16 mx-auto bg-blue-500 rounded-2xl flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Drop your files here
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              or <span className="text-blue-500 font-medium">browse</span> to choose
            </p>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Supports {acceptedFormats.join(', ')} • Max {maxFiles} files
          </div>
        </motion.div>
      </motion.div>

      {/* File Previews */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Selected Files ({uploadedFiles.length})
            </h4>
            
            <div className="grid gap-4">
              {uploadedFiles.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  {/* File Icon/Preview */}
                  <div className="flex-shrink-0">
                    {file.previewUrl ? (
                      <img 
                        src={file.previewUrl} 
                        alt={file.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {file.name}
                      </p>
                      {file.outputFile && (
                        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                          Converted
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                      {file.outputFile && (
                        <span className="ml-2">
                          → {formatFileSize(file.outputFile.size)}
                        </span>
                      )}
                    </p>
                    
                    {/* Progress Bar */}
                    {file.status === 'converting' && (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                        <motion.div
                          className="bg-blue-500 h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${file.progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                    
                    {/* Error Message */}
                    {file.status === 'error' && file.error && (
                      <div className="flex items-center space-x-1 mt-1 text-red-600 dark:text-red-400">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-xs">{file.error}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {file.status === 'completed' && file.outputFile && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => downloadFile(file.id)}
                        className="p-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                        title="Download converted file"
                      >
                        <Download className="w-5 h-5" />
                      </motion.button>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFile(file.id)}
                      className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capacity Warning */}
      {uploadedFiles.length >= maxFiles && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl"
        >
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3" />
          <span className="text-yellow-800 dark:text-yellow-200 text-sm">
            Maximum {maxFiles} files reached. Remove some files to add more.
          </span>
        </motion.div>
      )}
    </div>
  );
};