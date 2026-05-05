import { useEffect, useState } from 'react';
import type { SettingItem, SettingType } from '../../types';

interface Props {
  item: SettingItem;
  onChange: (updates: Partial<SettingItem>) => void;
  onClose: () => void;
}

const TYPES: SettingType[] = ['menu', 'toggle', 'value', 'select', 'action', 'info', 'destructive'];

export function ItemForm({ item, onChange, onClose }: Props) {
  const [local, setLocal] = useState<SettingItem>(item);

  useEffect(() => { setLocal(item); }, [item.id]);

  function update(field: keyof SettingItem, value: unknown) {
    const updated = { ...local, [field]: value } as SettingItem;
    setLocal(updated);
    onChange({ [field]: value });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Edit item</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
      </div>

      {/* Label */}
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500">Label *</span>
        <input
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          value={local.label}
          onChange={e => update('label', e.target.value)}
        />
      </label>

      {/* Subtitle */}
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500">Subtitle / description</span>
        <input
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          value={local.subtitle ?? ''}
          onChange={e => update('subtitle', e.target.value || undefined)}
          placeholder="Optional"
        />
      </label>

      {/* Type */}
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500">Type</span>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-white"
          value={local.type}
          onChange={e => update('type', e.target.value as SettingType)}
        >
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>

      {/* Icon */}
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500">Icon (emoji)</span>
        <input
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          value={local.icon ?? ''}
          onChange={e => update('icon', e.target.value || undefined)}
          placeholder="e.g. 📶"
        />
      </label>

      {/* Badge */}
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500">Badge text</span>
        <input
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          value={local.badge ?? ''}
          onChange={e => update('badge', e.target.value || undefined)}
          placeholder="e.g. On, Off, Connected"
        />
      </label>

      {/* Value (for toggle / value / select types) */}
      {(local.type === 'value' || local.type === 'select') && (
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-500">Value (display text)</span>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            value={typeof local.value === 'string' ? local.value : ''}
            onChange={e => update('value', e.target.value)}
          />
        </label>
      )}

      {local.type === 'toggle' && (
        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-xs font-medium text-gray-500">Default state</span>
          <div
            className="relative w-11 h-6 rounded-full transition-colors"
            style={{ backgroundColor: local.value ? '#34c759' : '#ccc' }}
            onClick={() => update('value', !local.value)}
          >
            <div
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
              style={{ transform: local.value ? 'translateX(20px)' : 'translateX(2px)' }}
            />
          </div>
          <span className="text-xs text-gray-500">{local.value ? 'On' : 'Off'}</span>
        </label>
      )}

      {/* Divider after */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={local.dividerAfter ?? false}
          onChange={e => update('dividerAfter', e.target.checked || undefined)}
          className="rounded"
        />
        <span className="text-xs font-medium text-gray-500">Section divider after this item</span>
      </label>

      {/* ID (read-only) */}
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-400">ID (auto-generated)</span>
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-400 bg-gray-50"
          value={local.id}
          readOnly
        />
      </label>
    </div>
  );
}
