import React, { useState, useRef, useEffect } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export function Terminal() {
  const terminalRef = useRef(null);
  const [terminal, setTerminal] = useState(null);

  useEffect(() => {
    if (terminalRef.current) {
      const term = new XTerm();
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();
      setTerminal(term);

      term.writeln('Welcome to AenzbiStudio Terminal');
      term.writeln('Type your commands here...');

      term.onData(data => {
        // Here you would typically send the data to a backend
        // For now, we'll just echo it back
        term.write(data);
      });
    }

    return () => {
      if (terminal) {
        terminal.dispose();
      }
    };
  }, []);

  return <div ref={terminalRef} style={{ height: '400px' }} />;
}

