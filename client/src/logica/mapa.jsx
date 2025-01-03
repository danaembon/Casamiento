import React, { useState } from 'react';

const MapComponent = () => {
  const [mostrarMapa, setMostrarMapa] = useState(false);

  const handleIconClick = () => {
    setMostrarMapa(!mostrarMapa);
  };

  return (
    <div className="map-wrapper">
      <p className="p datos" onClick={handleIconClick}>¿Cómo llegar?</p>
      <span className='icono-mapa' onClick={handleIconClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f1eded" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
        </svg>
      </span>
      <div className="ver-mas-container">
        <button onClick={handleIconClick} className="ver-mas-button">Ver más</button>
      </div>
      
      {mostrarMapa && (
        <div className="map-container">
          <iframe 
            title="ubicacion al casamiento" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.222396166399!2d-58.79970542522231!3d-34.44650204921069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9ecf9c7e283d%3A0x185bcdb66e07803c!2sFinca%20Madero%20El%20Roble!5e0!3m2!1ses-419!2sil!4v1721661581936!5m2!1ses-419!2sil" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
