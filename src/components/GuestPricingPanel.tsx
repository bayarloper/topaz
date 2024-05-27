import React, { useState, useEffect } from "react";
import axios from "axios";

interface PricingPlan {
  id: string;
  title: string;
  serviceList: string;
  price: string;
}

const GuestPricingPanel = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  const fetchPricingPlans = async () => {
    try {
      const response = await axios.get<PricingPlan[]>(
        "https://topaz-backend.vercel.app/api/pricing"
      );
      setPricingPlans(response.data);
    } catch (error) {
      console.error("Error fetching pricing plans:", error);
    }
  };

  return (
    <div className="mx-auto py-8">
      <h1 className="text-xl font-bold mb-8">Үйлчилгээний үнийн тариф</h1>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-200 rounded-lg p-6 shadow-md"
          >
            <h2 className="text-l font-bold mb-4">{plan.title}</h2>
            <p className="text-gray-600 mb-4">{plan.serviceList}</p>
            <p className="text-black-600 mb-4">
              <b>Үнэ:</b> {plan.price}₮
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestPricingPanel;
