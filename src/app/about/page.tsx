// pages/About.js
"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ImageSlider from "@/components/aboutSlider";

interface aboutData {
  title: string;
  description: string;
}

interface BlogPosts {
  title: string;
  content: string;
  image: string;
  created_at: string;
}
const About = () => {
  const [aboutData, setAboutData] = useState<aboutData[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  useEffect(() => {
    fetchAboutData();
    fetchBlogPosts();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch(
        "https://topaz-backend.vercel.app/api/about",
        {
          method: "GET",
        }
      );
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

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(
        "https://topaz-backend.vercel.app/api/blogpost",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  const images = [
    "/background.jpg",
    "/background.jpg",
    "/background.jpg",
    // Add more image paths as needed
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto px-4">
          <ImageSlider images={images} />

          {aboutData.map((item, index) => (
            <div key={index}>
              <h1 className="text-xl font-bold mb-4">{item.title}</h1>
              <div
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />{" "}
            </div>
          ))}
          <h1 className="text-3xl font-bold mb-4">Мэдээ мэдээлэл</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto sm:h-32 object-cover"
                />
                <div className="p-6">
                  <h2 className="text font-bold text-gray-800 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-700 leading-tight mb-4">
                    {post.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {post.created_at}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
