// client/src/page/SnippetsPage.jsx
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from '../context/AuthContext';

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axios.get('/api/snippet', {
          headers: {
            Authorization: `Bearer ${token}`, // api expects Bearer token
          },
        });
        setSnippets(res.data);
      } catch (err) {
        console.error(err?.response?.data?.message);
      }
    };
    fetchSnippets();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Saved Snippets</h1>
      {snippets.length === 0 ? (
        <p>No snippets found. Start creating some!</p>
      ) : (
        <ul>
          {snippets.map((snippet) => (
            <li
              key={snippet._id}
              className="mb-4 p-4 border rounded bg-gray-50"
            >
              <h2 className="text-lg font-bold">{snippet.title}</h2>
              <p>
                <strong>HTML:</strong> {snippet.html || 'No HTML'}
              </p>
              <p>
                <strong>CSS:</strong> {snippet.css || 'No CSS'}
              </p>
              <p>
                <strong>JS:</strong> {snippet.js || 'No JavaScript'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SnippetsPage;
