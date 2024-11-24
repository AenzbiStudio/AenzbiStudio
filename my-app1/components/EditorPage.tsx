import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

export default function EditorPage() {
  const [code, setCode] = useState('// Start coding here');

  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };

  return (
    <div className="h-screen bg-gray-100 p-4">
      <MonacoEditor
        width="100%"
        height="90%"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={setCode}
      />
    </div>
  );
}

