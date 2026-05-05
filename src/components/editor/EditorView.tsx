import { useState, useCallback, useRef } from 'react';
import type { OSConfig, VendorConfig, SettingItem } from '../../types';
import { vendors } from '../../data';
import { PhoneFrame } from '../PhoneFrame';
import { TreePanel } from './TreePanel';

interface Props {
  onBack: () => void;
}

const STYLE_OPTIONS = [
  { value: 'ios', label: 'Apple iOS' },
  { value: 'samsung', label: 'Samsung One UI' },
  { value: 'pixel', label: 'Google Pixel' },
  { value: 'xiaomi', label: 'Xiaomi' },
  { value: 'oneplus', label: 'OnePlus' },
] as const;

function getThemeForStyle(style: string) {
  const vendor = vendors.find(v => v.versions[0].theme.style === style) ?? vendors[0];
  return vendor.versions[0].theme;
}

function getVendorForStyle(style: string): VendorConfig {
  return vendors.find(v => v.versions[0].theme.style === style) ?? vendors[0];
}

function buildPreviewConfig(
  settings: SettingItem[],
  style: string,
  osName: string,
  version: string,
): OSConfig {
  return {
    id: 'editor_preview',
    vendor: 'custom',
    osName,
    version,
    theme: getThemeForStyle(style),
    settings,
  };
}

export function EditorView({ onBack }: Props) {
  // Template picker state
  const [templateVendorId, setTemplateVendorId] = useState<string>(vendors[0].id);
  const [templateOsId, setTemplateOsId] = useState<string>(vendors[0].versions[0].id);

  // Editor state
  const [settings, setSettings] = useState<SettingItem[]>(() => vendors[0].versions[0].settings);
  const [style, setStyle] = useState<string>(vendors[0].versions[0].theme.style);
  const [osName, setOsName] = useState(vendors[0].versions[0].osName);
  const [version, setVersion] = useState(vendors[0].versions[0].version);
  const [customName, setCustomName] = useState('My Custom Config');

  // UI state
  const [showPreview, setShowPreview] = useState(false); // mobile: toggle
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const templateVendor = vendors.find(v => v.id === templateVendorId) ?? vendors[0];
  const templateVersions = templateVendor.versions;

  function applyTemplate() {
    const os = templateVersions.find(v => v.id === templateOsId) ?? templateVersions[0];
    setSettings(JSON.parse(JSON.stringify(os.settings))); // deep clone
    setStyle(os.theme.style);
    setOsName(os.osName);
    setVersion(os.version);
    setCustomName(`${templateVendor.name} ${os.osName} ${os.version} (custom)`);
  }

  function startBlank() {
    setSettings([]);
    setCustomName('New Config');
  }

  const handleExport = useCallback(() => {
    const data = {
      name: customName,
      osName,
      version,
      style,
      settings,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${customName.replace(/\s+/g, '_').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [customName, osName, version, style, settings]);

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (!Array.isArray(data.settings)) throw new Error('Invalid format: missing settings array');
        setSettings(data.settings);
        if (data.osName) setOsName(data.osName);
        if (data.version) setVersion(data.version);
        if (data.style) setStyle(data.style);
        if (data.name) setCustomName(data.name);
      } catch (err) {
        setImportError((err as Error).message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  const previewConfig = buildPreviewConfig(settings, style, osName, version);
  const previewVendor = getVendorForStyle(style);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 mr-2">
            ← Simulator
          </button>

          <span className="text-sm font-bold text-gray-900 mr-auto">Settings Editor</span>

          {/* Mobile: preview toggle */}
          <button
            className="sm:hidden text-xs border border-gray-300 px-3 py-1.5 rounded-lg"
            onClick={() => setShowPreview(p => !p)}
          >
            {showPreview ? '✏️ Editor' : '📱 Preview'}
          </button>

          <button onClick={() => fileInputRef.current?.click()}
            className="text-xs border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            Import JSON
          </button>
          <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />

          <button onClick={handleExport}
            className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Export JSON
          </button>
        </div>
        {importError && (
          <div className="bg-red-50 border-t border-red-200 px-4 py-2 text-xs text-red-600">{importError}</div>
        )}
      </header>

      {/* Main */}
      <div className="flex-1 flex min-h-0 max-w-6xl w-full mx-auto px-4 py-4 gap-4">

        {/* Left panel */}
        <div className={`flex flex-col gap-4 w-full sm:w-[420px] flex-shrink-0 ${showPreview ? 'hidden sm:flex' : 'flex'}`}>

          {/* Template picker */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
            <p className="text-sm font-semibold text-gray-700">Load template</p>
            <div className="flex gap-2">
              <select
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-400"
                value={templateVendorId}
                onChange={e => {
                  const v = vendors.find(x => x.id === e.target.value) ?? vendors[0];
                  setTemplateVendorId(v.id);
                  setTemplateOsId(v.versions[0].id);
                }}
              >
                {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
              <select
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-400"
                value={templateOsId}
                onChange={e => setTemplateOsId(e.target.value)}
              >
                {templateVersions.map(v => <option key={v.id} value={v.id}>{v.osName} {v.version}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={applyTemplate}
                className="flex-1 text-sm bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors">
                Use as template
              </button>
              <button onClick={startBlank}
                className="flex-1 text-sm border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                Start blank
              </button>
            </div>
          </div>

          {/* Config metadata */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
            <p className="text-sm font-semibold text-gray-700">Config details</p>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">Name</span>
                <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  value={customName} onChange={e => setCustomName(e.target.value)} />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">UI Style</span>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-400"
                  value={style} onChange={e => setStyle(e.target.value)}>
                  {STYLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">OS Name</span>
                <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  value={osName} onChange={e => setOsName(e.target.value)} />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">Version</span>
                <input className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  value={version} onChange={e => setVersion(e.target.value)} />
              </label>
            </div>
          </div>

          {/* Tree editor */}
          <div className="flex-1 min-h-0">
            <TreePanel settings={settings} onChange={setSettings} />
          </div>
        </div>

        {/* Right panel: phone preview */}
        <div className={`flex-1 flex items-start justify-center py-2 ${showPreview ? 'flex' : 'hidden sm:flex'}`}>
          <div className="flex flex-col items-center gap-3 sticky top-4">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-200">
              <span className="text-xs font-medium text-gray-700">{customName} · {osName} {version}</span>
            </div>
            <PhoneFrame config={previewConfig} vendor={previewVendor} />
            <p className="text-xs text-gray-400 text-center">Live preview · changes appear instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
}
