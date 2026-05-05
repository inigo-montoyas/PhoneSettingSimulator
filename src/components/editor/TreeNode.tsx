import type { SettingItem } from '../../types';
import { pathKey, pathEquals, type Path } from '../../utils/treeUtils';

interface Props {
  item: SettingItem;
  path: Path;
  depth: number;
  selectedPath: Path | null;
  expandedKeys: Set<string>;
  onSelect: (path: Path) => void;
  onToggleExpand: (path: Path) => void;
  onAddChild: (path: Path) => void;
  onAddSibling: (path: Path) => void;
  onDelete: (path: Path) => void;
  onMove: (path: Path, dir: 'up' | 'down') => void;
}

const TYPE_COLORS: Record<string, string> = {
  menu: 'bg-blue-100 text-blue-700',
  toggle: 'bg-green-100 text-green-700',
  value: 'bg-purple-100 text-purple-700',
  select: 'bg-yellow-100 text-yellow-700',
  action: 'bg-gray-100 text-gray-600',
  info: 'bg-slate-100 text-slate-600',
  destructive: 'bg-red-100 text-red-600',
};

export function TreeNode({
  item, path, depth, selectedPath, expandedKeys,
  onSelect, onToggleExpand, onAddChild, onAddSibling, onDelete, onMove,
}: Props) {
  const key = pathKey(path);
  const isSelected = pathEquals(path, selectedPath);
  const hasChildren = (item.children?.length ?? 0) > 0;
  const isExpanded = expandedKeys.has(key);

  return (
    <div>
      <div
        className={`group flex items-center gap-1 rounded-lg px-2 py-1.5 cursor-pointer transition-colors ${
          isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => onSelect(path)}
      >
        {/* Expand toggle */}
        <button
          className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 flex-shrink-0"
          onClick={e => { e.stopPropagation(); onToggleExpand(path); }}
        >
          {hasChildren ? (isExpanded ? '▾' : '▸') : <span className="w-3" />}
        </button>

        {/* Icon */}
        {item.icon && <span className="text-base flex-shrink-0">{item.icon}</span>}

        {/* Label */}
        <span className="text-sm text-gray-800 flex-1 truncate">{item.label}</span>

        {/* Type badge */}
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${TYPE_COLORS[item.type] ?? 'bg-gray-100 text-gray-600'}`}>
          {item.type}
        </span>

        {/* Action buttons — always visible on selected, hover on others */}
        <div className={`flex items-center gap-0.5 flex-shrink-0 ${isSelected ? 'flex' : 'hidden group-hover:flex'}`}>
          <button title="Move up" onClick={e => { e.stopPropagation(); onMove(path, 'up'); }}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded text-xs">↑</button>
          <button title="Move down" onClick={e => { e.stopPropagation(); onMove(path, 'down'); }}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded text-xs">↓</button>
          <button title="Add child item" onClick={e => { e.stopPropagation(); onAddChild(path); }}
            className="w-6 h-6 flex items-center justify-center text-blue-400 hover:text-blue-700 hover:bg-blue-100 rounded text-xs font-bold">⤵</button>
          <button title="Add item below" onClick={e => { e.stopPropagation(); onAddSibling(path); }}
            className="w-6 h-6 flex items-center justify-center text-green-500 hover:text-green-700 hover:bg-green-100 rounded text-xs font-bold">+</button>
          <button title="Delete" onClick={e => { e.stopPropagation(); onDelete(path); }}
            className="w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-100 rounded text-xs">✕</button>
        </div>
      </div>

      {/* Children */}
      {isExpanded && hasChildren && (
        <div>
          {item.children!.map((child, idx) => (
            <TreeNode
              key={child.id}
              item={child}
              path={[...path, idx]}
              depth={depth + 1}
              selectedPath={selectedPath}
              expandedKeys={expandedKeys}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
              onAddChild={onAddChild}
              onAddSibling={onAddSibling}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
