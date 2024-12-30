import React, { useState } from 'react';
import Editor from './components/Editor';
import Terminal from './components/Terminal';
import Toolbar from './components/Toolbar';

const App = () => {
  const [code, setCode] = useState(
    'fun main() {
    println("Hello, Kotlin!")
}'
  );
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    try {
      const response = await fetch('http://localhost:3000/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      setOutput(data.output || data.error || 'No output');
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const handleCompile = async () => {
    try {
      const response = await fetch('http://localhost:3000/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      setOutput(data.success ? 'Compilation successful!' : data.output);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Toolbar
        onRun={handleRun}
        onCompile={handleCompile}
        onSave={() => console.log('Save clicked')}
      />
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          <div className="h-full">
            <Editor code={code} onChange={setCode} />
          </div>
          <div className="flex flex-col space-y-4">
            <Terminal output={output} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;