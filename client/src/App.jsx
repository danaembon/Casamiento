import './App.css'
import React from 'react'
import CountdownTimer from './logica/countDown.jsx'
import PhotoChanger  from './logica/photos.jsx'
import Formulario from './logica/formulario.jsx'


function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  
  return (
    <main>
      <header className='navegation'>
        <nav>
          <ul>
            <li><a href="#informacion">Infomacion</a></li>
            <li><a href="#confirmar">Confirmar</a></li>
          </ul>
        </nav>
      </header>
      <section className='inicio'>
        <h1 className='titulo'>Casamiento de Iair y Michu</h1>
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
          <iframe title='ubicacion al casamiento' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.195468048256!2d-58.79825969999999!3d-34.4471857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9ecf9c7c2583%3A0x81b2e7a09d3c0dda!2sFinca%20Madero%20El%20Omb%C3%BA!5e0!3m2!1ses-419!2sil!4v1718443574799!5m2!1ses-419!2sil" width="600" height="400" style={{border:0,  allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade"}}></iframe>
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

      
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
    </main>
  )
}

export default App
