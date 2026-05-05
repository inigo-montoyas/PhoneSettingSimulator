import type { SettingItem } from '../types';

export type Path = number[];

export function pathKey(path: Path): string {
  return path.join('-');
}

export function pathEquals(a: Path | null, b: Path | null): boolean {
  if (!a || !b) return false;
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export function getAtPath(items: SettingItem[], path: Path): SettingItem | null {
  if (path.length === 0) return null;
  const [head, ...rest] = path;
  const item = items[head];
  if (!item) return null;
  if (rest.length === 0) return item;
  return getAtPath(item.children ?? [], rest);
}

export function updateAtPath(items: SettingItem[], path: Path, updates: Partial<SettingItem>): SettingItem[] {
  const [head, ...rest] = path;
  return items.map((item, i) => {
    if (i !== head) return item;
    if (rest.length === 0) return { ...item, ...updates };
    return { ...item, children: updateAtPath(item.children ?? [], rest, updates) };
  });
}

export function addChildAtPath(items: SettingItem[], path: Path, newItem: SettingItem): SettingItem[] {
  if (path.length === 0) return [...items, newItem];
  const [head, ...rest] = path;
  return items.map((item, i) => {
    if (i !== head) return item;
    if (rest.length === 0) return { ...item, children: [...(item.children ?? []), newItem] };
    return { ...item, children: addChildAtPath(item.children ?? [], rest, newItem) };
  });
}

export function addSiblingAtPath(items: SettingItem[], path: Path, newItem: SettingItem): SettingItem[] {
  if (path.length === 0) return items;
  const [head, ...rest] = path;
  if (rest.length === 0) {
    const arr = [...items];
    arr.splice(head + 1, 0, newItem);
    return arr;
  }
  return items.map((item, i) => {
    if (i !== head) return item;
    return { ...item, children: addSiblingAtPath(item.children ?? [], rest, newItem) };
  });
}

export function removeAtPath(items: SettingItem[], path: Path): SettingItem[] {
  const [head, ...rest] = path;
  if (rest.length === 0) return items.filter((_, i) => i !== head);
  return items.map((item, i) => {
    if (i !== head) return item;
    return { ...item, children: removeAtPath(item.children ?? [], rest) };
  });
}

export function moveAtPath(items: SettingItem[], path: Path, dir: 'up' | 'down'): SettingItem[] {
  const [head, ...rest] = path;
  if (rest.length === 0) {
    const arr = [...items];
    const target = dir === 'up' ? head - 1 : head + 1;
    if (target < 0 || target >= arr.length) return arr;
    [arr[head], arr[target]] = [arr[target], arr[head]];
    return arr;
  }
  return items.map((item, i) => {
    if (i !== head) return item;
    return { ...item, children: moveAtPath(item.children ?? [], rest, dir) };
  });
}

export function makeNewItem(): SettingItem {
  return {
    id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    label: 'New Item',
    type: 'menu',
  };
}
