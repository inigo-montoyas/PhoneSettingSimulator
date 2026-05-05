import type { OSConfig } from '../../types';

const iosTheme = {
  style: 'ios' as const,
  headerBg: '#f2f2f7',
  headerText: '#000000',
  bodyBg: '#f2f2f7',
  cardBg: '#ffffff',
  itemText: '#000000',
  subtitleText: '#8e8e93',
  separatorColor: '#c6c6c8',
  accentColor: '#007aff',
  toggleColor: '#34c759',
  chevronColor: '#c7c7cc',
  sectionHeaderText: '#6d6d72',
  destructiveColor: '#ff3b30',
};

export const ios16: OSConfig = {
  id: 'ios16',
  vendor: 'apple',
  osName: 'iOS',
  version: '16',
  theme: iosTheme,
  settings: [
    {
      id: 'airplane_mode',
      label: 'Airplane Mode',
      icon: '✈️',
      type: 'toggle',
      value: false,
      dividerAfter: true,
    },
    {
      id: 'wifi',
      label: 'Wi-Fi',
      icon: '📡',
      type: 'menu',
      badge: 'HomeNetwork_5G',
      children: [
        { id: 'wifi_toggle', label: 'Wi-Fi', type: 'toggle', value: true, dividerAfter: true },
        {
          id: 'wifi_network',
          label: 'HomeNetwork_5G',
          type: 'menu',
          badge: '✓',
          children: [
            { id: 'wifi_unsecured', label: 'Unsecured Network', type: 'info', subtitle: 'Open networks provide no security.' },
            { id: 'wifi_ip_address', label: 'IP Address', type: 'value', value: '192.168.1.10' },
            { id: 'wifi_forget', label: 'Forget This Network', type: 'destructive' },
          ],
        },
        { id: 'wifi_divider', label: 'OTHER NETWORKS', type: 'info', dividerAfter: true },
        {
          id: 'ask_to_join',
          label: 'Ask to Join Networks',
          type: 'select',
          value: 'Notify',
          children: [
            { id: 'notify_off', label: 'Off', type: 'action' },
            { id: 'notify_on', label: 'Notify', type: 'action', subtitle: 'Known networks will be joined automatically. If no known networks are available, you will be notified of available networks.' },
            { id: 'notify_ask', label: 'Ask', type: 'action' },
          ],
        },
        {
          id: 'auto_join_hotspot',
          label: 'Auto-Join Hotspot',
          type: 'select',
          value: 'Ask to Join',
          children: [
            { id: 'hotspot_never', label: 'Never', type: 'action' },
            { id: 'hotspot_ask', label: 'Ask to Join', type: 'action' },
            { id: 'hotspot_auto', label: 'Automatic', type: 'action' },
          ],
        },
      ],
    },
    {
      id: 'bluetooth',
      label: 'Bluetooth',
      icon: '🔷',
      type: 'menu',
      badge: 'On',
      children: [
        { id: 'bluetooth_toggle', label: 'Bluetooth', type: 'toggle', value: true, dividerAfter: true },
      ],
    },
    {
      id: 'cellular',
      label: 'Cellular',
      icon: '📶',
      type: 'menu',
      dividerAfter: true,
      children: [
        {
          id: 'cellular_data',
          label: 'Cellular Data',
          type: 'toggle',
          value: true,
          subtitle: 'Turn off to restrict all data to Wi-Fi.',
        },
        {
          id: 'cellular_data_options',
          label: 'Cellular Data Options',
          type: 'menu',
          children: [
            {
              id: 'voice_data',
              label: 'Voice & Data',
              type: 'select',
              value: '5G Auto',
              children: [
                { id: 'vd_5g_on', label: '5G On', type: 'action', subtitle: 'Uses 5G whenever available, even if it reduces battery life.' },
                { id: 'vd_5g_auto', label: '5G Auto', type: 'action', subtitle: 'Uses 5G only when it won\'t significantly reduce battery life. Recommended.' },
                { id: 'vd_lte', label: 'LTE', type: 'action' },
              ],
            },
            {
              id: 'data_mode',
              label: 'Data Mode',
              type: 'select',
              value: 'Standard',
              children: [
                { id: 'dm_more_5g', label: 'Allow More Data on 5G', type: 'action', subtitle: 'Higher-quality video streaming, FaceTime, and automatic updates.' },
                { id: 'dm_standard', label: 'Standard', type: 'action', subtitle: 'Same settings as on LTE.' },
                { id: 'dm_low', label: 'Low Data Mode', type: 'action', subtitle: 'Reduce data usage on 5G.' },
              ],
            },
            {
              id: 'data_roaming',
              label: 'Data Roaming',
              type: 'toggle',
              value: false,
              subtitle: 'Turn on to use cellular data when traveling internationally. Charges may apply.',
            },
            {
              id: 'low_data_mode',
              label: 'Low Data Mode',
              type: 'toggle',
              value: false,
              subtitle: 'Reduce data usage on cellular.',
            },
          ],
        },
        {
          id: 'personal_hotspot',
          label: 'Personal Hotspot',
          type: 'menu',
          badge: 'Off',
          children: [
            { id: 'allow_others', label: 'Allow Others to Join', type: 'toggle', value: false },
            { id: 'hotspot_password', label: 'Wi-Fi Password', type: 'value', value: '••••••••' },
          ],
        },
        {
          id: 'carrier',
          label: 'Carrier',
          type: 'value',
          value: 'Automatic',
        },
        {
          id: 'network_selection',
          label: 'Network Selection',
          type: 'menu',
          children: [
            { id: 'automatic', label: 'Automatic', type: 'toggle', value: true, subtitle: 'Automatically select a network.' },
          ],
        },
        {
          id: 'wifi_calling',
          label: 'Wi-Fi Calling',
          type: 'menu',
          badge: 'Off',
          children: [
            { id: 'wifi_calling_toggle', label: 'Wi-Fi Calling on This iPhone', type: 'toggle', value: false, subtitle: 'Allows calls over Wi-Fi when cellular is unavailable or poor.' },
          ],
        },
        {
          id: 'sim_pin',
          label: 'SIM PIN',
          type: 'menu',
          children: [
            { id: 'sim_pin_toggle', label: 'SIM PIN', type: 'toggle', value: false, subtitle: 'Require a PIN to use SIM card.' },
          ],
        },
        {
          id: 'sim_apps',
          label: 'SIM Applications',
          type: 'menu',
          dividerAfter: true,
          children: [
            { id: 'sim_info', label: 'SIM Toolkit', type: 'info', subtitle: 'Access SIM card features provided by your carrier.' },
          ],
        },
      ],
    },
    {
      id: 'vpn',
      label: 'VPN & Device Management',
      icon: '🔒',
      type: 'menu',
      badge: 'Not Connected',
      children: [
        { id: 'vpn_status', label: 'VPN Status', type: 'value', value: 'Not Connected' },
        { id: 'add_vpn', label: 'Add VPN Configuration...', type: 'action' },
      ],
    },
    {
      id: 'general',
      label: 'General',
      icon: '⚙️',
      type: 'menu',
      children: [
        {
          id: 'transfer_reset',
          label: 'Transfer or Reset iPhone',
          type: 'menu',
          children: [
            { id: 'erase_all', label: 'Erase All Content and Settings', type: 'destructive', subtitle: 'This will delete all media and data, and reset all settings.' },
            {
              id: 'reset',
              label: 'Reset',
              type: 'menu',
              children: [
                { id: 'reset_all_settings', label: 'Reset All Settings', type: 'destructive', subtitle: 'Resets all settings. No data or media is deleted.' },
                { id: 'reset_network_settings', label: 'Reset Network Settings', type: 'destructive', subtitle: 'Resets Wi-Fi networks and passwords, cellular settings, and VPN and APN settings.' },
                { id: 'reset_keyboard_dict', label: 'Reset Keyboard Dictionary', type: 'destructive' },
                { id: 'reset_home_screen', label: 'Reset Home Screen Layout', type: 'destructive' },
                { id: 'reset_location_privacy', label: 'Reset Location & Privacy', type: 'destructive' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
