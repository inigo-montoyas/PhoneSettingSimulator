export type SettingType = 'menu' | 'toggle' | 'value' | 'info' | 'action' | 'destructive' | 'select';

export interface SettingItem {
  id: string;
  label: string;
  subtitle?: string;
  icon?: string;
  type: SettingType;
  value?: string | boolean;
  badge?: string;
  children?: SettingItem[];
  dividerAfter?: boolean;
}

export type UIStyle = 'ios' | 'samsung' | 'pixel' | 'xiaomi' | 'oneplus';

export interface OSTheme {
  style: UIStyle;
  headerBg: string;
  headerText: string;
  bodyBg: string;
  cardBg: string;
  itemText: string;
  subtitleText: string;
  separatorColor: string;
  accentColor: string;
  toggleColor: string;
  chevronColor: string;
  sectionHeaderText: string;
  destructiveColor: string;
}

export interface OSConfig {
  id: string;
  vendor: string;
  osName: string;
  version: string;
  theme: OSTheme;
  settings: SettingItem[];
}

export interface VendorConfig {
  id: string;
  name: string;
  color: string;
  textColor: string;
  logo: string;
  versions: OSConfig[];
}
