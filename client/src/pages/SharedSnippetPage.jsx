// client/src/pages/SharedSnippetPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from '../axiosInstance.js';

import React from 'react';

const SharedSnippetPage = () => {
  const shareableId = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const res = await axiosInstance.get(`/snippet/shared/${shareableId}`);
        setSnippet(res.data);
      } catch (err) {
        console.error('Failed to load snippet', err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [shareableId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-700">Snippet not found.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{snippet.title}</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <h2 className="text-lg font-bold mb-2">HTML</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {snippet.html || 'No HTML'}
          </pre>
        </div>
        <div className="col-span-1">
          <h2 className="text-lg font-bold mb-2">CSS</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {snippet.css || 'No CSS'}
          </pre>
        </div>
        <div className="col-span-1">
          <h2 className="text-lg font-bold mb-2">JavaScript</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {snippet.js || 'No JavaScript'}
          </pre>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <iframe
          srcDoc={`
            <html>
              <body>${snippet.html}</body>
              <style>${snippet.css}</style>
              <script>${snippet.js}</script>
            </html>
          `}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};

export default SharedSnippetPage;
