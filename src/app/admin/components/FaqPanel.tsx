import React, { useState, useEffect } from "react";
import axios from "axios";

const FAQs = () => {
  const [faqs, setFAQs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [faqToEdit, setFaqToEdit] = useState({});
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/faqs")
      .then((res) => {
        setFAQs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching FAQs:", err);
      });
  }, []);

  const handleDeleteFAQ = (id) => {
    axios
      .delete(`http://localhost:3001/api/faqs/${id}`)
      .then((res) => {
        console.log(res.data);
        // Refresh FAQs after deletion
        setFAQs(faqs.filter((faq) => faq.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting FAQ:", err);
      });
  };

  const handleEditFAQ = (faq) => {
    setFaqToEdit(faq);
    setFormData(faq);
    setShowEditModal(true);
  };

  const handleAddFAQ = () => {
    setFormData({
      question: "",
      answer: "",
    });
    setShowAddModal(true);
  };

  const handleSaveFAQ = () => {
    if (showEditModal) {
      // Update FAQ
      axios
        .put(`http://localhost:3001/api/faqs/${faqToEdit.id}`, formData)
        .then((res) => {
          console.log(res.data);
          // Refresh FAQs after update
          axios
            .get("http://localhost:3001/api/faqs")
            .then((res) => {
              setFAQs(res.data);
              setShowEditModal(false);
            })
            .catch((err) => {
              console.error("Error fetching FAQs:", err);
            });
        })
        .catch((err) => {
          console.error("Error updating FAQ:", err);
        });
    } else {
      // Add FAQ
      axios
        .post("http://localhost:3001/api/faqs", formData)
        .then((res) => {
          console.log(res.data);
          // Refresh FAQs after addition
          axios
            .get("http://localhost:3001/api/faqs")
            .then((res) => {
              setFAQs(res.data);
              setShowAddModal(false);
            })
            .catch((err) => {
              console.error("Error fetching FAQs:", err);
            });
        })
        .catch((err) => {
          console.error("Error adding FAQ:", err);
        });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mt-8">FAQs</h1>
      <div className="mt-8">
        <button
          onClick={handleAddFAQ}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add FAQ
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Question</th>
              <th className="border border-gray-300 px-4 py-2">Answer</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {faq.question}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {faq.answer}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEditFAQ(faq)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFAQ(faq.id)}
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

      {/* Add FAQ Modal */}
      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add FAQ</h2>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Question"
            />
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Answer"
            />
            <button
              onClick={() => setShowAddModal(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveFAQ}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit FAQ</h2>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Question"
            />
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 mb-2 w-full"
              placeholder="Answer"
            />
            <button
              onClick={() => setShowEditModal(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveFAQ}
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

export default FAQs;
