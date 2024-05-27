import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Doctor {
  id: number;
  name: string;
  title: string;
  image?: string;
}

interface DoctorFormProps {
  doctor: Doctor | null;
  onClose: () => void;
  onSuccess: () => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({
  doctor,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    name: doctor ? doctor.name : "",
    title: doctor ? doctor.title : "",
    image: null as File | null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("title", form.title);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (doctor) {
        await axios.put(
          `https://topaz-backend.vercel.app/api/doctors/${doctor.id}`,
          formData
        );
      } else {
        await axios.post(
          "https://topaz-backend.vercel.app/api/doctors",
          formData
        );
      }

      setForm({ name: "", title: "", image: null });
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {doctor ? "Edit Doctor" : "Add Doctor"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="w-full border px-3 py-2 rounded"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="title">
              Title:
            </label>
            <input
              className="w-full border px-3 py-2 rounded"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="image">
              Image:
            </label>
            <input
              className="w-full"
              type="file"
              name="image"
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            {doctor ? "Update" : "Add"} Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

const DoctorPanel: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://topaz-backend.vercel.app/api/doctors"
        );
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setShowPopup(true);
  };

  const handleAdd = () => {
    setEditingDoctor(null);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://topaz-backend.vercel.app/api/doctors/${id}`);
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.id !== id)
      );
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAdd}
      >
        Add Doctor
      </button>
      {showPopup && (
        <DoctorForm
          doctor={editingDoctor}
          onClose={handleClosePopup}
          onSuccess={() => {
            const fetchDoctors = async () => {
              try {
                const response = await axios.get(
                  "https://topaz-backend.vercel.app/api/doctors"
                );
                setDoctors(response.data.doctors);
              } catch (error) {
                console.error("Error fetching doctors:", error);
              }
            };
            fetchDoctors();
          }}
        />
      )}
      <h2 className="text-l font-bold mb-4 text-left mt-4">Эмч нар</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <li
            key={doctor.id}
            className="bg-white p-4 rounded shadow-md flex flex-col items-center"
          >
            <strong className="text-lg">{doctor.name}</strong>
            <span className="text-gray-600">({doctor.title})</span>
            {doctor.image && (
              <img
                src={`http://localhost:3001${doctor.image}`}
                alt={doctor.name}
                className="w-24 h-24 rounded-full mt-4"
              />
            )}
            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleEdit(doctor)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(doctor.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPanel;
