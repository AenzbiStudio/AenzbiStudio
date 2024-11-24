import * as monaco from 'monaco-editor';
import { ipcRenderer } from 'electron';

// Initialize Monaco Editor
const editor = monaco.editor.create(document.getElementById('editor')!, {
  value: '// Welcome to AenzbiStudio',
  language: 'javascript',
  theme: 'vs-dark',
});

// File tree functionality
const fileTree = document.getElementById('file-tree')!;

function updateFileTree(files: string[]) {
  fileTree.innerHTML = '';
  files.forEach(file => {
    const li = document.createElement('li');
    li.textContent = file;
    li.addEventListener('click', () => openFile(file));
    fileTree.appendChild(li);
  });
}

async function openFile(filePath: string) {
  try {
    const content = await ipcRenderer.invoke('read-file', filePath);
    editor.setValue(content);
  } catch (error) {
    console.error('Error opening file:', error);
  }
}

// Example usage: updateFileTree(['file1.js', 'file2.js', 'file3.js']);

// Save file functionality
async function saveFile(filePath: string, content: string) {
  try {
    await ipcRenderer.invoke('write-file', filePath, content);
    console.log('File saved successfully');
  } catch (error) {
    console.error('Error saving file:', error);
  }
}

// Example usage: saveFile('example.js', editor.getValue());

