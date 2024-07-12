import './App.css'
import React, { useRef, useEffect, useState } from 'react';
import CountdownTimer from './logica/countDown.jsx'
import PhotoChanger  from './logica/photos.jsx'
import Formulario from './logica/formulario.jsx'


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
        <div className='texto'>
          <p className='fecha'>17-11-24</p>
          <hr className="linea-separadora titulo"/>
          <h1 className='titulo'>IyM</h1>
          <hr className="linea-separadora invitamos"/>
          <h2 className='subtitulo'>Los invitamos a nuetro casamiento</h2>
          <span className='heart'>
          <svg viewBox="-10 0 52 32">
              <path className='heart-path' d="M23.6,0c-3.4,0-6.3,2.1-7.6,5.1C14.7,2.1,11.8,0,8.4,0C3.7,0,0,3.7,0,8.4c0,4.5,3.8,8.1,9.4,13.2
                l6.6,5.9l6.6-5.9c5.6-5.1,9.4-8.7,9.4-13.2C32,3.7,28.3,0,23.6,0z" />
            </svg>
          </span>
        </div>
        <div className='contenedorFotos'>
          <PhotoChanger />
        </div>
      </section>
      <section id='informacion'>
        <article>
         <h2>Ceremonia y Fiesta</h2>
         <h3>17 de Noviembre</h3>
         <h3>Finca Madero - Pilar</h3>
         <div>
          <p>¿Como llegar?</p>
          <div>
          <iframe title='ubicacion al casamiento' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.195468048256!2d-58.79825969999999!3d-34.4471857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9ecf9c7c2583%3A0x81b2e7a09d3c0dda!2sFinca%20Madero%20El%20Omb%C3%BA!5e0!3m2!1ses-419!2sil!4v1718443574799!5m2!1ses-419!2sil" style={{border:0,  allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade"}}></iframe>
          </div>
         </div>
        </article>
      </section>
      <section id='confirmar' className='sectionConfirmar'>
        <h2>Confirmar Asistencia</h2>
        <h3>Se puede confirmar hasta el 1 de Agosto</h3>
        <Formulario />
      </section>
      <section>
        <CountdownTimer/>
      </section>
    </main>
  )
}

export default App
