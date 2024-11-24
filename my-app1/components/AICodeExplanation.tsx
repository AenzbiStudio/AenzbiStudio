import React, { useState } from 'react';
import { useCompletion } from 'ai/react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function AICodeExplanation() {
  const [code, setCode] = useState('');
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/explain',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    complete(code);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here for explanation..."
          rows={5}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Explaining...' : 'Explain Code'}
        </Button>
      </form>
      {completion && (
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="whitespace-pre-wrap">{completion}</p>
        </div>
      )}
    </div>
  );
}

