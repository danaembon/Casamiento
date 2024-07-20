import React, { useState, useEffect } from 'react';
import PHOTOS from './consts';
import './App.css';

const Photos = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === PHOTOS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? PHOTOS.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="carousel">
      <div className="carousel-images" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {PHOTOS.map((photo, index) => (
          <img
            key={index}
            src={photo.src}
            alt={photo.alt}
            className={`carousel-image ${index === currentSlide ? 'active' : ''}`}
            loading="lazy"
          />
        ))}
      </div>
      <a className="prev" onClick={prevSlide}>&#10094;</a>
      <a className="next" onClick={nextSlide}>&#10095;</a>
      <div className="dots">
        {PHOTOS.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Photos;
