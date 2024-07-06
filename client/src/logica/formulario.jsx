import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../axiosConfig.js';  // Asegúrate de que la ruta sea correcta

const Formulario = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send data to the backend using Axios
      const response = await axios.post('/addData', data);
  
      if (response.status === 200) {
        console.log('Formulario enviado exitosamente!');
        alert('Formulario enviado exitosamente!');
        reset(); // Reset the form after successful submission
      } else {
        throw new Error('Error al enviar formulario');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      alert('Error al enviar formulario. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <form className='formulario' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="nombre">Nombre: </label>
      <input
        type="text"
        id='nombre'
        name='nombre'
        {...register("nombre", {
          required: "Nombre es requerido",
          minLength: { value: 2, message: "Nombre debe tener al menos 2 caracteres" },
          maxLength: { value: 15, message: "Nombre debe tener menos de 15 caracteres" }
        })}
      />
      {errors.nombre && <span className="error">{errors.nombre.message}</span>}

      <label htmlFor="apellido">Apellido: </label>
      <input
        type="text"
        id='apellido'
        name='apellido'
        {...register("apellido", {
          required: "Apellido es requerido",
          minLength: { value: 2, message: "Apellido debe tener al menos 2 caracteres" },
          maxLength: { value: 15, message: "Apellido debe tener menos de 15 caracteres" }
        })}
      />
      {errors.apellido && <span className="error">{errors.apellido.message}</span>}

      <label htmlFor="restComida">Preferencia en comidas: </label>
      <select id="restComida" {...register("comida")}>
        <option value="none">Ninguna</option>
        <option value="vegano">Vegana</option>
        <option value="vegetariano">Vegetariana</option>
        <option value="sinGluten">Sin Gluten</option>
      </select>
      {errors.comida && <span className="error">Preferencia es requerida</span>}
      
      <br/>
      <button type="submit">Confirmar</button>
    </form>
  );
};

export default Formulario;
