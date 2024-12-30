import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const Editor = ({ code, onChange }: { code: string; onChange: (value: string) => void }) => (
  <div className="h-full w-full rounded-md overflow-hidden border border-gray-700 bg-gray-800">
    <MonacoEditor
      height="100%"
      defaultLanguage="kotlin"
      theme="vs-dark"
      value={code}
      onChange={(value) => onChange(value || '')}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        automaticLayout: true,
      }}
    />
  </div>
);

export default Editor;