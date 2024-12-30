import React, { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  path: string;
}

const FileExplorer = ({ onFileSelect }: { onFileSelect: (path: string) => void }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const sampleFiles: FileNode = {
    name: 'project',
    type: 'directory',
    path: '/',
    children: [
      {
        name: 'src',
        type: 'directory',
        path: '/src',
        children: [
          { name: 'Main.kt', type: 'file', path: '/src/Main.kt' },
          { name: 'Utils.kt', type: 'file', path: '/src/Utils.kt' }
        ]
      },
      { name: 'README.md', type: 'file', path: '/README.md' }
    ]
  };

  const toggleDir = (path: string) => {
    const newExpanded = new Set(expanded);
    if (expanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpanded(newExpanded);
  };

  const renderNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expanded.has(node.path);

    return (
      <div key={node.path} style={{ paddingLeft: `${level * 16}px` }}>
        <div
          className={`flex items-center p-1 hover:bg-gray-700 rounded cursor-pointer ${
            node.type === 'file' ? 'text-gray-300' : 'text-gray-100'
          }`}
          onClick={() => node.type === 'directory' ? toggleDir(node.path) : onFileSelect(node.path)}
        >
          {node.type === 'directory' && (
            <span className="mr-1">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
          {node.type === 'directory' ? <Folder size={16} className="mr-2" /> : <File size={16} className="mr-2" />}
          <span className="text-sm">{node.name}</span>
        </div>
        {node.type === 'directory' && isExpanded && node.children?.map(child => renderNode(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-2 rounded-md h-full overflow-auto">
      {renderNode(sampleFiles)}
    </div>
  );
};

export default FileExplorer;