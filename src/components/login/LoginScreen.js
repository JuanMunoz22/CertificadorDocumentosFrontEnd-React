import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../auth/authContext';
import {types} from '../../types/types'

export const LoginScreen = () => {

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);
  
  const handleLogin = (e) => {
    let err = false;
    e.preventDefault();

    //Referencia al formulario
    const formulario = document.getElementById('formularioLogin');

    let datos = new FormData(formulario);
    const user = {
      correo: datos.get('Email'),
      password: datos.get('Password')
    }

    if(user.correo === '' || user.password === ''){
      Swal.fire(
        'Error',
        'Rellenar todos los campos es obligatorio',
        'error'
      )
      err = true;
    }

    if(!err){
      fetch('https://certificador.herokuapp.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            correo: user.correo,
            password: user.password
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.errors || data.msg){
          Swal.fire(
            'Error',
            'Usuario y/o Password incorrectos',
            'error'
          );  
        }else{
          if(!data.usuario.img){
            const action = {
              type: types.login,
              payload: {
                correo: user.correo,
                nombre: data.usuario.nombre,
                rut: data.usuario.rut,
                token: data.token,
                img: 'https://certificador.herokuapp.com/api/uploads/usuarios/625dfc98a8561f508984a02e',
                uid: data.usuario.uid
              }
            }

            dispatch(action);

          }else{
            const action = {
              type: types.login,
              payload: {
                correo: user.correo,
                nombre: data.usuario.nombre,
                rut: data.usuario.rut,
                token: data.token,
                img: data.usuario.img,
                uid: data.usuario.uid
              }
            }

            dispatch(action);

          }

          navigate('/user/dashboard', {
            replace: true
          });
        }
      })
    }

  }

  return (
    <div className='formulario login'>
      <div className='row'>
        <div className='col-lg-10 mx-auto'>

            <h3>Iniciar Sesión</h3>

            <form id='formularioLogin' className='row formLogin' >
              <div className='col-lg-12'>
                <label htmlFor='Email' className='form-label'>Email</label>
                <input name='Email' type='email' className='form-control' placeholder='Ingresa tu correo...' id='inputEmail'/>
              </div>

              <div className='col-lg-12'>
                <label htmlFor='Password' className='form-label'>Contraseña</label>
                <input name='Password' type='password' className='form-control' placeholder='Ingresa tu contraseña...' id='inputPass'/>
              </div>

              <div className='col-lg-12 btnLogin'>
                <button type="submit" className='btn btn-primary' onClick={handleLogin}>Iniciar Sesión</button>
              </div>
            </form>
        </div>

      </div>
    </div>
  )
}
