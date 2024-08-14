import React, { useState, useEffect, useRef } from 'react';
import PHOTOS from './consts';

const Photos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex === PHOTOS.length - 1 ? 0 : prevIndex + 1)),
      3000 // Cambia cada 3 segundos
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div
        className="carousel-images"
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
      >
        {PHOTOS.map((photo, index) => (
          <div className="carousel-image-container" key={index}>
            <img src={photo.src} alt={photo.alt} className="carousel-image" />
          </div>
        ))}
      </div>
      <div className="navigation">
        <button
          className="prev"
          onClick={() => setCurrentIndex(currentIndex === 0 ? PHOTOS.length - 1 : currentIndex - 1)}
        >
          &#10094;
        </button>
        <button
          className="next"
          onClick={() => setCurrentIndex((currentIndex + 1) % PHOTOS.length)}
        >
          &#10095;
        </button>
      </div>
      <div className="dots">
        {PHOTOS.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Photos;
