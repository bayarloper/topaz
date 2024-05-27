"use client";
import React, { useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ImageSlider from "@/components/aboutSlider";
import EmergencyHelp from "@/components/EmergencyHelp";
import Features from "@/components/Features";

export default function Home() {
  const images = [
    "/background.jpg",
    "/background.jpg",
    "/background.jpg",
    // Add more image paths as needed
  ];

  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 flex min-h-screen flex-col items-center">
        <ImageSlider images={images} />
        <Features />
        <div className="mt-10 mb-10 grid gap-6 text-left lg:mb-0 lg:w-full lg:max-w-6xl lg:grid-cols-4 lg:text-left">
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.href}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:shadow-lg hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className="mb-3 text-xl font-semibold flex items-center">
                {card.title}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ml-2">
                  <Image
                    src={card.imgSrc}
                    alt={card.imgAlt}
                    width={24}
                    height={24}
                  />
                </span>
              </h2>
            </a>
          ))}
        </div>
        <EmergencyHelp />
      </main>
      <Footer />
    </div>
  );
}

const cards = [
  {
    href: "/about",
    title: "Бидний тухай",
    imgSrc: "/hospital.png",
    imgAlt: "Hospital",
  },
  {
    href: "/uilchilgee",
    title: "Үйлчилгээ",
    imgSrc: "/support.png",
    imgAlt: "Support",
  },
  {
    href: "/workItem",
    title: "Бүтэц",
    imgSrc: "/hospital.png",
    imgAlt: "Hospital",
  },
  {
    href: "/vision",
    title: "Ил тод байдал",
    imgSrc: "/targeting.png",
    imgAlt: "Targeting",
  },
];
