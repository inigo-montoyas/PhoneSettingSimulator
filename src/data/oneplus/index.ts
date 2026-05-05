import type { VendorConfig, OSConfig } from '../../types';

const onePlusTheme = {
  style: 'oneplus' as const,
  headerBg: '#ffffff',
  headerText: '#000000',
  bodyBg: '#f5f5f5',
  cardBg: '#ffffff',
  itemText: '#000000',
  subtitleText: '#888888',
  separatorColor: '#e0e0e0',
  accentColor: '#f5010c',
  toggleColor: '#f5010c',
  chevronColor: '#bbbbbb',
  sectionHeaderText: '#888888',
  destructiveColor: '#f5010c',
};

const networkSettings = [
  {
    id: 'wifi_network',
    label: 'Wi-Fi & network',
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
          { id: 'wifi_advanced', label: 'Additional settings', type: 'menu' as const, children: [
            { id: 'wifi_smart', label: 'Wi-Fi smart switch', type: 'toggle' as const, value: true, subtitle: 'Switch to mobile data when Wi-Fi is unstable.' },
          ]},
        ],
      },
      {
        id: 'sim_network',
        label: 'SIM & network',
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
              { id: 'pnt_4g', label: '4G/LTE preferred', type: 'action' as const },
              { id: 'pnt_3g', label: '3G only', type: 'action' as const },
              { id: 'pnt_2g', label: '2G only', type: 'action' as const },
            ],
          },
          { id: 'roaming', label: 'Data roaming', type: 'toggle' as const, value: false },
          {
            id: 'apn',
            label: 'Access point names',
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
              { id: 'auto_select', label: 'Select automatically', type: 'toggle' as const, value: true },
              { id: 'search_network', label: 'Search networks', type: 'action' as const },
            ],
          },
          { id: 'volte', label: 'VoLTE', type: 'toggle' as const, value: true },
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
    ],
  },
  {
    id: 'system_update',
    label: 'System & updates',
    icon: '⚙️',
    type: 'menu' as const,
    children: [
      {
        id: 'backup_reset',
        label: 'Back up & reset',
        type: 'menu' as const,
        children: [
          {
            id: 'reset_phone',
            label: 'Reset phone',
            type: 'menu' as const,
            children: [
              { id: 'reset_network_bt', label: 'Reset network and Bluetooth settings', type: 'destructive' as const, subtitle: 'Resets all Wi-Fi, mobile network, and Bluetooth settings. Your data is not affected.' },
              { id: 'erase_all_data', label: 'Erase all data (factory reset)', type: 'destructive' as const, subtitle: 'Deletes all data from your phone.' },
            ],
          },
        ],
      },
    ],
  },
];

const oxygenOS: OSConfig = {
  id: 'oxygenos',
  vendor: 'oneplus',
  osName: 'OxygenOS',
  version: '15',
  theme: onePlusTheme,
  settings: networkSettings,
};

export const onePlusVendor: VendorConfig = {
  id: 'oneplus',
  name: 'OnePlus',
  color: '#f5010c',
  textColor: '#ffffff',
  logo: '',
  versions: [oxygenOS],
};
