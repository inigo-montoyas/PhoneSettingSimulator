import type { VendorConfig, OSConfig } from '../../types';

const miuiTheme = {
  style: 'xiaomi' as const,
  headerBg: '#f5f5f5',
  headerText: '#000000',
  bodyBg: '#f5f5f5',
  cardBg: '#ffffff',
  itemText: '#000000',
  subtitleText: '#9e9e9e',
  separatorColor: '#e0e0e0',
  accentColor: '#ff6900',
  toggleColor: '#ff6900',
  chevronColor: '#bdbdbd',
  sectionHeaderText: '#9e9e9e',
  destructiveColor: '#f44336',
};

const hyperOSTheme = {
  style: 'xiaomi' as const,
  headerBg: '#f2f2f2',
  headerText: '#000000',
  bodyBg: '#f2f2f2',
  cardBg: '#ffffff',
  itemText: '#000000',
  subtitleText: '#8a8a8a',
  separatorColor: '#e5e5e5',
  accentColor: '#ff6900',
  toggleColor: '#ff6900',
  chevronColor: '#c0c0c0',
  sectionHeaderText: '#8a8a8a',
  destructiveColor: '#f44336',
};

const networkSettings = [
  {
    id: 'connection_sharing',
    label: 'Connection & sharing',
    icon: '📶',
    type: 'menu' as const,
    children: [
      {
        id: 'wifi',
        label: 'Wi-Fi',
        type: 'menu' as const,
        badge: 'On',
        children: [
          { id: 'wifi_toggle', label: 'Wi-Fi', type: 'toggle' as const, value: true },
          { id: 'wifi_network', label: 'HomeNetwork_5G', type: 'value' as const, subtitle: 'Connected', value: '✓', dividerAfter: true },
          { id: 'saved_networks', label: 'Saved networks', type: 'menu' as const, children: [
            { id: 'saved_info', label: 'No saved networks', type: 'info' as const },
          ]},
          { id: 'wifi_advanced', label: 'Additional settings', type: 'menu' as const, children: [
            { id: 'wifi_smart', label: 'Smart Wi-Fi switcher', type: 'toggle' as const, value: true, subtitle: 'Automatically switch to mobile data when Wi-Fi is poor.' },
            { id: 'install_cert', label: 'Install certificate', type: 'action' as const },
          ]},
        ],
      },
      {
        id: 'mobile_network',
        label: 'SIM cards & mobile networks',
        type: 'menu' as const,
        children: [
          { id: 'mobile_data', label: 'Mobile data', type: 'toggle' as const, value: true },
          {
            id: 'preferred_network',
            label: 'Preferred network type',
            type: 'select' as const,
            value: '5G preferred',
            children: [
              { id: 'pnt_5g', label: '5G preferred', type: 'action' as const },
              { id: 'pnt_4g', label: '4G preferred', type: 'action' as const },
              { id: 'pnt_3g', label: '3G preferred', type: 'action' as const },
              { id: 'pnt_2g', label: '2G only', type: 'action' as const },
            ],
          },
          { id: 'roaming', label: 'Data roaming', type: 'toggle' as const, value: false, subtitle: 'Connect to your carrier\'s partner networks when roaming.' },
          {
            id: 'apn',
            label: 'Access point names (APN)',
            type: 'menu' as const,
            children: [
              { id: 'apn_current', label: 'Carrier APN', type: 'value' as const, value: 'Active', subtitle: 'internet' },
              { id: 'apn_add', label: 'Add APN', type: 'action' as const },
              { id: 'apn_reset', label: 'Reset to default', type: 'destructive' as const },
            ],
          },
          {
            id: 'network_operators',
            label: 'Network operators',
            type: 'menu' as const,
            children: [
              { id: 'auto_select', label: 'Choose automatically', type: 'toggle' as const, value: true },
              { id: 'search_network', label: 'Search networks', type: 'action' as const },
            ],
          },
          { id: 'volte', label: 'VoLTE calls', type: 'toggle' as const, value: true, subtitle: 'Use LTE for high-quality voice calls.' },
        ],
      },
      {
        id: 'airplane',
        label: 'Airplane mode',
        type: 'toggle' as const,
        value: false,
      },
      {
        id: 'hotspot',
        label: 'Personal hotspot',
        type: 'menu' as const,
        children: [
          { id: 'hotspot_toggle', label: 'Personal hotspot', type: 'toggle' as const, value: false },
          { id: 'hotspot_password', label: 'Hotspot password', type: 'value' as const, value: '••••••••' },
          { id: 'usb_tethering', label: 'USB tethering', type: 'toggle' as const, value: false },
          { id: 'bt_tethering', label: 'Bluetooth tethering', type: 'toggle' as const, value: false },
        ],
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
        id: 'private_dns',
        label: 'Private DNS',
        type: 'select' as const,
        value: 'Automatic',
        children: [
          { id: 'dns_off', label: 'Off', type: 'action' as const },
          { id: 'dns_auto', label: 'Automatic', type: 'action' as const },
          { id: 'dns_custom', label: 'Custom hostname', type: 'action' as const },
        ],
      },
      {
        id: 'more_connectivity',
        label: 'More connectivity options',
        type: 'menu' as const,
        children: [
          {
            id: 'reset_wifi_mobile_bt',
            label: 'Reset Wi-Fi, mobile networks, and Bluetooth',
            type: 'menu' as const,
            children: [
              { id: 'reset_settings', label: 'Reset settings', type: 'destructive' as const, subtitle: 'This will reset all network settings including Wi-Fi passwords, mobile data settings, and Bluetooth pairings.' },
            ],
          },
        ],
      },
    ],
  },
];

const miui: OSConfig = {
  id: 'miui',
  vendor: 'xiaomi',
  osName: 'MIUI',
  version: '14',
  theme: miuiTheme,
  settings: networkSettings,
};

const hyperOS: OSConfig = {
  id: 'hyperos',
  vendor: 'xiaomi',
  osName: 'HyperOS',
  version: '2',
  theme: hyperOSTheme,
  settings: networkSettings,
};

export const xiaomiVendor: VendorConfig = {
  id: 'xiaomi',
  name: 'Xiaomi',
  color: '#ff6900',
  textColor: '#ffffff',
  logo: '',
  versions: [hyperOS, miui],
};
