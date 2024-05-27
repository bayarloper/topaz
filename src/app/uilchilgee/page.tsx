"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import FAQComponent from "@/components/faq";
import RequestsTable from "@/components/RequestsTable";
import Footer from "@/components/footer";
import GuestPricingPanel from "@/components/GuestPricingPanel";

interface ServiceProps {
  title: string;
  id: number;
  details: string;
  icon: any;
}

export default function Services() {
  const [services, setServices] = useState<ServiceProps[]>([]);

  useEffect(() => {
    axios
      .get("https://topaz-backend.vercel.app/api/services")
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto px-4">
          <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[px]">
            <div className="container mx-auto">
              <div className="w-full px-4">
                <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                  <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                    Үйлчилгээ
                  </h2>
                  <p className="text-base text-body-color dark:text-dark-6">
                    There are many variations of passages of Lorem Ipsum
                    available but the majority have suffered alteration in some
                    form.
                  </p>
                </div>
              </div>
              <GuestPricingPanel></GuestPricingPanel>

              <div className="-mx-4 flex flex-wrap">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    details={service.details}
                    icon={service.icon}
                  />
                ))}
              </div>
              <FAQComponent></FAQComponent>
              <RequestsTable></RequestsTable>
            </div>
          </section>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

interface ServiceCardProps {
  icon: any;
  title: string;
  details: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, details }) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3 mb-8">
      <div className="bg-white p-10 shadow-md hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10 rounded-[20px]">
        <div className="h-16 w-16 items-center justify-center rounded-full bg-primary">
          {icon}
        </div>
        <h4 className="mb-[14px] text-l font-semibold text-dark dark:text-white">
          {title}
        </h4>
        <p className="text-body-color text-sm dark:text-dark-6">{details}</p>
      </div>
    </div>
  );
};
