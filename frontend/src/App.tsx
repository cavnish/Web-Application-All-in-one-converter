// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import { ConversionProvider } from './contexts/ConversionContext';
import './styles/globals.css';

import { ErrorBoundary } from './components/common/ErrorBoundary';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const CategoryPage = lazy(() => import('./pages/converters/CategoryPage').then(module => ({ default: module.CategoryPage })));

// Lazy load individual converter pages
const VideoConverter = lazy(() => import('./pages/converters/VideoConverter').then(module => ({ default: module.VideoConverter })));
const AudioConverter = lazy(() => import('./pages/converters/AudioConverter').then(module => ({ default: module.AudioConverter })));
const ImageConverter = lazy(() => import('./pages/converters/ImageConverter').then(module => ({ default: module.ImageConverter })));
const PdfConverter = lazy(() => import('./pages/converters/PdfConverter').then(module => ({ default: module.PdfConverter })));
const GifConverter = lazy(() => import('./pages/converters/GifConverter'));
const UnitConverter = lazy(() => import('./pages/converters/UnitConverter').then(module => ({ default: module.UnitConverter })));

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ConversionProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 transition-colors duration-300">
            <Navigation />
            <main className="flex-1">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  
                  {/* Individual Converter Routes */}
                  <Route path="/convert/video" element={<VideoConverter />} />
                  <Route path="/convert/audio" element={<AudioConverter />} />
                  <Route path="/convert/image" element={<ImageConverter />} />
                  <Route path="/convert/pdf" element={<PdfConverter />} />
                  <Route path="/convert/gif" element={<GifConverter />} />
                  <Route path="/convert/unit" element={<UnitConverter />} />
                  
                  {/* Specific Tool Routes */}
                  <Route path="/convert/video-converter" element={<VideoConverter />} />
                  <Route path="/convert/audio-converter" element={<AudioConverter />} />
                  <Route path="/convert/image-converter" element={<ImageConverter />} />
                  <Route path="/convert/pdf-converter" element={<PdfConverter />} />
                  <Route path="/convert/gif-maker" element={<GifConverter />} />
                  <Route path="/convert/unit-converter" element={<UnitConverter />} />
                  <Route path="/convert/mp4-to-mp3" element={<AudioConverter initialFormat="mp4" />} />
                  {/* <Route path="/convert/video-to-gif" element={<GifConverter initialFormat="video" />} /> */}
                  <Route path="/convert/webp-to-png" element={<ImageConverter initialFormat="webp" />} />
                  <Route path="/convert/jpg-to-png" element={<ImageConverter initialFormat="jpg" />} />
                  <Route path="/convert/pdf-to-word" element={<PdfConverter initialFormat="pdf" targetFormat="docx" />} />
                  <Route path="/convert/jpg-to-pdf" element={<PdfConverter initialFormat="image" targetFormat="pdf" />} />
                  
                  <Route path="*" element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">Page not found</p>
                      </div>
                    </div>
                  } />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <Toaster 
              position="bottom-right"
              toastOptions={{
                className: 'dark:bg-gray-800 dark:text-white backdrop-blur-sm',
                duration: 4000,
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: 'white',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: 'white',
                  },
                },
              }}
            />
          </div>
        </Router>
      </ConversionProvider>
    </ErrorBoundary>
  );
}

export default App;