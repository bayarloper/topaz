// pages/AboutDB.tsx
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface AboutItem {
  id: number;
  title: string;
  description: string;
}

const AboutPanel: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutItem[]>([]);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch("http://13.229.91.93:3001/api/about");
      if (response.ok) {
        const data: AboutItem[] = await response.json();
        setAboutData(data);
      } else {
        console.error("Failed to fetch about page data");
      }
    } catch (error) {
      console.error("Error fetching about page data:", error);
    }
  };

  const handleDescriptionChange = (id: number, newDescription: string) => {
    setAboutData((prevAboutData) => {
      const updatedAboutData = prevAboutData.map((item) =>
        item.id === id ? { ...item, description: newDescription } : item
      );
      return updatedAboutData;
    });
  };

  const handleSubmit = async (id: number, newDescription: string) => {
    try {
      const response = await fetch(
        `http://13.229.91.93:3001/api/about/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: newDescription }),
        }
      );

      if (response.ok) {
        console.log("About page description updated successfully");
      } else {
        console.error("Failed to update about page description");
      }
    } catch (error) {
      console.error("Error updating about page description:", error);
    }
  };

  return (
    <div>
      {aboutData.map((item) => (
        <div key={item.id} className="mb-8">
          <h2 className="text-sm font-semibold mb-2">{item.title}</h2>
          <ReactQuill
            theme="snow"
            value={item.description}
            onChange={(value) => handleDescriptionChange(item.id, value)}
            className="mb-4"
          />
          <button
            onClick={() => handleSubmit(item.id, item.description)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Хадгалах
          </button>
        </div>
      ))}
    </div>
  );
};

export default AboutPanel;
