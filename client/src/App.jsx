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
            <li><a href="#informacion">Infomación</a></li>
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
          <h2 className='subtitulo'>Queremos compartir este momento junto a vos</h2>
          <span className='infinity'>
            <svg viewBox="0 0 100 50">
              <path className='infinity-path' d="M49.6,25c-4.6,0-8.4,3.8-8.4,8.4s3.8,8.4,8.4,8.4c4.6,0,8.4-3.8,8.4-8.4C58,28.8,54.2,25,49.6,25z M24.4,25
                c-4.6,0-8.4,3.8-8.4,8.4s3.8,8.4,8.4,8.4c4.6,0,8.4-3.8,8.4-8.4C32.8,28.8,29,25,24.4,25z M24.4,33.4c-2.1,0-3.8-1.7-3.8-3.8
                s1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8S26.5,33.4,24.4,33.4z M49.6,33.4c-2.1,0-3.8-1.7-3.8-3.8s1.7-3.8,3.8-3.8
                c2.1,0,3.8,1.7,3.8,3.8S51.7,33.4,49.6,33.4z"/>
            </svg>
          </span> 

        </div>
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
        <h3 class="fecha-informacion datos">17 de Noviembre - 17:00</h3>
        <svg width="10" height="100%" class="line-vertical">
            <line x1="5" y1="0" x2="5" y2="100%" />
        </svg>
          <h3 class="lugar-informacion datos">Finca Madero, El Roble - Luis Jorge Fontana 900, Pilar </h3>
    </div>
    <svg width="25vw" height="10" class="line-horizontal">
        <line x1="0" y1="5" x2="100%" y2="5" />
    </svg>
    <MapComponent/>
    <Regalo></Regalo>
  </article>
</section>

      <section className='countDown'>
        <h2 className="faltan">Faltan</h2>
        <CountdownTimer/>
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
