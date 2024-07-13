import './App.css'
import React, { useRef, useEffect, useState } from 'react';
import CountdownTimer from './logica/countDown.jsx'
import PhotoChanger  from './logica/photos.jsx'
import Formulario from './logica/formulario.jsx'
import MapComponent from './logica/mapa.jsx'
import Regalo from './logica/regalo.jsx';


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
      <section className='countDown'>
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
    <MapComponent/>
    <Regalo></Regalo>
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
