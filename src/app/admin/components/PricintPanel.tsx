import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface PricingPlan {
  id: string;
  title: string;
  serviceList: string;
  price: string;
}

const AdminPricingPanel = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [planToEdit, setPlanToEdit] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState<PricingPlan>({
    id: "",
    title: "",
    serviceList: "",
    price: "",
  });

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  const fetchPricingPlans = () => {
    axios
      .get<PricingPlan[]>("http://13.229.91.93:3001/api/pricing")
      .then((response) => {
        setPricingPlans(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pricing plans:", error);
      });
  };

  const handleDeletePlan = (id: string) => {
    axios
      .delete(`http://13.229.91.93:3001/api/pricing/${id}`)
      .then(() => {
        fetchPricingPlans();
      })
      .catch((error) => {
        console.error("Error deleting pricing plan:", error);
      });
  };

  const handleEditPlan = (plan: PricingPlan) => {
    setPlanToEdit(plan);
    setFormData(plan);
    setShowEditModal(true);
  };

  const handleAddPlan = () => {
    setFormData({
      id: "",
      title: "",
      serviceList: "",
      price: "",
    });
    setShowAddModal(true);
  };

  const handleSavePlan = () => {
    if (showEditModal && planToEdit) {
      axios
        .put(`http://13.229.91.93:3001/api/pricing/${planToEdit.id}`, formData)
        .then(() => {
          fetchPricingPlans();
          setShowEditModal(false);
        })
        .catch((error) => {
          console.error("Error updating pricing plan:", error);
        });
    } else {
      axios
        .post("http://13.229.91.93:3001/api/pricing", formData)
        .then(() => {
          fetchPricingPlans();
          setShowAddModal(false);
        })
        .catch((error) => {
          console.error("Error adding pricing plan:", error);
        });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Төлбөртэй үйлчилгээний тариф
      </h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleAddPlan}
          style={{
            cursor: "pointer",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#28a745",
            color: "#fff",
          }}
        >
          Тариф нэмэх
        </button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Үйлчилгээ
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Жагсаалт
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Үнэ
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Тохиргоо
            </th>
          </tr>
        </thead>
        <tbody>
          {pricingPlans.map((plan) => (
            <tr key={plan.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {plan.title}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {plan.serviceList}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {plan.price}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => handleEditPlan(plan)}
                  style={{
                    cursor: "pointer",
                    padding: "8px 12px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    marginRight: "4px",
                  }}
                >
                  Засах
                </button>
                <button
                  onClick={() => handleDeletePlan(plan.id)}
                  style={{
                    cursor: "pointer",
                    padding: "8px 12px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Устгах
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "4px",
            }}
          >
            <span
              style={{
                cursor: "pointer",
                float: "right",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              onClick={() => setShowAddModal(false)}
            >
              &times;
            </span>
            <h2>Үйлчилгээ нэмэх</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Үйлчилгээ"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="text"
              name="serviceList"
              value={formData.serviceList}
              onChange={handleChange}
              placeholder="Жагсаалт"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Үнэ"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <button
              onClick={handleSavePlan}
              style={{
                cursor: "pointer",
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Нэмэх
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "4px",
            }}
          >
            <span
              style={{
                cursor: "pointer",
                float: "right",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              onClick={() => setShowEditModal(false)}
            >
              &times;
            </span>
            <h2>Үйлчилгээ засах</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="text"
              name="serviceList"
              value={formData.serviceList}
              onChange={handleChange}
              placeholder="Service List"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <button
              onClick={handleSavePlan}
              style={{
                cursor: "pointer",
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Хадгалах
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPricingPanel;
