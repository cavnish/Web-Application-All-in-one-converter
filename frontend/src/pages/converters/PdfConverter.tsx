// src/pages/converters/PdfConverter.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Settings } from 'lucide-react';
import { FileUpload } from '../../components/conversion/FileUpload';
import { ConversionProgress } from '../../components/conversion/ConversionProgress';
import { AdvancedSettings } from '../../components/conversion/AdvancedSettings';
import { useConversion } from '../../contexts/ConversionContext';

interface PdfConverterProps {
  initialFormat?: string;
  targetFormat?: string;
}

export const PdfConverter: React.FC<PdfConverterProps> = ({ 
  initialFormat = 'pdf', 
  targetFormat = 'docx' 
}) => {
  const { conversionSettings, updateConversionSettings } = useConversion();

  const pdfFormats = [
    { value: 'docx', label: 'Word Document', description: 'Editable Word document' },
    { value: 'jpg', label: 'JPG Images', description: 'Convert each page to JPG' },
    { value: 'png', label: 'PNG Images', description: 'Convert each page to PNG' },
    { value: 'txt', label: 'Text File', description: 'Extract text content' },
    { value: 'html', label: 'HTML', description: 'Web page format' },
    { value: 'pptx', label: 'PowerPoint', description: 'Presentation format' },
  ];

  const pdfSettings = {
    ...conversionSettings,
    format: conversionSettings.format || targetFormat,
    category: 'pdf' as const,
  };

  const handleFilesSelected = (files: any[]) => {
    console.log('PDF files selected:', files);
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
            <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                PDF Converter
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                Convert PDFs to editable formats and vice versa
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Conversion Area */}
          <div className="lg:col-span-2 space-y-6">
            <FileUpload
              acceptedFormats={['application/pdf', 'image/*']}
              maxFiles={5}
              onFilesSelected={handleFilesSelected}
            />
            
            <ConversionProgress />
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <AdvancedSettings
              settings={pdfSettings}
              onSettingsChange={updateConversionSettings}
              toolType="pdf"
            />

            {/* PDF Specific Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                PDF Options
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Convert To
                  </label>
                  <select
                    value={pdfSettings.format}
                    onChange={(e) => updateConversionSettings({ format: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {pdfFormats.map(format => (
                      <option key={format.value} value={format.value}>
                        {format.label} - {format.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Page Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1-5, 7, 9-12"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="ocr"
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="ocr" className="text-sm text-gray-700 dark:text-gray-300">
                    Enable OCR (text recognition)
                  </label>
                </div>
              </div>
            </motion.div>

            {/* PDF Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                PDF Conversion Info
              </h3>
              <div className="space-y-2 text-sm text-red-700 dark:text-red-300">
                <p><strong>Supported Input:</strong> PDF files and images (JPG, PNG, etc.)</p>
                <p><strong>Output Formats:</strong> DOCX, JPG, PNG, TXT, HTML, PPTX</p>
                <p><strong>Max File Size:</strong> 100MB</p>
                <p><strong>Features:</strong> PDF to Word, PDF to images, text extraction, OCR</p>
                <p><strong>Quality:</strong> Preserve layout and formatting</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PdfConverter;