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
        <div className="grid gap-6 mb-6 lg:mb-0 w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  {cards.map((card, index) => (
    <a
      key={index}
      href={card.href}
      className="group relative rounded-lg border border-gray-200 bg-white p-5 transition-transform duration-200 ease-in-out hover:translate-y-[-5px] hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-800/70"
      rel="noopener noreferrer"
    >
      <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
        {card.title}
        <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-2">
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
