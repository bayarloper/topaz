"use client";
import { useState } from "react";
import { logout } from "@/utils/auth";
import AboutDB from "../components/AboutPanel";
import BlogList from "../components/BlogPanel";
import Services from "../components/ServicePanel";
import FAQs from "../components/FaqPanel";
import PersonRequests from "../components/ItemPanel";
import AdminPricingPanel from "../components/PricintPanel";
import WorkItemDB from "../components/workItemPanel";
import DoctorPanel from "../components/doctorPanel";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("about"); // Default active tab

  const tabs = [
    { id: "about", label: "Бидний тухай" },
    { id: "blogs", label: "Нийтлэл" },
    { id: "services", label: "Үйлчилгээ" },
    { id: "workItem", label: "Бүтэц" },
    { id: "vision", label: "Ил тод байдал" },
  ];

  const handleTabClick = (tabId: any) => {
    setActiveTab(tabId);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    logout();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Гарах
        </button>
      </div>
      <div className="mb-8">
        <ul className="flex space-x-4">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`cursor-pointer px-4 py-2 rounded ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="border rounded p-4">
        {activeTab === "about" && (
          <div>
            {/* Database component */}
            <h2 className="text-xl font-bold mb-4">
              Бидний тухай хуудсыг засварлах
            </h2>
            <AboutDB />
            {/* Add your database management component here */}
          </div>
        )}
        {activeTab === "blogs" && (
          <div>
            {/* Blogs component */}
            <h2 className="text-xl font-bold mb-4">Blog Management</h2>
            <BlogList></BlogList>
            {/* Add your blog management component here */}
          </div>
        )}
        {activeTab === "services" && (
          <div>
            {/* Team members component */}
            <h2 className="text-xl font-bold mb-4">Үйлчилгээ засах, нэмэх</h2>
            <AdminPricingPanel></AdminPricingPanel>
            <Services />
            <FAQs></FAQs>
            <PersonRequests />
          </div>
        )}
        {activeTab === "workItem" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Бүтэц</h2>
            <WorkItemDB></WorkItemDB>
          </div>
        )}
        {activeTab === "vision" && (
          <div>
            {/* Team members component */}
            <h2 className="text-xl font-bold mb-4">Team Member Management</h2>
            <DoctorPanel></DoctorPanel>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
