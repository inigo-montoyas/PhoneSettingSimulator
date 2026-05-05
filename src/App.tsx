import { useState } from 'react';
import type { VendorConfig, OSConfig } from './types';
import { vendors } from './data';
import { VendorSelector } from './components/VendorSelector';
import { OSVersionSelector } from './components/OSVersionSelector';
import { PhoneFrame } from './components/PhoneFrame';
import { EditorView } from './components/editor/EditorView';

export default function App() {
  const [mode, setMode] = useState<'simulator' | 'editor'>('simulator');
  const [selectedVendor, setSelectedVendor] = useState<VendorConfig>(vendors[0]);
  const [selectedOS, setSelectedOS] = useState<OSConfig>(vendors[0].versions[0]);

  const handleVendorSelect = (vendor: VendorConfig) => {
    setSelectedVendor(vendor);
    setSelectedOS(vendor.versions[0]);
  };

  if (mode === 'editor') {
    return <EditorView onBack={() => setMode('simulator')} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center">
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">Phone Settings Simulator</h1>
            <p className="text-xs text-gray-500 mt-0.5">Guide customers through their network settings</p>
          </div>
          <button
            onClick={() => setMode('editor')}
            className="flex items-center gap-1.5 text-xs font-medium border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            ✏️ Editor
          </button>
        </div>
      </header>

      {/* Controls */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col gap-3">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 text-center">Brand</p>
            <VendorSelector vendors={vendors} selected={selectedVendor} onSelect={handleVendorSelect} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 text-center">OS Version</p>
            <OSVersionSelector vendor={selectedVendor} selected={selectedOS} onSelect={setSelectedOS} />
          </div>
        </div>
      </div>

      {/* Simulator */}
      <main className="flex-1 flex items-start justify-center py-6 px-4">
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-200">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: selectedVendor.color }} />
            <span className="text-xs font-medium text-gray-700">
              {selectedVendor.name} · {selectedOS.osName} {selectedOS.version}
            </span>
          </div>
          <PhoneFrame config={selectedOS} vendor={selectedVendor} />
          <p className="text-xs text-gray-400 text-center">Tap to navigate · Simulation only · No real changes</p>
        </div>
      </main>
    </div>
  );
}
