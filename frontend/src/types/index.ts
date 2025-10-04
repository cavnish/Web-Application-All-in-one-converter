// src/types/index.ts
export interface ConversionTool {
  id: string;
  name: string;
  category: 'video' | 'audio' | 'image' | 'pdf' | 'gif' | 'other';
  icon: string;
  description: string;
  inputFormats: string[];
  outputFormats: string[];
  featured?: boolean;
}

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  status: 'uploading' | 'queued' | 'converting' | 'completed' | 'error';
  progress: number;
  error?: string;
  outputFile?: ConvertedFile;
}

export interface ConvertedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  downloadUrl: string;
}

export interface ConversionSettings {
  quality?: number;
  format: string;
  resolution?: string;
  compression?: number;
  customSettings?: Record<string, any>;
}