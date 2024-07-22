import React, { useState } from 'react';

const Regalo = () => {
  const [mostrarRegalo, setMostrarRegalo] = useState(false);

  const handleIconClick = () => {
    setMostrarRegalo(!mostrarRegalo);
  };

  return(
    <div className='regalo'>

        <p className='p-regalo datos' onClick={handleIconClick}>Nada nos haría más felices que compartir este día con vos. Si querés sumar a nuestra felicidad un aporte económico te dejamos estas opciones:</p>
        <span className='icono-regalo' onClick={handleIconClick}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-gift" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f1eded" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" />
        <path d="M12 8l0 13" />
        <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" />
        </svg>
        </span>
        <button onClick={handleIconClick} className="ver-mas-button">Ver más</button>
        {mostrarRegalo && (
            <p className='datos'>Plata plata mucha plata (diganme que pongo aca)</p>
        )}

    </div>
  )
}
export default Regalo;