import React, { useState, useEffect } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    icon: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/services")
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
      });
  }, []);

  const handleDeleteService = (id) => {
    axios
      .delete(`http://localhost:3001/api/services/${id}`)
      .then((res) => {
        console.log(res.data);
        // Refresh services after deletion
        setServices(services.filter((service) => service.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting service:", err);
      });
  };

  const handleEditService = (service) => {
    setServiceToEdit(service);
    setFormData(service);
    setShowEditModal(true);
  };

  const handleAddService = () => {
    setFormData({
      title: "",
      details: "",
      icon: "",
    });
    setShowAddModal(true);
  };

  const handleSaveService = () => {
    if (showEditModal) {
      // Update service
      axios
        .put(`http://localhost:3001/api/services/${serviceToEdit.id}`, formData)
        .then((res) => {
          console.log(res.data);
          // Refresh services after update
          axios
            .get("http://localhost:3001/api/services")
            .then((res) => {
              setServices(res.data);
              setShowEditModal(false);
            })
            .catch((err) => {
              console.error("Error fetching services:", err);
            });
        })
        .catch((err) => {
          console.error("Error updating service:", err);
        });
    } else {
      // Add service
      axios
        .post("http://localhost:3001/api/services", formData)
        .then((res) => {
          console.log(res.data);
          // Refresh services after addition
          axios
            .get("http://localhost:3001/api/services")
            .then((res) => {
              setServices(res.data);
              setShowAddModal(false);
            })
            .catch((err) => {
              console.error("Error fetching services:", err);
            });
        })
        .catch((err) => {
          console.error("Error adding service:", err);
        });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-sm font-bold mt-8">Services</h1>
      <div className="mt-8">
        <button
          onClick={handleAddService}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add Service
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Details</th>
              <th className="border border-gray-300 px-4 py-2">Icon</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {service.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {service.details}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {service.icon}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEditService(service)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Засах
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Устгах
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-sm font-bold mb-4">Үйлчилгээ нэмэх</h2>
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
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Details"
            />
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Icon"
            />
            <button
              onClick={() => setShowAddModal(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Цуцлах
            </button>
            <button
              onClick={handleSaveService}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Нэмэх
            </button>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-sm font-bold mb-4">Edit Service</h2>
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
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Details"
            />
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Icon"
            />
            <button
              onClick={() => setShowEditModal(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Цуцлах
            </button>
            <button
              onClick={handleSaveService}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Хадгалах
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
