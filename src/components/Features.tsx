// components/Features.js
import Image from "next/image";

const features = [
  {
    title: "Мэргэжлийн эмч нар",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    imgSrc: "/doctor.svg",
    imgAlt: "Doctor",
    bgColor: "bg-green-custom",
  },
  {
    title: "24/7 Үйлчилгээ",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when",
    imgSrc: "/service.svg",
    imgAlt: "Service",
    bgColor: "bg-blue-custom",
  },
  {
    title: "Эерэг хандлага",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical",
    imgSrc: "/care.svg",
    imgAlt: "Care",
    bgColor: "bg-dark-blue-custom",
  },
];

const Features = () => {
  return (
    <section className="py-5 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          {features.map((feature, index) => (
            <div key={index} className="w-full md:w-1/3 px-4 mb-3 md:mb-0">
              <div
                className={`p-6 rounded-lg shadow-lg text-left ${feature.bgColor}`}
              >
                <div className="mb-3 inline-block relative w-full h-20">
                  <Image
                    src={feature.imgSrc}
                    alt={feature.imgAlt}
                    fill
                    className="rounded-lg object-contain object-left"
                  />
                </div>
                <h3 className="text-l font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-white text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
