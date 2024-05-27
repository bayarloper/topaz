// frontend/pages/workItemPanel.tsx

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface Section {
  id: number;
  title: string;
  text: string;
  imageUrl: string;
}

interface Form {
  id: number | null;
  title: string;
  text: string;
}

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void; // Fixing the handleSubmit signature
  form: Form;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Modal: React.FC<ModalProps> = ({
  show,
  handleClose,
  handleSubmit,
  form,
  handleInputChange,
  handleFileChange,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {form.id ? "Edit Section" : "Add Section"}
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="text"
            >
              Text
            </label>
            <textarea
              name="text"
              value={form.text}
              onChange={handleInputChange}
              placeholder="Text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const WorkItemPanel: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [form, setForm] = useState<Form>({
    id: null,
    title: "",
    text: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = () => {
    fetch("http://13.229.91.93:3001/api/sections")
      .then((response) => response.json())
      .then((data) => setSections(data.data));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("text", form.text);
    if (file) {
      formData.append("image", file);
    }

    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `http://13.229.91.93:3001/api/sections/${form.id}`
      : "http://13.229.91.93:3001/api/sections";

    fetch(url, {
      method,
      body: formData,
    }).then(() => {
      fetchSections();
      setForm({ id: null, title: "", text: "" });
      setFile(null);
      setShowModal(false);
    });
  };

  const handleEdit = (section: Section) => {
    setForm(section);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    fetch(`http://13.229.91.93:3001/api/sections/${id}`, {
      method: "DELETE",
    }).then(() => fetchSections());
  };

  const handleAdd = () => {
    setForm({ id: null, title: "", text: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleAdd}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Add Section
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">{section.title}</h2>
            <p className="mb-4 text-sm whitespace-pre-wrap">{section.text}</p>
            {section.imageUrl && (
              <img
                src={`http://13.229.91.93:3001${section.imageUrl}`}
                alt={section.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
              />
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(section)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(section.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleFormSubmit}
        form={form}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};

export default WorkItemPanel;
