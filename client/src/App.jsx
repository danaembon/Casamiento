import './App.css'
import React, { useRef, useEffect, useState } from 'react';
import CountdownTimer from './logica/countDown.jsx'
import PhotoChanger  from './logica/photos.jsx'
import Formulario from './logica/formulario.jsx'
import MapComponent from './logica/mapa.jsx'


function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navRef.current.classList.add('hidden');
      } else {
        navRef.current.classList.remove('hidden');
      }
    };

    // Verifica si el navegador soporta event listeners pasivos
    let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
        }
      });
      window.addEventListener('testPassive', null, opts);
      window.removeEventListener('testPassive', null, opts);
    } catch (e) {}

    window.addEventListener('scroll', handleScroll, supportsPassive ? { passive: true } : false);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main>
      <header ref={navRef} className='navegation'>
        <nav>
          <ul>
            <li><a href="#informacion">Infomacion</a></li>
            <li><a href="#confirmar">Confirmar</a></li>
          </ul>
        </nav>
      </header>
      <section className='inicio'>
        <div className='contenedorFotos'>
          <PhotoChanger />
        </div>
        <div className='texto'>
          <p className='fecha'>17-11-24</p>
          <hr className="linea-separadora-inicio titulo"/>
          <h1 className='titulo'>IyM</h1>
          <hr className="linea-separadora-inicio invitamos"/>
          <h2 className='subtitulo'>Los invitamos a nuetro casamiento</h2>
          <span className='heart'>
          <svg viewBox="-10 0 52 32">
              <path className='heart-path' d="M23.6,0c-3.4,0-6.3,2.1-7.6,5.1C14.7,2.1,11.8,0,8.4,0C3.7,0,0,3.7,0,8.4c0,4.5,3.8,8.1,9.4,13.2
                l6.6,5.9l6.6-5.9c5.6-5.1,9.4-8.7,9.4-13.2C32,3.7,28.3,0,23.6,0z" />
            </svg>
          </span>
        </div>
      </section>
      <section>
        <CountdownTimer/>
      </section>
      <section id="informacion">
  <article>
  <div class="container-titulo-informacion">
        <h2 class="titulo-informacion">Ceremonia y Fiesta</h2>
        <svg width="25vw" height="10" class="line-horizontal">
            <line x1="0" y1="5" x2="100%" y2="5" />
        </svg>
    </div>
    <div class="container-datos-informacion">
        <h3 class="fecha-informacion datos">17 de Noviembre</h3>
        <svg width="10" height="100%" class="line-vertical">
            <line x1="5" y1="0" x2="5" y2="100%" />
        </svg>
          <h3 class="lugar-informacion datos">Finca Madero - Pilar</h3>
    </div>
    <svg width="25vw" height="10" class="line-horizontal">
        <line x1="0" y1="5" x2="100%" y2="5" />
    </svg>
    <p class="p">¿Cómo llegar?</p>
    <span className='icono-mapa'>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
    </svg>
    </span>

      <div className="map-container">
        <iframe 
          title="ubicacion al casamiento" 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.195468048256!2d-58.79825969999999!3d-34.4471857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9ecf9c7c2583%3A0x81b2e7a09d3c0dda!2sFinca%20Madero%20El%20Omb%C3%BA!5e0!3m2!1ses-419!2sil!4v1718443574799!5m2!1ses-419!2sil" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

  </article>
</section>


      <section id='confirmar' className='sectionConfirmar'>
        <article className='formulario-container'>
          <h2>Confirmar Asistencia</h2>
          <h3>Se puede confirmar hasta el 1 de Agosto</h3>
          <Formulario />
        </article>
      </section>
    </main>
  )
}

export default App
