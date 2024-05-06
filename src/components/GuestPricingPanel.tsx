import React, { useState, useEffect } from "react";
import axios from "axios";

const GuestPricingPanel = () => {
  const [pricingPlans, setPricingPlans] = useState([]);

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  const fetchPricingPlans = () => {
    axios
      .get("http://localhost:3001/api/pricing")
      .then((response) => {
        setPricingPlans(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pricing plans:", error);
      });
  };

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Pricing Plans</h1>
      <div className="grid grid-cols- md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-200 rounded-lg p-6 shadow-md"
          >
            <h2 className="text-xl font-bold mb-4">{plan.title}</h2>
            <p className="text-gray-600 mb-4 whitespace-normal">
              Service List: {plan.serviceList}
            </p>
            <p className="text-gray-600 mb-4">Price: {plan.price}</p>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestPricingPanel;
