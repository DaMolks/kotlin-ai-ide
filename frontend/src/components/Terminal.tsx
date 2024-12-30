import React from 'react';

const Terminal = ({ output }: { output: string }) => (
  <div className="h-64 bg-black rounded-md p-4 font-mono text-sm overflow-auto">
    <pre className="text-green-400">{output || 'Ready...'}</pre>
  </div>
);

export default Terminal;