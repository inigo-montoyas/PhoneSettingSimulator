import type { VendorConfig, OSConfig } from '../types';

interface Props {
  vendor: VendorConfig;
  selected: OSConfig | null;
  onSelect: (os: OSConfig) => void;
}

export function OSVersionSelector({ vendor, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {vendor.versions.map((os) => (
        <button
          key={os.id}
          onClick={() => onSelect(os)}
          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border"
          style={{
            backgroundColor: selected?.id === os.id ? vendor.color : 'transparent',
            color: selected?.id === os.id ? vendor.textColor : '#555',
            borderColor: selected?.id === os.id ? vendor.color : '#ccc',
          }}
        >
          {os.osName} {os.version}
        </button>
      ))}
    </div>
  );
}
