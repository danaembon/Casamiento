import React, { useState, useEffect, useRef } from 'react';
import PHOTOS from './consts';
import './App.css';

const Photos = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Start from the second slide (first actual image)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);

  // Create a new array with duplicated first and last images
  const loopedPhotos = [PHOTOS[PHOTOS.length - 1], ...PHOTOS, PHOTOS[0]];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(index + 1); // Offset by 1 due to looped images
    }
  };

  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      if (currentSlide === loopedPhotos.length - 1) {
        setCurrentSlide(1); // Reset to the first actual slide
        carouselRef.current.style.transition = 'none';
        carouselRef.current.style.transform = `translateX(-100%)`;
      } else if (currentSlide === 0) {
        setCurrentSlide(loopedPhotos.length - 2); // Reset to the last actual slide
        carouselRef.current.style.transition = 'none';
        carouselRef.current.style.transform = `translateX(-${(loopedPhotos.length - 2) * 100}%)`;
      }
    };

    const carousel = carouselRef.current;
    carousel.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      carousel.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentSlide, loopedPhotos.length]);

  useEffect(() => {
    if (isTransitioning) {
      carouselRef.current.style.transition = 'transform 0.5s ease';
    }
    carouselRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
  }, [currentSlide, isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-images" ref={carouselRef} style={{ width: `${loopedPhotos.length * 100}%` }}>
        {loopedPhotos.map((photo, index) => (
          <div key={index} className="carousel-image-container" style={{ width: `${100 / loopedPhotos.length}%` }}>
            <img
              src={photo.src}
              alt={photo.alt}
              className={`carousel-image ${index === currentSlide ? 'active' : ''}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <a className="prev" onClick={prevSlide}>&#10094;</a>
      <a className="next" onClick={nextSlide}>&#10095;</a>
      <div className="dots">
        {PHOTOS.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide - 1 ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Photos;
