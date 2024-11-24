import React from 'react';
import { Button } from "@/components/ui/button"

const snippets = {
  javascript: [
    { name: 'Console Log', code: 'console.log();' },
    { name: 'Function', code: 'function name() {\n\n}' },
    { name: 'Arrow Function', code: 'const name = () => {\n\n};' },
  ],
  typescript: [
    { name: 'Interface', code: 'interface Name {\n\n}' },
    { name: 'Type', code: 'type Name = {\n\n};' },
    { name: 'Enum', code: 'enum Name {\n\n}' },
  ],
  // Add snippets for other languages...
};

export function Snippets({ language, onInsert }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Snippets</h3>
      <div className="space-y-2">
        {snippets[language]?.map((snippet, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start"
            onClick={() => onInsert(snippet.code)}
          >
            {snippet.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

