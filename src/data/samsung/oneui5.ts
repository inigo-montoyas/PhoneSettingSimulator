import type { OSConfig } from '../../types';

const samsungTheme = {
  style: 'samsung' as const,
  headerBg: '#ffffff',
  headerText: '#000000',
  bodyBg: '#f1f3f5',
  cardBg: '#ffffff',
  itemText: '#000000',
  subtitleText: '#8c8c8c',
  separatorColor: '#e0e0e0',
  accentColor: '#1259c3',
  toggleColor: '#1259c3',
  chevronColor: '#bdbdbd',
  sectionHeaderText: '#1259c3',
  destructiveColor: '#d32f2f',
};

export const oneui5: OSConfig = {
  id: 'oneui5',
  vendor: 'samsung',
  osName: 'One UI',
  version: '5',
  theme: samsungTheme,
  settings: [
    {
      id: 'connections',
      label: 'Connections',
      icon: '📶',
      type: 'menu',
      children: [
        {
          id: 'wifi',
          label: 'Wi-Fi',
          type: 'menu',
          badge: 'On',
          children: [
            { id: 'wifi_toggle', label: 'Wi-Fi', type: 'toggle', value: true },
            {
              id: 'wifi_network',
              label: 'HomeNetwork_5G',
              type: 'menu',
              subtitle: 'Connected',
              badge: '✓',
              children: [
                { id: 'wifi_speed', label: 'Speed', type: 'value', value: 'Very fast (Wi-Fi 6)' },
                { id: 'wifi_signal', label: 'Signal strength', type: 'value', value: 'Excellent' },
                { id: 'wifi_frequency', label: 'Frequency', type: 'value', value: '5 GHz' },
                { id: 'wifi_security', label: 'Security', type: 'value', value: 'WPA3' },
                { id: 'wifi_forget', label: 'Forget', type: 'destructive' },
              ],
            },
            { id: 'wifi_add', label: 'Add network', type: 'action', dividerAfter: true },
            {
              id: 'wifi_direct',
              label: 'Wi-Fi Direct',
              type: 'menu',
              children: [
                { id: 'wfd_info', label: 'Connect directly to nearby devices via Wi-Fi', type: 'info' },
              ],
            },
            {
              id: 'advanced_wifi',
              label: 'Advanced',
              type: 'menu',
              children: [
                { id: 'network_notification', label: 'Network notification', type: 'toggle', value: false, subtitle: 'Notify when an open network is available.' },
                { id: 'detect_suspicious', label: 'Detect suspicious networks', type: 'toggle', value: true },
                { id: 'smart_switch', label: 'Switch to mobile data', type: 'toggle', value: true, subtitle: 'Automatically switch to mobile data when Wi-Fi is unstable.' },
                { id: 'mac_type', label: 'MAC address type', type: 'select', value: 'Random MAC', children: [
                  { id: 'mac_random', label: 'Random MAC', type: 'action', subtitle: 'Recommended. Use a different MAC per network to improve privacy.' },
                  { id: 'mac_phone', label: 'Phone MAC', type: 'action' },
                ]},
                { id: 'install_certs', label: 'Install network certificates', type: 'action' },
                { id: 'wifi_control_history', label: 'Wi-Fi control history', type: 'menu', children: [
                  { id: 'control_info', label: 'No apps have recently changed Wi-Fi', type: 'info' },
                ]},
              ],
            },
          ],
        },
        {
          id: 'bluetooth',
          label: 'Bluetooth',
          type: 'menu',
          badge: 'On',
          children: [
            { id: 'bluetooth_toggle', label: 'Bluetooth', type: 'toggle', value: true },
          ],
        },
        {
          id: 'nfc',
          label: 'NFC and contactless payments',
          type: 'menu',
          children: [
            { id: 'nfc_toggle', label: 'NFC', type: 'toggle', value: false, subtitle: 'Allow data exchange when the phone touches another device.' },
            { id: 'rw_p2p', label: 'Read/Write & P2P', type: 'toggle', value: false },
            { id: 'contactless_payments', label: 'Contactless payments', type: 'menu', children: [
              { id: 'default_payment', label: 'Default payment app', type: 'value', value: 'None' },
              { id: 'pay_with_screen_off', label: 'Pay with screen off', type: 'toggle', value: false },
            ]},
          ],
        },
        { id: 'airplane', label: 'Airplane mode', type: 'toggle', value: false, dividerAfter: true },
        {
          id: 'mobile_networks',
          label: 'Mobile networks',
          type: 'menu',
          children: [
            { id: 'mobile_data', label: 'Mobile data', type: 'toggle', value: true },
            {
              id: 'international_roaming',
              label: 'International data roaming',
              type: 'menu',
              children: [
                { id: 'roaming_toggle', label: 'Data roaming', type: 'toggle', value: false, subtitle: 'Connect to data services while roaming.' },
                { id: 'roaming_agreement', label: 'International usage agreement', type: 'action' },
              ],
            },
            {
              id: 'network_mode',
              label: 'Network mode',
              type: 'select',
              value: '5G/LTE/3G/2G (auto connect)',
              children: [
                { id: 'nm_5g_auto', label: '5G/LTE/3G/2G (auto connect)', type: 'action' },
                { id: 'nm_lte_auto', label: 'LTE/3G/2G (auto connect)', type: 'action' },
                { id: 'nm_3g_2g', label: '3G/2G (auto connect)', type: 'action' },
                { id: 'nm_2g', label: '2G only', type: 'action' },
              ],
            },
            {
              id: 'apn',
              label: 'Access Point Names',
              type: 'menu',
              children: [
                { id: 'apn_current', label: 'Carrier APN', type: 'value', value: 'Active', subtitle: 'internet' },
                { id: 'apn_add', label: 'Add APN', type: 'action' },
                { id: 'apn_reset', label: 'Reset to default', type: 'destructive' },
              ],
            },
            {
              id: 'network_operators',
              label: 'Network operators',
              type: 'menu',
              children: [
                { id: 'select_auto', label: 'Select automatically', type: 'toggle', value: true },
                { id: 'search_networks', label: 'Search networks', type: 'action', subtitle: 'Manual search for available networks.' },
              ],
            },
            { id: 'network_extender', label: 'Network extender', type: 'info', subtitle: 'Connect to a network extender if available.' },
            { id: 'volte', label: 'VoLTE calls', type: 'toggle', value: true, subtitle: 'Use LTE network for voice calls to improve call quality.' },
          ],
        },
        {
          id: 'data_usage',
          label: 'Data usage',
          type: 'menu',
          children: [
            { id: 'data_saver', label: 'Data saver', type: 'toggle', value: false, subtitle: 'Reduce data usage by preventing some apps from using data in the background.' },
            { id: 'mobile_data_toggle', label: 'Mobile data', type: 'toggle', value: true },
            { id: 'billing_cycle', label: 'Billing cycle and data warning', type: 'menu', children: [
              { id: 'start_billing', label: 'Start billing cycle on', type: 'value', value: '1st' },
              { id: 'data_warning', label: 'Set data usage warning', type: 'toggle', value: false },
              { id: 'data_limit', label: 'Set data limit', type: 'toggle', value: false },
            ]},
            { id: 'app_data_usage', label: 'App data usage', type: 'menu', children: [
              { id: 'app_usage_info', label: 'View data used by each app', type: 'info' },
            ]},
          ],
        },
        {
          id: 'hotspot',
          label: 'Mobile Hotspot and Tethering',
          type: 'menu',
          children: [
            { id: 'hotspot_toggle', label: 'Mobile Hotspot', type: 'toggle', value: false, subtitle: 'Share your phone\'s internet connection with other devices.' },
            { id: 'hotspot_config', label: 'Mobile Hotspot', type: 'menu', children: [
              { id: 'hotspot_name', label: 'Network name', type: 'value', value: 'Galaxy S23 Hotspot' },
              { id: 'hotspot_password', label: 'Password', type: 'value', value: '••••••••' },
              { id: 'hotspot_band', label: 'Band', type: 'select', value: '2.4 GHz', children: [
                { id: 'band_24', label: '2.4 GHz', type: 'action' },
                { id: 'band_5', label: '5 GHz', type: 'action' },
                { id: 'band_6', label: '6 GHz', type: 'action' },
              ]},
              { id: 'hotspot_timeout', label: 'Turn off hotspot automatically', type: 'toggle', value: true },
            ]},
            { id: 'usb_tethering', label: 'USB tethering', type: 'toggle', value: false, subtitle: 'Share this phone\'s internet connection via USB.' },
            { id: 'bt_tethering', label: 'Bluetooth tethering', type: 'toggle', value: false, subtitle: 'Share this phone\'s internet connection via Bluetooth.' },
            { id: 'ethernet_tethering', label: 'Ethernet tethering', type: 'toggle', value: false },
          ],
        },
        {
          id: 'more_settings',
          label: 'More connection settings',
          type: 'menu',
          children: [
            { id: 'nearby_scanning', label: 'Nearby device scanning', type: 'toggle', value: true, subtitle: 'Scan for nearby devices to quickly set up connections.' },
            { id: 'printing', label: 'Printing', type: 'menu', children: [
              { id: 'print_info', label: 'Add a printing service to print from your phone.', type: 'info' },
            ]},
            { id: 'vpn', label: 'VPN', type: 'menu', children: [
              { id: 'vpn_add', label: 'Add VPN', type: 'action' },
            ]},
            { id: 'private_dns', label: 'Private DNS', type: 'select', value: 'Automatic', children: [
              { id: 'dns_off', label: 'Off', type: 'action' },
              { id: 'dns_auto', label: 'Automatic', type: 'action' },
              { id: 'dns_custom', label: 'Private DNS provider hostname', type: 'action' },
            ]},
            { id: 'ethernet', label: 'Ethernet', type: 'info', subtitle: 'Connect an Ethernet cable to use a wired network.' },
          ],
        },
      ],
    },
    {
      id: 'general_management',
      label: 'General Management',
      icon: '⚙️',
      type: 'menu',
      children: [
        {
          id: 'reset',
          label: 'Reset',
          type: 'menu',
          children: [
            { id: 'reset_network_settings', label: 'Reset network settings', type: 'destructive', subtitle: 'Resets all Wi-Fi networks and passwords, mobile data settings, Bluetooth, and VPN/APN settings.' },
            { id: 'reset_all_settings', label: 'Reset all settings', type: 'destructive', subtitle: 'Resets all settings. No data or media is deleted.' },
            { id: 'factory_data_reset', label: 'Factory data reset', type: 'destructive', subtitle: 'Deletes all data from your device.' },
          ],
        },
      ],
    },
  ],
};
