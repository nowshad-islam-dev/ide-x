// client/src/components/CodeEditor.jsx
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../axiosInstance.js';
import CodeEditorInput from './CodeEditorInput';
import CodeEditorPane from './CodeEditorPane';

const CodeEditor = () => {
  const { id } = useParams(); // Get snippet ID from URL params
  const [loading, setLoading] = useState(true); // Add a loading state
  const [html, setHtml] = useState('<h1>Hello, World!</h1>');
  const [css, setCss] = useState('body { background-color: #f0f0f0; }');
  const [js, setJs] = useState('console.log("Hello, World!");');
  const [title, setTitle] = useState('My Snippet');
  const [srcDoc, setSrcDoc] = useState('');
  const [filename, setFilename] = useState('snippet');
  const navigate = useNavigate();

  // Fetch snippet data if editing an existing snippet
  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController instance
    const signal = abortController.signal; // Get the signal to pass to the fetch request

    const fetchSnippet = async () => {
      if (id) {
        try {
          const res = await axiosInstance.get(`/snippet/${id}`, { signal });
          const { title, html, css, js } = res.data;
          setTitle(title);
          setHtml(html);
          setCss(css);
          setJs(js);
        } catch (err) {
          // Ignore errors caused by aborting
          if (err.name !== 'CanceledError') {
            console.error(
              'Failed to fetch snippet',
              err?.response?.data?.message
            );

            toast.error(
              'Failed to load snippet. Redirecting to snippets page.'
            );
            navigate('/snippets'); // Redirect if snippet cannot be loaded
          }
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        setLoading(false); // No need to fetch for new snippets
      }
    };

    fetchSnippet();

    // Cleanup function to abort the request if the component unmounts
    return () => {
      abortController.abort(); // Abort any ongoing request
    };
  }, [id, navigate]);

  // Update the iframe content whenever HTML, CSS, or JS changes
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

  // Function to save the snippet
  const handleSaveSnippet = async () => {
    // Check if at least one of the code fields is non-empty
    if (!html.trim() && !css.trim() && !js.trim()) {
      alert('At least one code field (HTML, CSS, JS) must be filled.');
      return;
    }

    try {
      if (id) {
        // Update existing snippet
        await axiosInstance.put(`/snippet/${id}`, {
          title,
          html,
          css,
          js,
        });
        toast.success('Snippet updated successfully!');
      } else {
        // save new snippet
        await axiosInstance.post('/snippet', { title, html, css, js });
        toast.success('Snippet saved successfully!');
      }
    } catch (err) {
      console.error(err?.response?.data?.message);
      toast.success('Failed to save snippet. Please try again');
    }
  };

  // Function to download a file
  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  // Export as separate files
  const handleExportSeparateFiles = () => {
    downloadFile(html, `${title}-html.html`, 'text/html');
    downloadFile(css, `${title}-css.css`, 'text/css');
    downloadFile(js, `${title}-js.js`, 'application/javascript');
    toast.success('Snippet exported as separate files!');
  };

  // Export as a single HTML file
  const handleExportSingleFile = () => {
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `;
    downloadFile(fullHtml, `${title}.html`, 'text/html');
    toast.success('Snippet exported as a single HTML file!');
  };

  // Show a loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* Title Input */}
      <CodeEditorInput
        label="Snippet Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter snippet title"
      />

      {/* Editors */}
      <div className="grid grid-cols-3 gap-4">
        <CodeEditorPane
          language="html"
          value={html}
          onChange={(value) => setHtml(value || '')}
          title="HTML"
        />
        <CodeEditorPane
          language="css"
          value={css}
          onChange={(value) => setCss(value || '')}
          title="CSS"
        />
        <CodeEditorPane
          language="javascript"
          value={js}
          onChange={(value) => setJs(value || '')}
          title="JavaScript"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveSnippet}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
      >
        {id ? 'Update Snippet' : 'Save Snippet'}
      </button>

      <button className="bg-blue-600 hover:bg-blue-500 p-2 ml-2 rounded-md text-white font-semibold transition duration-300">
        <Link to="/">Home</Link>
      </button>

      {/* Export Buttons */}
      <div className="mt-4 space-x-2">
        <button
          onClick={handleExportSeparateFiles}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Export Separate Files
        </button>
        <button
          onClick={handleExportSingleFile}
          className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
        >
          Export Single File
        </button>
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
