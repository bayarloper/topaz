import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface Service {
  id: number;
  title: string;
  details: string;
  icon: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    icon: "",
  });

  useEffect(() => {
    axios
      .get<Service[]>("http://13.229.91.93:3001/api/services")
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
      });
  }, []);

  const handleDeleteService = (id: number): void => {
    axios
      .delete(`http://13.229.91.93:3001/api/services/${id}`)
      .then((res) => {
        console.log(res.data);
        setServices((prevServices) =>
          prevServices.filter((service) => service.id !== id)
        );
      })
      .catch((err) => {
        console.error("Error deleting service:", err);
      });
  };

  const handleEditService = (service: Service): void => {
    setServiceToEdit(service);
    setFormData(service);
    setShowEditModal(true);
  };

  const handleAddService = (): void => {
    setFormData({
      title: "",
      details: "",
      icon: "",
    });
    setShowAddModal(true);
  };

  const handleSaveService = (): void => {
    if (showEditModal && serviceToEdit) {
      axios
        .put(
          `http://13.229.91.93:3001/api/services/${serviceToEdit.id}`,
          formData
        )
        .then((res) => {
          console.log(res.data);
          axios
            .get<Service[]>("http://13.229.91.93:3001/api/services")
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
      axios
        .post("http://13.229.91.93:3001/api/services", formData)
        .then((res) => {
          console.log(res.data);
          axios
            .get<Service[]>("http://13.229.91.93:3001/api/services")
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
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
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
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

      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-sm font-bold mb-4">Add Service</h2>
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
              Cancel
            </button>
            <button
              onClick={handleSaveService}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-sm font-bold mb-4">Edit Service</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border
              gray-300 px-4 py-2 mb-2 w-full"
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
              Cancel
            </button>
            <button
              onClick={handleSaveService}
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

export default Services;
