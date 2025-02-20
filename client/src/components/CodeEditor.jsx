// client/src/components/CodeEditor.jsx
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [html, setHtml] = useState('<h1>Hello, World!</h1>');
  const [css, setCss] = useState('body { background-color: #f0f0f0; }');
  const [js, setJs] = useState('console.log("Hello, World!");');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
            <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
            </html>`);
    }, 250);
    // Debounce the update to avoid too many re-renders
    // Clear timeout on cleanup
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* HTML Editor */}
      <div className="col-span-1">
        <h2 className="text-lg font-bold mb-2">HTML</h2>
        <Editor
          height="400px"
          defaultLanguage="html"
          defaultValue={html}
          onChange={(value) => setHtml(value)}
          theme="vs-dark"
        />
      </div>

      {/* CSS Editor */}
      <div className="col-span-1">
        <h2 className="text-lg font-bold mb-2">HTML</h2>
        <Editor
          height="400px"
          defaultLanguage="css"
          defaultValue={css}
          onChange={(value) => setCss(value)}
          theme="vs-dark"
        />
      </div>

      {/* JS Editor */}
      <div className="col-span-1">
        <h2 className="text-lg font-bold mb-2">HTML</h2>
        <Editor
          height="400px"
          defaultLanguage="javascript"
          defaultValue={js}
          onChange={(value) => setJs(value)}
          theme="vs-dark"
        />
      </div>

      {/* Output */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
