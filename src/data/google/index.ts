import type { VendorConfig, OSConfig } from '../../types';

const pixelTheme = {
  style: 'pixel' as const,
  headerBg: '#ffffff',
  headerText: '#202124',
  bodyBg: '#f8f9fa',
  cardBg: '#ffffff',
  itemText: '#202124',
  subtitleText: '#5f6368',
  separatorColor: '#e8eaed',
  accentColor: '#1a73e8',
  toggleColor: '#1a73e8',
  chevronColor: '#9aa0a6',
  sectionHeaderText: '#1a73e8',
  destructiveColor: '#d93025',
};

const networkChildren = (version: string) => [
  {
    id: 'internet',
    label: 'Internet',
    type: 'menu' as const,
    children: [
      { id: 'wifi_toggle', label: 'Wi-Fi', type: 'toggle' as const, value: true },
      { id: 'wifi_network', label: 'HomeNetwork_5G', type: 'value' as const, subtitle: 'Connected', value: '✓', dividerAfter: true },
      {
        id: 'mobile_network',
        label: 'SIM',
        type: 'menu' as const,
        subtitle: 'Carrier SIM',
        children: [
          { id: 'mobile_data_toggle', label: 'Mobile data', type: 'toggle' as const, value: true },
          { id: 'roaming', label: 'Roaming', type: 'toggle' as const, value: false },
          {
            id: 'preferred_network',
            label: 'Preferred network type',
            type: 'select' as const,
            value: version >= '14' ? '5G (recommended)' : 'LTE (recommended)',
            children: [
              { id: 'pnt_5g', label: '5G (recommended)', type: 'action' as const },
              { id: 'pnt_lte', label: 'LTE', type: 'action' as const },
              { id: 'pnt_3g', label: '3G', type: 'action' as const },
              { id: 'pnt_2g', label: '2G', type: 'action' as const },
            ],
          },
          {
            id: 'auto_select',
            label: 'Automatically select network',
            type: 'toggle' as const,
            value: true,
          },
          {
            id: 'apn',
            label: 'Access Point Names',
            type: 'menu' as const,
            children: [
              { id: 'apn_current', label: 'Carrier APN', type: 'value' as const, value: 'Active', subtitle: 'internet' },
              { id: 'apn_add', label: 'Add APN', type: 'action' as const },
              { id: 'apn_reset', label: 'Reset to default', type: 'destructive' as const },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'hotspot',
    label: 'Hotspot & tethering',
    type: 'menu' as const,
    children: [
      { id: 'wifi_hotspot', label: 'Wi-Fi hotspot', type: 'toggle' as const, value: false },
      { id: 'usb_tethering', label: 'USB tethering', type: 'toggle' as const, value: false },
      { id: 'bt_tethering', label: 'Bluetooth tethering', type: 'toggle' as const, value: false },
    ],
  },
  {
    id: 'data_saver',
    label: 'Data Saver',
    type: 'toggle' as const,
    value: false,
    subtitle: 'Reduce data usage by restricting background data.',
  },
  {
    id: 'vpn',
    label: 'VPN',
    type: 'menu' as const,
    children: [
      { id: 'add_vpn', label: 'Add VPN', type: 'action' as const },
    ],
  },
  {
    id: 'airplane',
    label: 'Airplane mode',
    type: 'toggle' as const,
    value: false,
  },
  {
    id: 'private_dns',
    label: 'Private DNS',
    type: 'select' as const,
    value: 'Automatic',
    children: [
      { id: 'dns_off', label: 'Off', type: 'action' as const },
      { id: 'dns_auto', label: 'Automatic', type: 'action' as const },
      { id: 'dns_custom', label: 'Private DNS provider hostname', type: 'action' as const },
    ],
  },
];

const makePixelConfig = (id: string, version: string, androidVersion: string): OSConfig => ({
  id,
  vendor: 'google',
  osName: 'Android',
  version: androidVersion,
  theme: pixelTheme,
  settings: [
    {
      id: 'network_internet',
      label: 'Network & internet',
      icon: '📶',
      type: 'menu',
      children: networkChildren(version),
    },
    {
      id: 'system',
      label: 'System',
      icon: '⚙️',
      type: 'menu',
      children: [
        {
          id: 'reset_options',
          label: 'Reset options',
          type: 'menu',
          children: [
            { id: 'reset_wifi_mobile_bt', label: 'Reset mobile network settings', type: 'destructive', subtitle: 'Resets all network settings including Wi-Fi, mobile data, and Bluetooth.' },
            { id: 'reset_app_preferences', label: 'Reset app preferences', type: 'destructive', subtitle: 'Resets all preferences for disabled apps, disabled app notifications, default applications, and background data restrictions.' },
            { id: 'erase_all_data', label: 'Erase all data (factory reset)', type: 'destructive', subtitle: 'Deletes all data from internal storage.' },
          ],
        },
      ],
    },
  ],
});

export const googleVendor: VendorConfig = {
  id: 'google',
  name: 'Google Pixel',
  color: '#1a73e8',
  textColor: '#ffffff',
  logo: '',
  versions: [
    makePixelConfig('pixel_android15', '15', '15'),
    makePixelConfig('pixel_android14', '14', '14'),
    makePixelConfig('pixel_android13', '13', '13'),
    makePixelConfig('pixel_android12', '12', '12'),
  ],
};
