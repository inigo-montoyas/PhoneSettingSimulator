import { useState, useCallback } from 'react';
import type { SettingItem } from '../../types';
import { TreeNode } from './TreeNode';
import { ItemForm } from './ItemForm';
import {
  pathKey, pathEquals,
  getAtPath, updateAtPath, addChildAtPath,
  addSiblingAtPath, removeAtPath, moveAtPath,
  makeNewItem, type Path,
} from '../../utils/treeUtils';

interface Props {
  settings: SettingItem[];
  onChange: (settings: SettingItem[]) => void;
}

export function TreePanel({ settings, onChange }: Props) {
  const [selectedPath, setSelectedPath] = useState<Path | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(['0']));

  const selectedItem = selectedPath ? getAtPath(settings, selectedPath) : null;

  const toggleExpand = useCallback((path: Path) => {
    const k = pathKey(path);
    setExpandedKeys(prev => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  }, []);

  const handleSelect = useCallback((path: Path) => {
    setSelectedPath(prev => pathEquals(prev, path) ? null : path);
  }, []);

  const handleAddChild = useCallback((path: Path) => {
    const newItem = makeNewItem();
    onChange(addChildAtPath(settings, path, newItem));
    // auto-expand parent and select new child
    const k = pathKey(path);
    setExpandedKeys(prev => { const n = new Set(prev); n.add(k); return n; });
    const parent = getAtPath(settings, path);
    const childIdx = (parent?.children?.length ?? 0);
    setSelectedPath([...path, childIdx]);
  }, [settings, onChange]);

  const handleAddSibling = useCallback((path: Path) => {
    const newItem = makeNewItem();
    onChange(addSiblingAtPath(settings, path, newItem));
    setSelectedPath([...path.slice(0, -1), path[path.length - 1] + 1]);
  }, [settings, onChange]);

  const handleAddRoot = useCallback(() => {
    const newItem = makeNewItem();
    onChange([...settings, newItem]);
    setSelectedPath([settings.length]);
  }, [settings, onChange]);

  const handleDelete = useCallback((path: Path) => {
    onChange(removeAtPath(settings, path));
    setSelectedPath(null);
  }, [settings, onChange]);

  const handleMove = useCallback((path: Path, dir: 'up' | 'down') => {
    onChange(moveAtPath(settings, path, dir));
    const last = path[path.length - 1];
    const newIdx = dir === 'up' ? last - 1 : last + 1;
    if (newIdx >= 0) setSelectedPath([...path.slice(0, -1), newIdx]);
  }, [settings, onChange]);

  const handleItemChange = useCallback((updates: Partial<SettingItem>) => {
    if (!selectedPath) return;
    onChange(updateAtPath(settings, selectedPath, updates));
  }, [settings, selectedPath, onChange]);

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      {/* Tree header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <span className="text-sm font-semibold text-gray-700">Settings Tree</span>
        <button
          onClick={handleAddRoot}
          className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + Add top-level item
        </button>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto border border-gray-200 rounded-xl bg-white p-2 min-h-0">
        {settings.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No items yet. Add a top-level item to start.</p>
        ) : (
          settings.map((item, idx) => (
            <TreeNode
              key={item.id}
              item={item}
              path={[idx]}
              depth={0}
              selectedPath={selectedPath}
              expandedKeys={expandedKeys}
              onSelect={handleSelect}
              onToggleExpand={toggleExpand}
              onAddChild={handleAddChild}
              onAddSibling={handleAddSibling}
              onDelete={handleDelete}
              onMove={handleMove}
            />
          ))
        )}
      </div>

      {/* Item editor form */}
      {selectedItem && (
        <div className="flex-shrink-0">
          <ItemForm
            key={pathKey(selectedPath!)}
            item={selectedItem}
            onChange={handleItemChange}
            onClose={() => setSelectedPath(null)}
          />
        </div>
      )}
    </div>
  );
}
