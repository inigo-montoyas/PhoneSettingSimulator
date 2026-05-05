import type { Ref } from 'react';
import type { OSConfig, VendorConfig } from '../types';
import { SettingsScreen } from './SettingsScreen';

interface Props {
  config: OSConfig;
  vendor: VendorConfig;
  screenRef?: Ref<HTMLDivElement>;
}

export function PhoneFrame({ config, screenRef }: Props) {
  const isIOS = config.theme.style === 'ios';

  return (
    <div className="flex flex-col items-center">
      {/* Phone shell */}
      <div
        className="relative rounded-[40px] overflow-hidden shadow-2xl border-[6px]"
        style={{
          width: 320,
          height: 620,
          borderColor: isIOS ? '#1c1c1e' : '#2a2a2a',
          backgroundColor: isIOS ? '#1c1c1e' : '#2a2a2a',
        }}
      >
        {/* Status bar */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-5 text-white"
          style={{ height: 40, backgroundColor: config.theme.headerBg }}
        >
          <span className="text-xs font-semibold" style={{ color: config.theme.headerText }}>
            9:41
          </span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
              <rect x="0" y="4" width="3" height="7" rx="0.5" fill={config.theme.itemText} opacity="0.3" />
              <rect x="4.5" y="3" width="3" height="8" rx="0.5" fill={config.theme.itemText} opacity="0.5" />
              <rect x="9" y="1" width="3" height="10" rx="0.5" fill={config.theme.itemText} opacity="0.7" />
              <rect x="13.5" y="0" width="2.5" height="11" rx="0.5" fill={config.theme.itemText} />
            </svg>
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
              <path d="M7 2.5C8.8 2.5 10.4 3.2 11.6 4.3L13 2.8C11.4 1.4 9.3 0.5 7 0.5C4.7 0.5 2.6 1.4 1 2.8L2.4 4.3C3.6 3.2 5.2 2.5 7 2.5Z" fill={config.theme.itemText} />
              <path d="M7 5.5C8.1 5.5 9.1 5.9 9.8 6.6L11.2 5.1C10.1 4.1 8.6 3.5 7 3.5C5.4 3.5 3.9 4.1 2.8 5.1L4.2 6.6C4.9 5.9 5.9 5.5 7 5.5Z" fill={config.theme.itemText} />
              <circle cx="7" cy="9" r="1.5" fill={config.theme.itemText} />
            </svg>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
              <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke={config.theme.itemText} strokeOpacity="0.35" />
              <rect x="2" y="2" width="16" height="8" rx="1.5" fill={config.theme.itemText} />
              <path d="M22 4.5V7.5C22.8 7.2 23.5 6.7 23.5 6C23.5 5.3 22.8 4.8 22 4.5Z" fill={config.theme.itemText} fillOpacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Notch / Dynamic island for iOS */}
        {isIOS && (
          <div
            className="absolute top-[40px] left-1/2 -translate-x-1/2 rounded-full z-10"
            style={{ width: 120, height: 28, backgroundColor: '#1c1c1e', top: 40 }}
          />
        )}

        {/* Screen content */}
        <div
          ref={screenRef}
          className="overflow-hidden"
          style={{
            height: 'calc(100% - 40px)',
            paddingTop: isIOS ? 10 : 0,
          }}
        >
          <SettingsScreen config={config} />
        </div>
      </div>

      {/* Home indicator */}
      <div
        className="mt-2 rounded-full"
        style={{ width: 120, height: 4, backgroundColor: '#555' }}
      />
    </div>
  );
}
