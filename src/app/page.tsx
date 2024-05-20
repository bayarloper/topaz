"use client";
import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Image from "next/image";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ImageSlider from "@/components/aboutSlider";

interface aboutData {
  title: string;
  description: string;
}

export default function Home() {
  
  const slides = [
    {
      url: "/background.jpg",
    },
    {
      url: "/slider2.jpg",
    },
    {
      url: "/slider3.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const images = [
    "/background.jpg",
    "/background.jpg",
    "/background.jpg",
    // Add more image paths as needed
  ];

  return (
    <div>
      <Navbar></Navbar>
      <main className="max-w-6xl mx-auto px-4 flex min-h-screen flex-col items-center">
        <ImageSlider images={images} />
        <div className="mt-10 mb-10 grid text-left lg:mb-0 lg:w-full lg:max-w-6xl lg:grid-cols-4 lg:text-left">
          <a
            href="/about"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-regular">
              Бидний тухай{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <Image
                  src="/hospital.png"
                  alt="Hospital"
                  width={24}
                  height={24}
                />
              </span>
            </h2>
            <p className="m-0 max-w-full text-sm opacity-75">
              The placeholder text, beginning with the line “Lorem ipsum dolor
              sit amet, consectetur adipiscing elit”, looks like Latin because
              in its youth, centuries ago, it was Latin.
            </p>
          </a>

          <a
            href="/uilchilgee"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-regular">
              Үйлчилгээ{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <Image
                  src="/support.png"
                  alt="Support"
                  width={24}
                  height={24}
                />
              </span>
            </h2>
            <p className="m-0 max-w-full text-sm opacity-75">
              The placeholder text, beginning with the line “Lorem ipsum dolor
              sit amet, consectetur adipiscing elit”, looks like Latin because
              in its youth, centuries ago, it was Latin.
            </p>
          </a>

          <a
            href="/workItem"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-regular">
              Бүтэц{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <Image
                  src="/hospital.png"
                  alt="Hospital"
                  width={24}
                  height={24}
                />
              </span>
            </h2>
            <p className="m-0 max-w-full text-sm opacity-75">
              The placeholder text, beginning with the line “Lorem ipsum dolor
              sit amet, consectetur adipiscing elit”, looks like Latin because
              in its youth, centuries ago, it was Latin.
            </p>
          </a>

          <a
            href="/vision"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-regular">
              Ил тод байдал{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                <Image
                  src="/targeting.png"
                  alt="Targeting"
                  width={24}
                  height={24}
                />
              </span>
            </h2>
            <p className="m-0 max-w-full text-balance text-sm opacity-75">
              The placeholder text, beginning with the line “Lorem ipsum dolor
              sit amet, consectetur adipiscing elit”, looks like Latin because
              in its youth, centuries ago, it was Latin.
            </p>
          </a>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
