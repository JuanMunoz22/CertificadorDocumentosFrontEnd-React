import React from 'react'
import Swal from 'sweetalert2';
import { registrarUsuario } from '../../helpers/user';
import { formatRut } from 'rutlib';



export const RegistroScreen = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = false;

    //Referencia Formulario
    const formulario = document.getElementById('formularioRegistro');

    let datos = new FormData(formulario);
    const data = {
      rut: datos.get('Rut'),
      nombre: datos.get('Nombre'),
      apellido: datos.get('Apellido'),
      correo: datos.get('Email'),
      password: datos.get('Password'),
      passwordConfirm: datos.get('PasswordConfirm'),
      terminos: datos.get('terminos'),
      rol :"USER_ROLE" 
    }

    if(data.rut === "" || data.nombre === "" || data.apellido === "" || data.correo === "" || data.password === "" || data.passwordConfirm === ""){
      Swal.fire(
        'Error al registrar datos',
        'Rellena todos los campos correctamente',
        'error'
      )
      err = true;
    }

    if(data.password != data.passwordConfirm ){
      Swal.fire(
          'Error al registrar datos',
          'Los campos de contraseña deben ser identicos',
          'error'
      );
      err = true;
    }

    if(data.terminos === null){
      Swal.fire(
          'Error al registrar datos',
          'Aceptar los terminos y condiciones es obligatorio',
          'warning'
      );
      err = true;
    }

    if(data.password.length < 6){
      Swal.fire(
          'Error al registrar datos',
          'La contraseña debe tener 6 caracteres como minimo',
          'warning'
      );
      err = true;
    }

    if(!err){
      registrarUsuario(data);
    }
  }

  return (
    <div className='formulario registro'>
      <div className='row'>
        <div className='col-lg-10 mx-auto'>

          <h3>Registrarse</h3>

          <form id='formularioRegistro' onSubmit={handleSubmit} className='row form'>
            <div className='col-lg-12'>
              <label htmlFor='Rut' className='form-label'>RUT</label>
              <input onChange={(e) => e.target.value = formatRut(e.target.value)} name='Rut' type='text' className='form-control' placeholder='Ingresa tu RUT...' aria-label="rut" />
            </div>

            <div className='col-lg-6'>
              <label htmlFor='Nombre' className='form-label'>Nombre</label>
              <input name='Nombre' type='text' className='form-control' placeholder='Ingresa tu nombre...' aria-label="nombre" />
            </div>

            <div className='col-lg-6'>
              <label htmlFor='Apellido' className='form-label'>Apellido</label>
              <input name='Apellido' type='text' className='form-control' placeholder='Ingresa tu apellido...' aria-label="apellido" />
            </div>

            <div className='col-lg-12'>
              <label htmlFor='Email' className='form-label'>Email</label>
              <input name='Email' type='email' className='form-control' placeholder='Ingresa tu correo ...' aria-label="email" />
            </div>

            <div className='col-lg-6'>
              <label htmlFor='Password' className='form-label'>Contraseña</label>
              <input name='Password' type='password' className='form-control' placeholder='Ingresa tu contraseña...' aria-label="password" />
            </div>

            <div className='col-lg-6'>
              <label htmlFor='PasswordConfirm' className='form-label'>Confirmación</label>
              <input name='PasswordConfirm' type='password' className='form-control' placeholder='Confirma tu contraseña...' aria-label="passwordConfirm" />
            </div>

            <div className='col-lg-12'>
              <div className='form-check'>
                <input name='terminos' className='form-check-input' type='checkbox' id='gridCheck' />
                <label className='form-check-label' htmlFor='gridCheck'>
                  Terminos Y Condiciones
                </label>
              </div>
            </div>

            <div className='col-lg-12 btnRegistrar'> 
              <button type='submit'className='btn btn-primary'>
                Registrarse
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>

  )
  
}
