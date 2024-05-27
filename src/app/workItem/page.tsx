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
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="mb-3 mt-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Бүтэц
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
          {sections.map((section) => (
            <Section
              key={section.id}
              title={section.title}
              text={section.text}
              imageUrl={`http://localhost:3001${section.imageUrl}`}
            />
          ))}
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
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4">
        <img src={imageUrl} alt={title} className="w-full h-auto" />
      </div>
      <div className="md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{text}</p>
      </div>
    </div>
  );
};

export default WorkItem;
