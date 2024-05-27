import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface Request {
  id: number;
  title: string;
  number: string;
}

const PersonRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [requestToEdit, setRequestToEdit] = useState<Request | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    number: "",
  });

  useEffect(() => {
    axios
      .get<Request[]>("http://localhost:3001/api/personReq")
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching person requests:", err);
      });
  }, []);

  const handleDeleteRequest = (id: number): void => {
    axios
      .delete(`http://localhost:3001/api/personReq/${id}`)
      .then((res) => {
        console.log(res.data);
        setRequests((prevRequests) =>
          prevRequests.filter((req) => req.id !== id)
        );
      })
      .catch((err) => {
        console.error("Error deleting request:", err);
      });
  };

  const handleEditRequest = (request: Request): void => {
    setRequestToEdit(request);
    setFormData(request);
    setShowEditModal(true);
  };

  const handleAddRequest = (): void => {
    setFormData({
      title: "",
      number: "",
    });
    setShowAddModal(true);
  };

  const handleSaveRequest = (): void => {
    if (showEditModal && requestToEdit) {
      axios
        .put(
          `http://localhost:3001/api/personReq/${requestToEdit.id}`,
          formData
        )
        .then((res) => {
          console.log(res.data);
          axios
            .get<Request[]>("http://localhost:3001/api/personReq")
            .then((res) => {
              setRequests(res.data);
              setShowEditModal(false);
            })
            .catch((err) => {
              console.error("Error fetching person requests:", err);
            });
        })
        .catch((err) => {
          console.error("Error updating request:", err);
        });
    } else {
      axios
        .post("http://localhost:3001/api/personReq", formData)
        .then((res) => {
          console.log(res.data);
          axios
            .get<Request[]>("http://localhost:3001/api/personReq")
            .then((res) => {
              setRequests(res.data);
              setShowAddModal(false);
            })
            .catch((err) => {
              console.error("Error fetching person requests:", err);
            });
        })
        .catch((err) => {
          console.error("Error adding request:", err);
        });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mt-8">Person Requests</h1>
      <div className="mt-8">
        <button
          onClick={handleAddRequest}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add Request
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Number</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {request.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.number}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEditRequest(request)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(request.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Request Modal */}
      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add Request</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Title"
            />
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Number"
            />
            <button
              onClick={() => setShowAddModal(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveRequest}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Edit Request Modal */}
      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Request</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Title"
            />
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Number"
            />
            <button
              onClick={() => setShowEditModal(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveRequest}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonRequests;
