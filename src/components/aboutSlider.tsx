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
    <div className="custom-slider-container mt-5 mb-5 rounded-lg">
      <div
        className="custom-slider"
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {images.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="slide"
          />
        ))}
      </div>
      <button
        className="custom-button custom-prev"
        onClick={() => moveSlide(-1)}
      >
        &#10094;
      </button>
      <button
        className="custom-button custom-next"
        onClick={() => moveSlide(1)}
      >
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
