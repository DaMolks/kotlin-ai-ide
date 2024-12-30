import React from 'react';
import { Play, Code2, Save } from 'lucide-react';

interface ToolbarProps {
  onRun: () => void;
  onCompile: () => void;
  onSave: () => void;
}

const Toolbar = ({ onRun, onCompile, onSave }: ToolbarProps) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-800 border-b border-gray-700">
    <button
      onClick={onRun}
      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
    >
      <Play className="w-4 h-4 mr-2" />
      Run
    </button>
    
    <button
      onClick={onCompile}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      <Code2 className="w-4 h-4 mr-2" />
      Compile
    </button>
    
    <button
      onClick={onSave}
      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
    >
      <Save className="w-4 h-4 mr-2" />
      Save
    </button>
  </div>
);

export default Toolbar;