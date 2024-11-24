import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Extension {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

const initialExtensions: Extension[] = [
  { id: '1', name: 'Code Formatter', description: 'Automatically format your code', enabled: true },
  { id: '2', name: 'Git Integration', description: 'Enhanced Git features', enabled: false },
  { id: '3', name: 'Linter', description: 'Lint your code for potential errors', enabled: true },
];

export function ExtensionManager() {
  const [extensions, setExtensions] = useState(initialExtensions);

  const toggleExtension = (id: string) => {
    setExtensions(extensions.map(ext => 
      ext.id === id ? { ...ext, enabled: !ext.enabled } : ext
    ));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Extension Manager</h2>
      {extensions.map(extension => (
        <div key={extension.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
          <div>
            <h3 className="text-lg font-semibold">{extension.name}</h3>
            <p className="text-sm text-gray-600">{extension.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id={`extension-${extension.id}`}
              checked={extension.enabled}
              onCheckedChange={() => toggleExtension(extension.id)}
            />
            <Label htmlFor={`extension-${extension.id}`}>
              {extension.enabled ? 'Enabled' : 'Disabled'}
            </Label>
          </div>
        </div>
      ))}
      <Button className="mt-4">Install New Extension</Button>
    </div>
  );
}

