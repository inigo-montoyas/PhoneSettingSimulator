import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import type { VendorConfig, OSConfig } from './types';
import { vendors } from './data';
import { VendorSelector } from './components/VendorSelector';
import { OSVersionSelector } from './components/OSVersionSelector';
import { PhoneFrame } from './components/PhoneFrame';

export default function App() {
  const [selectedVendor, setSelectedVendor] = useState<VendorConfig>(vendors[0]);
  const [selectedOS, setSelectedOS] = useState<OSConfig>(vendors[0].versions[0]);
  const [capturing, setCapturing] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);

  const handleVendorSelect = (vendor: VendorConfig) => {
    setSelectedVendor(vendor);
    setSelectedOS(vendor.versions[0]);
  };

  const handleScreenshot = async () => {
    if (!screenRef.current) return;
    setCapturing(true);
    try {
      const canvas = await html2canvas(screenRef.current, { useCORS: true });
      const link = document.createElement('a');
      link.download = `${selectedVendor.name}_${selectedOS.osName}_${selectedOS.version}.png`
        .replace(/\s+/g, '_');
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setCapturing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-3">
          <h1 className="text-lg font-bold text-gray-900">Phone Settings Simulator</h1>
          <p className="text-xs text-gray-500 mt-0.5">Guide customers through their network settings</p>
        </div>
      </header>

      {/* Main two-panel layout */}
      <div className="flex flex-1 gap-6 p-6">

        {/* Left sidebar — controls */}
        <aside className="w-72 flex-shrink-0 flex flex-col gap-5">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Brand</p>
              <VendorSelector vendors={vendors} selected={selectedVendor} onSelect={handleVendorSelect} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">OS Version</p>
              <OSVersionSelector vendor={selectedVendor} selected={selectedOS} onSelect={setSelectedOS} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Current Device</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: selectedVendor.color }} />
              <span className="text-sm font-medium text-gray-800">
                {selectedVendor.name} · {selectedOS.osName} {selectedOS.version}
              </span>
            </div>
            <button
              onClick={handleScreenshot}
              disabled={capturing}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              {capturing ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Capturing...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  Take Screenshot
                </>
              )}
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">Downloads phone screen as PNG</p>
          </div>
        </aside>

        {/* Right panel — phone simulator */}
        <main className="flex-1 flex items-start justify-center">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col items-center gap-6">
            <p className="text-xs text-gray-400">Simulation only · No real changes made</p>
            <PhoneFrame config={selectedOS} vendor={selectedVendor} screenRef={screenRef} />
          </div>
        </main>

      </div>
    </div>
  );
}
