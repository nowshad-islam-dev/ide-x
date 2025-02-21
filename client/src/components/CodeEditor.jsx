// client/src/components/CodeEditor.jsx
import { useState, useEffect, useContext } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

import AuthContext from '../context/AuthContext';

const CodeEditor = () => {
  const [html, setHtml] = useState('<h1>Hello, World!</h1>');
  const [css, setCss] = useState('body { background-color: #f0f0f0; }');
  const [js, setJs] = useState('console.log("Hello, World!");');
  const [srcDoc, setSrcDoc] = useState('');
  const [title, setTitle] = useState('My Snippet');
  const { token } = useContext(AuthContext);

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

  const handleSaveSnippet = async () => {
    // Check if at least one of the code fields is non-empty
    if (!html.trim() && !css.trim() && !js.trim()) {
      alert('At least one code field (HTML, CSS, JS) must be filled.');
      return;
    }

    try {
      await axios.post(
        '/api/snippet',
        { title, html, css, js },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Snippet saved successfully!');
    } catch (err) {
      console.error(err?.response?.data?.message);
      alert('Failed to save snippet');
    }
  };

  return (
    <div className="p-2">
      <div className="mb-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Snippet Title"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
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
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveSnippet}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Save Snippet
      </button>

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
