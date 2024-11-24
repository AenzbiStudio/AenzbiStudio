import React, { useState } from 'react';
import { useCompletion } from 'ai/react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function AICodeCompletion() {
  const [prompt, setPrompt] = useState('');
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/completion',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    complete(prompt);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your code or description here..."
          rows={5}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Code'}
        </Button>
      </form>
      {completion && (
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="whitespace-pre-wrap">{completion}</pre>
        </div>
      )}
    </div>
  );
}

