import React, { useContext } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const SideBar = () => {

    const {user, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    
    //Logout
    const handleLogout = () => {

      Swal.fire({
        title: 'Estas seguro?',
        text: "presiona cancelar si no estas seguro!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cerrar sesión!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({type: types.logout});
          navigate('/login', {
            replace: true
          });
        }
      })
    }


    const toggleFunction = () => {
    
      let toggle = document.querySelector('.toggle');
      let main = document.querySelector('.main');
      let navigation = document.querySelector('.navigationUser');

      navigation.classList.toggle('active');
      main.classList.toggle('active');        
  }

    return (
      <div className='row'>
        <div className='col-lg-2'>
          <div className='containerUser'>
            <div className='navigationUser'>
              <ul>
                <li>
                  <NavLink
                    to='/user/dashboard'
                  >
                    <span className='icon'><ion-icon name="shield-checkmark-outline"></ion-icon></span>
                    <span className='tittleName'>{user.nombre}</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to='/user/dashboard'
                    onClick={toggleFunction}
                  >
                    <span className='icon'><ion-icon name="home-outline"></ion-icon></span>
                    <span className='tittle'>Dashboard</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to='/user/protect'
                    onClick={toggleFunction}
                  >
                    <span className='icon'><ion-icon name="document-lock-outline"></ion-icon></span>
                    <span className='tittle'>Proteguer Documento</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                      to='/user/verify'
                      onClick={toggleFunction}
                    >
                      <span className='icon'><ion-icon name="documents-outline"></ion-icon></span>
                      <span className='tittle'>Verificar Documento</span>
                    </NavLink>
                </li>

                <li>
                  <NavLink
                      to='/user/config'
                      onClick={toggleFunction}
                    >
                      <span className='icon'><ion-icon name="settings-outline"></ion-icon></span>
                      <span className='tittle'>Configuraciones</span>
                    </NavLink>
                </li>

                <li onClick={handleLogout}>
                  <NavLink
                      to='/'
                      onClick={toggleFunction}
                    >
                      <span className='icon'><ion-icon name="log-out-outline"></ion-icon></span>
                      <span className='tittle'>Cerrar Sesión</span>
                    </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}
