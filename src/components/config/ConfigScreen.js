import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../auth/authContext';

import { formatRut } from 'rutlib';


export const ConfigScreen = () => {

    const {user, dispatch} = useContext(AuthContext);

  return (
    <div className='config'>
      <div className='updateUSer'>
        <div className='row'>
            <div className='col-lg-10'>
                <center>
                <form className='formularioUpdate'>
                    <h3>Datos de usuario</h3>

                    <div className='col-lg-12'>
                        <center>
                            <NavLink
                                to='/user/update/img'
                            >
                                <img src={user.img}/>
                            </NavLink>
                        </center>
                    </div>



                    <fieldset disabled>

                        <div className='col-lg-12'>
                            <label htmlFor='Rut' className='form-label'>Rut</label>
                            <input id='rut' name='Rut' type='text' className='form-control' defaultValue={formatRut(user.rut)} aria-label="rut" readOnly />
                        </div>

                        <div className='col-lg-12'>
                            <label htmlFor='Nombre' className='form-label'>Nombres / Apellidos</label>
                            <input name='Nombre' type='text' className='form-control' defaultValue={user.nombre} aria-label="nombre" readOnly/>
                        </div>

                        <div className='col-lg-12'>
                            <label htmlFor='Email' className='form-label'>Email</label>
                            <input name='Email' type='text' className='form-control' defaultValue={user.correo} aria-label="email" readOnly/>
                        </div>
                    </fieldset>
                </form>
                </center>

                <NavLink
                    to='/user/update'
                >

                    <div className='col-lg-2 mx-auto' >
                        <button type="button" className="btn btn-danger passwordBtn">Cambiar Contraseña</button>
                    </div>
                </NavLink>
            </div>
        </div>
        </div>
    </div>
  )
}
