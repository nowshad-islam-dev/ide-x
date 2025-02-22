// client/src/components/CodeEditor.jsx
import { useState, useEffect, useContext } from 'react';
import Editor from '@monaco-editor/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance.js';

import AuthContext from '../context/AuthContext';

const CodeEditor = () => {
  const { id } = useParams(); // Get snippet ID from URL params
  const [loading, setLoading] = useState(true); // Add a loading state
  const [html, setHtml] = useState('<h1>Hello, World!</h1>');
  const [css, setCss] = useState('body { background-color: #f0f0f0; }');
  const [js, setJs] = useState('console.log("Hello, World!");');
  const [title, setTitle] = useState('My Snippet');
  const [srcDoc, setSrcDoc] = useState('');
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

            alert('Failed to load snippet. Redirecting to snippets page.');
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
        alert('Snippet updated successfully!');
      } else {
        // save new snippet
        await axiosInstance.post('/snippet', { title, html, css, js });
        alert('Snippet saved successfully!');
      }
    } catch (err) {
      console.error(err?.response?.data?.message);
      alert('Failed to save snippet');
    }
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
        {id ? 'Update Snippet' : 'Save Snippet'}
      </button>

      <button className="bg-blue-700 hover:bg-blue-500 p-2 ml-2 rounded-md text-white font-semibold">
        <Link to="/">Home</Link>
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
