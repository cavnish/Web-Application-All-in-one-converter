// src/pages/converters/UnitConverter.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, ArrowRight, Calculator } from 'lucide-react';

export const UnitConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('feet');
  const [result, setResult] = useState('');

  type LengthUnits = 'meter' | 'kilometer' | 'centimeter' | 'millimeter' | 'mile' | 'yard' | 'feet' | 'inch';
  type WeightUnits = 'kilogram' | 'gram' | 'pound' | 'ounce' | 'ton';
  type TemperatureUnits = 'celsius' | 'fahrenheit' | 'kelvin';

  const unitCategories: {
    length: Record<LengthUnits, number>;
    weight: Record<WeightUnits, number>;
    temperature: Record<TemperatureUnits, string>;
  } = {
    length: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      mile: 1609.34,
      yard: 0.9144,
      feet: 0.3048,
      inch: 0.0254
    },
    weight: {
      kilogram: 1,
      gram: 0.001,
      pound: 0.453592,
      ounce: 0.0283495,
      ton: 1000
    },
    temperature: {
      celsius: 'celsius',
      fahrenheit: 'fahrenheit',
      kelvin: 'kelvin'
    }
  };

  const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length');

  const convertUnits = () => {
    if (!inputValue) {
      setResult('');
      return;
    }

    const value = parseFloat(inputValue);
    
    if (category === 'temperature') {
      let converted: number;
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        converted = (value * 9/5) + 32;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        converted = (value - 32) * 5/9;
      } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        converted = value + 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        converted = value - 273.15;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        converted = ((value - 32) * 5/9) + 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        converted = ((value - 273.15) * 9/5) + 32;
      } else {
        // If units are the same or unsupported conversion, just return the input value
        converted = value;
      }
      setResult(converted.toFixed(2));
    } else {
      const fromFactor =
        category === 'length'
          ? unitCategories.length[fromUnit as LengthUnits]
          : unitCategories.weight[fromUnit as WeightUnits];
      const toFactor =
        category === 'length'
          ? unitCategories.length[toUnit as LengthUnits]
          : unitCategories.weight[toUnit as WeightUnits];
      const converted = (value * fromFactor) / toFactor;
      setResult(converted.toFixed(6));
    }
  };

  React.useEffect(() => {
    convertUnits();
  }, [inputValue, fromUnit, toUnit, category]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center space-x-4 mb-6"
          >
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Unit Converter
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                Convert between different measurement units instantly
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Conversion Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
            >
              <div className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Conversion Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.keys(unitCategories).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat as any)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          category === cat
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conversion Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      From
                    </label>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter value"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Unit
                    </label>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {Object.keys(unitCategories[category]).map(unit => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                </div>

                {/* Conversion Outputs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      To
                    </label>
                    <div className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white">
                      {result || '0'}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Unit
                    </label>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {Object.keys(unitCategories[category]).map(unit => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-3 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Unit Converter Info
              </h3>
              <div className="space-y-2 text-sm text-orange-700 dark:text-orange-300">
                <p><strong>Supported Categories:</strong> Length, Weight, Temperature</p>
                <p><strong>Length Units:</strong> Meter, Kilometer, Mile, Feet, Inch, etc.</p>
                <p><strong>Weight Units:</strong> Kilogram, Gram, Pound, Ounce, Ton</p>
                <p><strong>Temperature:</strong> Celsius, Fahrenheit, Kelvin</p>
                <p><strong>Features:</strong> Real-time conversion, precise calculations</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                💡 Quick Tips
              </h3>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <p>• Select the category first</p>
                <p>• Enter the value to convert</p>
                <p>• Choose source and target units</p>
                <p>• Conversion happens automatically</p>
                <p>• Results update in real-time</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UnitConverter;