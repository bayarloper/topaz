// components/ImageSlider.js
import { useState } from "react";

interface ImageSliderProps {
  images: string[]; // Specify the type of images as string array
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const moveSlide = (n: number) => {
    const newIndex = slideIndex + n;
    if (newIndex >= 0 && newIndex < images.length) {
      setSlideIndex(newIndex);
    }
  };

  return (
    <div className="relative w-full mx-auto mt-5 rounded-lg overflow-hidden shadow-lg">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {images.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full flex-shrink-0"
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
        onClick={() => moveSlide(-1)}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
        onClick={() => moveSlide(1)}
      >
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
