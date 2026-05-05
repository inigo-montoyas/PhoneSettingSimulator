import type { VendorConfig } from '../types';

interface Props {
  vendors: VendorConfig[];
  selected: VendorConfig | null;
  onSelect: (vendor: VendorConfig) => void;
}

export function VendorSelector({ vendors, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {vendors.map((vendor) => (
        <button
          key={vendor.id}
          onClick={() => onSelect(vendor)}
          className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 border-2"
          style={{
            backgroundColor: selected?.id === vendor.id ? vendor.color : 'transparent',
            color: selected?.id === vendor.id ? vendor.textColor : vendor.color,
            borderColor: vendor.color,
          }}
        >
          {vendor.name}
        </button>
      ))}
    </div>
  );
}
