// frontend/pages/workItem.tsx
"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface SectionProps {
  id: number;
  title: string;
  text: string;
  imageUrl: string;
}

const WorkItem: React.FC = () => {
  const [sections, setSections] = useState<SectionProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sections")
      .then((response) => response.json())
      .then((data) => setSections(data.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="container mx-auto p-4">
            {sections.map((section) => (
              <Section
                key={section.id}
                title={section.title}
                text={section.text}
                imageUrl={`http://localhost:3001${section.imageUrl}`} // Update image URL
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

interface SectionComponentProps {
  title: string;
  text: string;
  imageUrl: string;
}

const Section: React.FC<SectionComponentProps> = ({
  title,
  text,
  imageUrl,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{text}</p>
      <img src={imageUrl} alt={title} className="w-full h-auto" />
    </div>
  );
};

export default WorkItem;
