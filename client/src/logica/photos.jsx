import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PHOTOS from './consts';

const Photos = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="mySwiper"
    >
      {PHOTOS.map((photo, index) => (
        <SwiperSlide key={index}>
          <div className="carousel-image-container">
            <img src={photo.src} alt={photo.alt} className="carousel-image" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Photos;
