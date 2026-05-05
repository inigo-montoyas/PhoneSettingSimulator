import type { VendorConfig } from '../../types';
import { oneui5 } from './oneui5';
import { oneui6 } from './oneui6';
import { oneui7 } from './oneui7';
import { oneui8 } from './oneui8';
import { oneui8_5 } from './oneui8_5';

export const samsungVendor: VendorConfig = {
  id: 'samsung',
  name: 'Samsung',
  color: '#1259c3',
  textColor: '#ffffff',
  logo: '',
  versions: [oneui8_5, oneui8, oneui7, oneui6, oneui5],
};
