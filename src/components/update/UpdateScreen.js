import React from 'react'
import Swal from 'sweetalert2';
import { updatePassword } from '../../helpers/user';

export const UpdateScreen = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = false;

    //Referencia al formulario
    const formulario = document.getElementById('Updateform');

    let datos = new FormData(formulario);
    const data = {
      lastPassword: datos.get('lastPassword'),
      newPassword: datos.get('newPassword'),
      repeatPassword: datos.get('repeatPassword')
    }

    const newPass = data.newPassword;
    
    if(data.lastPassword === '' || data.newPassword === '' || data.repeatPassword ===''){
      Swal.fire(
        'Error al registrar datos',
        'Rellenar todos los campos es obligatorio',
        'error'
        )
        err = true;
      }
      
    if(data.newPassword != data.repeatPassword){
      Swal.fire(
        'Error al registrar datos',
        'Los campos de nueva contraseña no son identicos',
        'error'
        )
        err = true;
    }

    if(data.newPassword.length < 6){
      Swal.fire(
        'Error al registrar datos',
        'La nueva contraseña debe tener 6 caracteres como minmo',
        'error'
        )
        err = true;
    }

    fetch('https://certificador.herokuapp.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          correo: user.correo,
          password: data.lastPassword
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.msg){
        err = true;
        return Swal.fire(
          'Error',
          'Verifica los datos ingresados',
          'error'
        )
      }

      if(!err){
        updatePassword(newPass);    
    }
    })


  }


  return (
    <div className='containerUpdatePassword'>
      <div className='updatePassword'>
        <h3>Actualizar Contraseña</h3>

        <form id='Updateform'>
          <div className='col-lg-10 mx-auto updateContent'>
            <label htmlFor='lastPassword' className='form-label'>Contraseña</label>
            <input name='lastPassword' type='password' className='form-control' placeholder='Ingresa tu contraseña actual...' aria-label='lastPassword'/>
          </div>

          <div className='col-lg-10 mx-auto updateContent'>
            <label htmlFor='newPassword' className='form-label'>Nueva Contraseña</label>
            <input name='newPassword' type='password' className='form-control' placeholder='Ingresa tu nueva contraseña...' aria-label='newPassword'/>
          </div>

          <div className='col-lg-10 mx-auto updateContent'>
            <label htmlFor='repeatPassword' className='form-label'>Confirmar Contraseña</label>
            <input name='repeatPassword' type='password' className='form-control' placeholder='Repite tu nueva contraseña...' aria-label='repeatPassword'/>
          </div>

          <div className='col-lg-12'>
              <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
                  Actualizar
              </button>
          </div>        
        </form>
      </div>
    </div>
  )
}
