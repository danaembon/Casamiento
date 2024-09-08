import React, { useState } from 'react';

const Regalo = () => {
  const [mostrarRegalo, setMostrarRegalo] = useState(false);

  const handleIconClick = () => {
    setMostrarRegalo(!mostrarRegalo);
  };
  const [mostrarCBU, setMostrarCBU] = useState(false);

  const handleIconCBU = () => {
    setMostrarCBU(!mostrarCBU);
  };

  return(
    <div className='regalo'>

        <p className='p-regalo datos' onClick={handleIconClick}>¿Querés hacernos un regalo?</p>
        <span className='icono-regalo' onClick={handleIconClick}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-gift" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f1eded" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" />
        <path d="M12 8l0 13" />
        <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" />
        </svg>
        </span>
        <div className="ver-mas-container">
        <button onClick={handleIconClick} className="ver-mas-button">Ver más</button>
        </div>
        {mostrarRegalo && ( 
          <>
            <div className='contenedor-sobre'>
            <span className='icono-sobre'>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f1eded" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
              <path d="M3 7l9 6l9 -6" />
            </svg>  
            </span>
            <p className='datos p-plata'>El día de la fiesta o...</p>
            </div>
          
            <button onClick={handleIconCBU} className="ver-mas-button">Ver CBU</button>
            {mostrarCBU && (
              <div className='container-cbu'>
              <div className='container-cbu-titular'>
                <p className='datos p-plata cuenta-datos'><b>Titular: </b> Michelle Tali Langleben</p>
                <p className='datos p-plata banco'><b>Banco: </b>Banco de la Provincia de Buenos Aires</p>
              </div>
              <div className='container-cbu-ars'>
                <p className='datos p-plata cuenta'><b>Cuenta en ARS: </b></p>
                <p className='datos p-plata cuenta-datos'>CBU: 0140100003402350809673</p>
                <p className='datos p-plata cuenta-datos'>Alias: IAIR.MICHELLE</p>
              </div>
              <div className='container-cbu-usd'>
                <p className='datos p-plata cuenta'><b>Cuenta en USD: </b></p>
                <p className='datos p-plata cuenta-datos'>CBU: 0140100004402350095453</p>
                <p className='datos p-plata cuenta-datos'>Alias: IAIR.MICHELLE.USD</p>
              </div>
            </div>
            )}
            

          </>
        )}

    </div>
  )
}
export default Regalo;