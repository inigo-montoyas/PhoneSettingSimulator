import type { SettingItem, OSTheme } from '../types';

interface Props {
  item: SettingItem;
  theme: OSTheme;
  onClick: (item: SettingItem) => void;
  toggleStates: Record<string, boolean>;
}

function Toggle({ value, color }: { value: boolean; color: string }) {
  return (
    <div
      className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
      style={{ backgroundColor: value ? color : '#ccc' }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: value ? 'translateX(20px)' : 'translateX(2px)' }}
      />
    </div>
  );
}

export function SettingRow({ item, theme, onClick, toggleStates }: Props) {
  const isInteractive = item.type === 'menu' || item.type === 'toggle' || item.type === 'select' || item.type === 'action' || item.type === 'destructive';

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 min-h-[52px] ${isInteractive ? 'cursor-pointer active:opacity-60' : ''}`}
      style={{ backgroundColor: theme.cardBg }}
      onClick={() => isInteractive && onClick(item)}
    >
      {item.icon && (
        <span className="text-xl w-8 text-center flex-shrink-0">{item.icon}</span>
      )}

      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-normal truncate"
          style={{
            color: item.type === 'destructive' ? theme.destructiveColor : theme.itemText,
          }}
        >
          {item.label}
        </p>
        {item.subtitle && (
          <p className="text-xs mt-0.5 leading-tight" style={{ color: theme.subtitleText }}>
            {item.subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        {item.type === 'toggle' && (
          <Toggle value={item.id in toggleStates ? toggleStates[item.id] : (item.value as boolean)} color={theme.toggleColor} />
        )}
        {item.type !== 'toggle' && item.badge && (
          <span className="text-xs" style={{ color: theme.subtitleText }}>{item.badge}</span>
        )}
        {item.type !== 'toggle' && item.value && typeof item.value === 'string' && !item.badge && (
          <span className="text-xs max-w-[100px] truncate text-right" style={{ color: theme.subtitleText }}>
            {item.value}
          </span>
        )}
        {(item.type === 'menu' || item.type === 'select') && (
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M1 1l5 5-5 5" stroke={theme.chevronColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
}
