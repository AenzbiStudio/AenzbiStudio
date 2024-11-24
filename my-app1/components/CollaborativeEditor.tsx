import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CollaborativeEditorProps {
  projectId: string;
  fileName: string;
}

export function CollaborativeEditor({ projectId, fileName }: CollaborativeEditorProps) {
  const [editor, setEditor] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    if (editor) {
      const doc = new Y.Doc();
      const provider = new WebsocketProvider('ws://localhost:1234', projectId, doc);
      const type = doc.getText('monaco');

      const binding = new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness);

      provider.awareness.setLocalStateField('user', {
        name: 'Anonymous', // Replace with actual user name
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      });

      provider.on('status', (event: { status: string }) => {
        console.log(event.status); // connected, disconnected, connecting
      });

      return () => {
        binding.destroy();
        provider.destroy();
      };
    }
  }, [editor, projectId]);

  const handleEditorDidMount = (editor) => {
    setEditor(editor);
  };

  const handleInvite = () => {
    // Here you would typically send an invitation to the email address
    console.log(`Inviting ${inviteEmail} to collaborate`);
    setInviteEmail('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="inviteEmail">Invite collaborator:</Label>
        <Input
          id="inviteEmail"
          type="email"
          placeholder="Enter email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
        />
        <Button onClick={handleInvite}>Invite</Button>
      </div>
      <div>
        <Label>Current collaborators:</Label>
        <ul className="list-disc list-inside">
          {collaborators.map((collaborator, index) => (
            <li key={index}>{collaborator}</li>
          ))}
        </ul>
      </div>
      <MonacoEditor
        width="100%"
        height="600px"
        language="javascript"
        theme="vs-dark"
        editorDidMount={handleEditorDidMount}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
        }}
      />
    </div>
  );
}

