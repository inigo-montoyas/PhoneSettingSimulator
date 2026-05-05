import { useState, useCallback, useMemo } from 'react';
import type { OSConfig, SettingItem } from '../types';
import { SettingRow } from './SettingRow';
import { Breadcrumb } from './Breadcrumb';

interface Props {
  config: OSConfig;
}

function groupItems(items: SettingItem[]): SettingItem[][] {
  const groups: SettingItem[][] = [];
  let current: SettingItem[] = [];

  for (const item of items) {
    current.push(item);
    if (item.dividerAfter) {
      groups.push(current);
      current = [];
    }
  }
  if (current.length > 0) groups.push(current);
  return groups;
}

function collectToggles(items: SettingItem[], acc: Record<string, boolean> = {}): Record<string, boolean> {
  for (const item of items) {
    if (item.type === 'toggle') acc[item.id] = item.value as boolean;
    if (item.children) collectToggles(item.children, acc);
  }
  return acc;
}

export function SettingsScreen({ config }: Props) {
  const [trail, setTrail] = useState<SettingItem[]>([]);
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>(() =>
    collectToggles(config.settings)
  );
  const { theme } = config;

  const currentItems: SettingItem[] = trail.length === 0
    ? config.settings
    : (trail[trail.length - 1].children ?? []);

  const handleToggle = useCallback((id: string) => {
    setToggleStates((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleClick = useCallback((item: SettingItem) => {
    if (item.type === 'toggle') {
      handleToggle(item.id);
    } else if (item.type === 'menu' || item.type === 'select') {
      if (item.children && item.children.length > 0) {
        setTrail((prev) => [...prev, item]);
      }
    }
  }, [handleToggle]);

  // Reset toggle state when OS config changes
  useMemo(() => {
    setToggleStates(collectToggles(config.settings));
    setTrail([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.id]);

  const handleBreadcrumb = useCallback((index: number) => {
    if (index === -1) {
      setTrail([]);
    } else {
      setTrail((prev) => prev.slice(0, index + 1));
    }
  }, []);

  const currentTitle = trail.length > 0 ? trail[trail.length - 1].label : 'Settings';
  const isIOS = theme.style === 'ios';
  const groups = groupItems(currentItems);

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ backgroundColor: theme.bodyBg }}>
      {/* Header */}
      <div
        className="flex-shrink-0 border-b"
        style={{ backgroundColor: theme.headerBg, borderColor: theme.separatorColor }}
      >
        {trail.length > 0 && (
          <div className="flex items-center px-3 pt-2 pb-1">
            <button
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: theme.accentColor }}
              onClick={() => setTrail((prev) => prev.slice(0, -1))}
            >
              <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                <path d="M7 1L2 6.5 7 12" stroke={theme.accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {trail.length >= 2 ? trail[trail.length - 2].label : 'Settings'}
            </button>
          </div>
        )}
        <div className="px-4 pb-3 pt-1">
          <h1
            className={`font-bold ${trail.length === 0 ? 'text-2xl' : 'text-xl'}`}
            style={{ color: theme.headerText }}
          >
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      {trail.length > 0 && (
        <Breadcrumb trail={trail} theme={theme} onNavigate={handleBreadcrumb} />
      )}

      {/* Settings list */}
      <div className="flex-1 overflow-y-auto">
        {isIOS ? (
          // iOS grouped style
          <div className="py-4 flex flex-col gap-6">
            {groups.map((group, gi) => (
              <div key={gi}>
                <div
                  className="rounded-xl overflow-hidden mx-4"
                  style={{ backgroundColor: theme.cardBg }}
                >
                  {group.map((item, idx) => (
                    <div key={item.id}>
                      <SettingRow item={item} theme={theme} onClick={handleClick} toggleStates={toggleStates} />
                      {idx < group.length - 1 && (
                        <div
                          className="h-px ml-4"
                          style={{ backgroundColor: theme.separatorColor }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Material / Samsung style
          <div className="py-2">
            {currentItems.map((item, idx) => (
              <div key={item.id}>
                <SettingRow item={item} theme={theme} onClick={handleClick} toggleStates={toggleStates} />
                {idx < currentItems.length - 1 && (
                  <div
                    className="h-px ml-4"
                    style={{ backgroundColor: theme.separatorColor }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
