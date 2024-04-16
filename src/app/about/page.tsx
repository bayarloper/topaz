// pages/About.js
"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface aboutData {
  title: string;
  description: string;
}

const About = () => {
  const [aboutData, setAboutData] = useState<aboutData[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/data", {
        method: "GET",
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAboutData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        {aboutData.map((item, index) => (
          <div key={index} className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
            <p className="text-gray-700 mb-4">{item.description}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default About;
