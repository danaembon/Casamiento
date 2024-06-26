import PHOTOS  from './consts.js';
import { useState, useEffect } from "react";
import React from 'react';


  const PhotoChanger = () => {
    
      const [index, setIndex] = useState(0);

      useEffect(() => {
    
      const timer = setInterval(() => {
        setIndex(prevIndex => (prevIndex + 1) % PHOTOS.length);
      }, 4000);
  
      return () => {
        clearInterval(timer);
      };

    }, []);

    return <img className='fotos' src={PHOTOS[index]} alt="random"></img>
  }
  export default PhotoChanger;