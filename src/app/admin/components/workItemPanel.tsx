import React, { useState, useEffect } from "react";
import axios from "axios";

const workItemPanel = () => {
  const [workItems, setWorkItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkItems();
  }, []);

  const fetchWorkItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/workItem");
      setWorkItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching work items:", error);
    }
  };

  const handleEdit = (id, title, text) => {
    setEditingId(id);
    setUpdatedTitle(title);
    setUpdatedText(text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setUpdatedTitle("");
    setUpdatedText("");
    setUpdatedImage(null);
  };

  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedTitle);
      formData.append("text", updatedText);
      if (updatedImage) {
        formData.append("image", updatedImage);
      }

      await axios.put(`http://localhost:3001/api/workItem/${id}`, formData);
      fetchWorkItems();
      setEditingId(null);
      setUpdatedTitle("");
      setUpdatedText("");
      setUpdatedImage(null);
    } catch (error) {
      console.error("Error updating work item:", error);
      setError("Error updating work item");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/workItem/${id}`);
      fetchWorkItems();
    } catch (error) {
      console.error("Error deleting work item:", error);
      setError("Error deleting work item");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <table className="w-full border-collapse border border-gray-300">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Text</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {workItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                ) : (
                  item.title
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingId === item.id ? (
                  <textarea
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                ) : (
                  item.text
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.image && (
                  <img
                    src={`data:image/png;base64,${item.image}`}
                    alt={item.title}
                    className="max-w-full h-auto"
                  />
                )}
                {editingId === item.id && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUpdatedImage(e.target.files[0])}
                  />
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingId === item.id ? (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleUpdate(item.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleEdit(item.id, item.title, item.text)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default workItemPanel;
