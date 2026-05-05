import type { SettingItem, OSTheme } from '../types';

interface Props {
  trail: SettingItem[];
  theme: OSTheme;
  onNavigate: (index: number) => void;
}

export function Breadcrumb({ trail, theme, onNavigate }: Props) {
  if (trail.length === 0) return null;

  return (
    <div
      className="flex items-center gap-1 px-3 py-2 text-xs overflow-x-auto whitespace-nowrap border-b"
      style={{ borderColor: theme.separatorColor, color: theme.subtitleText }}
    >
      <button
        className="hover:underline flex-shrink-0"
        style={{ color: theme.accentColor }}
        onClick={() => onNavigate(-1)}
      >
        Settings
      </button>
      {trail.map((item, i) => (
        <span key={item.id} className="flex items-center gap-1 flex-shrink-0">
          <span style={{ color: theme.chevronColor }}>›</span>
          {i < trail.length - 1 ? (
            <button
              className="hover:underline"
              style={{ color: theme.accentColor }}
              onClick={() => onNavigate(i)}
            >
              {item.label}
            </button>
          ) : (
            <span style={{ color: theme.itemText }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
