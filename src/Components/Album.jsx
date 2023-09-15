import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState('');
  const [editedAlbum, setEditedAlbum] = useState('');
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    // Fetch albums from the API when the component mounts
    axios
      .get('https://jsonplaceholder.typicode.com/albums')
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });
  }, []);

  const handleAddAlbum = () => {
    // Add a new album (dummy request)
    axios
      .post('https://jsonplaceholder.typicode.com/albums', { title: newAlbum })
      .then((response) => {
        setAlbums([...albums, response.data]);
        setNewAlbum('');
      })
      .catch((error) => {
        console.error('Error adding album:', error);
      });
  };

  const handleEditAlbum = () => {
    // Update an album (dummy request)
    axios
      .put(`https://jsonplaceholder.typicode.com/albums/${selectedAlbumId}`, {
        title: editedAlbum,
      })
      .then(() => {
        const updatedAlbums = albums.map((album) =>
          album.id === selectedAlbumId ? { ...album, title: editedAlbum } : album
        );
        setAlbums(updatedAlbums);
        setEditedAlbum('');
        setSelectedAlbumId(null);
      })
      .catch((error) => {
        console.error('Error updating album:', error);
      });
  };

  const handleDeleteAlbum = (id) => {
    // Delete an album (dummy request)
    axios
      .delete(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then(() => {
        const updatedAlbums = albums.filter((album) => album.id !== id);
        setAlbums(updatedAlbums);
      })
      .catch((error) => {
        console.error('Error deleting album:', error);
      });
  };

  return (
    <div className="App bg-gray-200 min-h-screen p-4">
      <h1 className="text-3xl font-semibold mb-4">Albums</h1>
      <div className="mt-4">
        <input
          type="text"
          placeholder="New Album Title"
          className="border rounded-md p-2 mr-2 mb-2"
          value={newAlbum}
          onChange={(e) => setNewAlbum(e.target.value)}
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-2"
          onClick={handleAddAlbum}
        >
          Add Album
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <div className="mb-2">
              <span className="text-lg font-semibold">{album.title}</span>
              {selectedAlbumId === album.id ? (
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded-md ml-2 hover:bg-blue-600"
                  onClick={handleEditAlbum}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded-md ml-2 hover:bg-blue-600"
                  onClick={() => setSelectedAlbumId(album.id)}
                >
                  Edit
                </button>
              )}
            </div>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 mt-2"
              onClick={() => handleDeleteAlbum(album.id)}
            >
              Delete
            </button>
            {selectedAlbumId === album.id && (
              <div className="mt-2">
                <input
                  type="text"
                  className="border rounded-md p-2"
                  placeholder="Edit Album Title"
                  value={editedAlbum}
                  onChange={(e) => setEditedAlbum(e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default App;
