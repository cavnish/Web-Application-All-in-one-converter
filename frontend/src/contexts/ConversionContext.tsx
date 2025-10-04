// src/contexts/ConversionContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UploadedFile, ConversionSettings } from '../types';

interface ConversionState {
  isConverting: boolean;
  isPaused: boolean;
  estimatedTime?: string;
  currentJobId?: string;
}

interface ConversionContextType {
  uploadedFiles: UploadedFile[];
  conversionSettings: ConversionSettings;
  conversionState: ConversionState;
  addFiles: (files: UploadedFile[]) => void;
  removeFile: (fileId: string) => void;
  updateConversionSettings: (settings: ConversionSettings) => void;
  startConversion: () => void;
  pauseConversion: () => void;
  resumeConversion: () => void;
  cancelConversion: () => void;
  downloadFile: (fileId: string) => void;
  downloadAllFiles: () => void;
}

const ConversionContext = createContext<ConversionContextType | undefined>(undefined);

// Mock conversion function - in real app, this would call your backend API
const convertImageFile = async (file: File, settings: ConversionSettings): Promise<Blob> => {
  return new Promise((resolve) => {
    // Create a canvas to "convert" the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Convert to blob with quality settings
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, `image/${settings.format}`, settings.quality ? settings.quality / 100 : 0.85);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

export const ConversionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [conversionSettings, setConversionSettings] = useState<ConversionSettings>({
    format: 'jpeg',
    quality: 85,
    compression: 6
  });
  const [conversionState, setConversionState] = useState<ConversionState>({
    isConverting: false,
    isPaused: false
  });

  const addFiles = (files: UploadedFile[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (file?.previewUrl) {
      URL.revokeObjectURL(file.previewUrl);
    }
    if (file?.outputFile?.downloadUrl) {
      URL.revokeObjectURL(file.outputFile.downloadUrl);
    }
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const updateConversionSettings = (settings: ConversionSettings) => {
    setConversionSettings(prev => ({ ...prev, ...settings }));
  };

  const startConversion = async () => {
    setConversionState({
      isConverting: true,
      isPaused: false,
      estimatedTime: '2 minutes'
    });

    // Process each file
    for (const file of uploadedFiles) {
      if (file.status !== 'completed') {
        // Update status to converting
        setUploadedFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'converting', progress: 0 } : f
        ));

        try {
          // Simulate conversion progress
          for (let progress = 0; progress <= 100; progress += 10) {
            if (conversionState.isPaused) {
              await new Promise(resolve => {
                const checkPause = () => {
                  if (!conversionState.isPaused) resolve(undefined);
                  else setTimeout(checkPause, 100);
                };
                checkPause();
              });
            }

            setUploadedFiles(prev => prev.map(f => 
              f.id === file.id ? { ...f, progress } : f
            ));
            await new Promise(resolve => setTimeout(resolve, 200));
          }

          // Perform actual conversion
          const convertedBlob = await convertImageFile(file.file, conversionSettings);
          const downloadUrl = URL.createObjectURL(convertedBlob);
          
          // Update file with conversion results
          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id ? {
              ...f,
              status: 'completed',
              progress: 100,
              outputFile: {
                id: `output-${file.id}`,
                name: file.name.replace(/\.[^/.]+$/, `.${conversionSettings.format}`),
                size: convertedBlob.size,
                type: `image/${conversionSettings.format}`,
                downloadUrl
              }
            } : f
          ));

        } catch (error) {
          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id ? { 
              ...f, 
              status: 'error', 
              error: 'Conversion failed' 
            } : f
          ));
        }
      }
    }

    setConversionState(prev => ({ ...prev, isConverting: false }));
  };

  const pauseConversion = () => {
    setConversionState(prev => ({ ...prev, isPaused: true }));
  };

  const resumeConversion = () => {
    setConversionState(prev => ({ ...prev, isPaused: false }));
  };

  const cancelConversion = () => {
    setConversionState({ isConverting: false, isPaused: false });
    setUploadedFiles(prev => prev.map(file => ({
      ...file,
      status: 'queued',
      progress: 0
    })));
  };

  const downloadFile = (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (file?.outputFile?.downloadUrl) {
      const link = document.createElement('a');
      link.href = file.outputFile.downloadUrl;
      link.download = file.outputFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (file?.status === 'completed') {
      // Fallback: download original file if no conversion happened
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file.file);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }
  };

  const downloadAllFiles = () => {
    const completedFiles = uploadedFiles.filter(f => f.status === 'completed');
    completedFiles.forEach(file => {
      setTimeout(() => downloadFile(file.id), 100); // Stagger downloads
    });
  };

  const value: ConversionContextType = {
    uploadedFiles,
    conversionSettings,
    conversionState,
    addFiles,
    removeFile,
    updateConversionSettings,
    startConversion,
    pauseConversion,
    resumeConversion,
    cancelConversion,
    downloadFile,
    downloadAllFiles
  };

  return (
    <ConversionContext.Provider value={value}>
      {children}
    </ConversionContext.Provider>
  );
};

export const useConversion = (): ConversionContextType => {
  const context = useContext(ConversionContext);
  if (context === undefined) {
    throw new Error('useConversion must be used within a ConversionProvider');
  }
  return context;
};