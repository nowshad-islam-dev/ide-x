// client/src/page/SnippetsPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axiosInstance from '../axiosInstance.js';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState([]);
  // const navigate = useNavigate();

  // Fetch snippets when the component mounts
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axiosInstance.get('/snippet');
        setSnippets(res.data);
      } catch (err) {
        console.error(err?.response?.data?.message);
      }
    };
    fetchSnippets();
  }, []);

  // Delete snippet with snippet id
  const handleDeleteSnippet = async (id) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      try {
        await axiosInstance.delete(`/snippet/${id}`);
        setSnippets((prevSnippets) =>
          prevSnippets.filter((snippet) => snippet._id !== id)
        );
      } catch (err) {
        console.error(err?.response?.data?.message || err);
      }
    }
  };

  // Copy shareable link to clipboard
  const handleShareSnippet = (shareableId) => {
    const shareableUrl = `${window.location.origin}/shared/${shareableId}`;

    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => {
        alert(`Shareable link copied to clipboard:\n${shareableUrl}`);
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
        alert('Failed to copy link. Please try again.');
      });
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">
        Your Saved Snippets
      </h1>

      {snippets.length === 0 ? (
        <p>No snippets found. Start creating some!</p>
      ) : (
        <ul>
          {snippets.map((snippet) => (
            <li
              key={snippet._id}
              className="mb-4 p-4 border rounded bg-gray-50 dark:bg-gray-300"
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
              <div>
                <Link
                  to={`/editor/${snippet._id}`} // navigate to editor with snippet id
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDeleteSnippet(snippet._id)}
                  className="ml-2 text-red-500 hover:underline"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleShareSnippet(snippet.shareableId)}
                  className="ml-2 text-purple-500 hover:underline"
                >
                  Share
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  );
};

export default SnippetsPage;
