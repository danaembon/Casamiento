import { useEffect, useState } from "react";

const CountdownTimer = () => {
    const targetDate = new Date('2024-11-17T00:00:00Z'); // Fecha objetivo (17 de noviembre de 2024)
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    function calculateTimeLeft() {
      const now = new Date(); // Fecha actual
      const difference = targetDate.getTime() - now.getTime();
  
      if (difference > 0) {
        const seconds = Math.floor(difference / 1000) % 60;
        const minutes = Math.floor(difference / (1000 * 60)) % 60;
        const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        // const weeks = Math.floor(days / 7);
        // const months = Math.floor(days / 30);
  
        return {
          // months,
          // weeks,
          days,
          hours,
          minutes,
          seconds
        };
      } else {
        // Si la fecha objetivo ha pasado, devuelve valores nulos o negativos
        return {
          // months: 0,
          // weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
    }
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearTimeout(timer);
    });
  
    return (
      <div className='cuentaRegresiva'>
        <h2 className="">Faltan</h2>
        {/* <div className='mes circulo'><p>{timeLeft.months} meses</p></div>
        <div className='semana circulo'><p>{timeLeft.weeks} semanas</p></div> */}
        <div className='containerCirculo'>
          <p>días</p>
          <div className='dia circulo'><p>{timeLeft.days}</p></div>
        </div>
        <div className='containerCirculo'>
          <p>hs</p>
          <div className='hora circulo'><p>{timeLeft.hours}</p></div>
        </div>
        <div className='containerCirculo'>
          <p>min</p>
          <div className='minutos circulo'><p>{timeLeft.minutes}</p></div>
          </div>
        <div className='ultimoCirculo'>
          <p>seg</p>
          <div className='segundos circulo'><p>{timeLeft.seconds} </p></div>
        </div>
      </div>
    );
  }


  export default CountdownTimer;