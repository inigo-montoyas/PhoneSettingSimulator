import type { VendorConfig } from '../../types';
import { ios16 } from './ios16';
import { ios17 } from './ios17';
import { ios18 } from './ios18';
import { ios26 } from './ios26';

export const appleVendor: VendorConfig = {
  id: 'apple',
  name: 'Apple',
  color: '#000000',
  textColor: '#ffffff',
  logo: '',
  versions: [ios26, ios18, ios17, ios16],
};
