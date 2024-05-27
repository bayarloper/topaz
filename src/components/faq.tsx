import React, { useState, useEffect } from "react";
import axios from "axios";

interface FAQProps {
  id: number;
  question: string;
  answer: string;
}

const FAQComponent: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQProps[]>([]);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = () => {
    axios
      .get("https://topaz-six.vercel.app//api/faqs") // Adjust the API endpoint based on your backend setup
      .then((res) => {
        setFaqs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching FAQs:", err);
      });
  };

  interface FAQItemProps {
    question: string;
    answer: string;
  }

  const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="bg-white rounded-lg shadow-md">
        <div
          className="cursor-pointer p-4 flex justify-between items-center border-b border-gray-200"
          onClick={toggleAccordion}
        >
          <h3 className="text-l font-semibold">{question}</h3>
          <svg
            className={`w-6 h-6 ${isOpen ? "transform rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            />
          </svg>
        </div>
        {isOpen && (
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm text-gray-700">{answer}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-6xl mx-auto">
        <section className="pb-12 pt-12 dark:bg-dark lg:pb-[90px] lg:pt-[px]">
          <div className="container mx-auto">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="mb-3 text-xl font-bold leading-[1.2] text-dark dark:text-white sm:text-xl md:text-xl">
                Түгээмэл асуулт хариулт
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQComponent;
