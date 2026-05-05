import type { VendorConfig } from '../types';
import { appleVendor } from './apple';
import { samsungVendor } from './samsung';
import { googleVendor } from './google';
import { xiaomiVendor } from './xiaomi';
import { onePlusVendor } from './oneplus';

export const vendors: VendorConfig[] = [
  appleVendor,
  samsungVendor,
  googleVendor,
  xiaomiVendor,
  onePlusVendor,
];
