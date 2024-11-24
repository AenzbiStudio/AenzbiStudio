import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState('14');
  const [autoSave, setAutoSave] = useState(false);

  const handleSaveSettings = () => {
    // Here you would typically save these settings to a backend or local storage
    console.log('Saving settings:', { theme, fontSize, autoSave });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="space-y-6">
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vs">Light</SelectItem>
                <SelectItem value="vs-dark">Dark</SelectItem>
                <SelectItem value="hc-black">High Contrast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="fontSize">Font Size</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger id="fontSize">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="18">18</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="autoSave"
              checked={autoSave}
              onCheckedChange={setAutoSave}
            />
            <Label htmlFor="autoSave">Auto-save</Label>
          </div>
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </div>
    </Layout>
  );
}

