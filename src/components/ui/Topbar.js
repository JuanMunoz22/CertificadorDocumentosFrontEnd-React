import { getByDisplayValue } from '@testing-library/react';
import React from 'react'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';


export const Topbar = () => {

    //Menu toggle
    const toggleFunction = () => {
    
        let toggle = document.querySelector('.toggle');
        let main = document.querySelector('.main');
        let navigation = document.querySelector('.navigationUser');

        navigation.classList.toggle('active');
        main.classList.toggle('active');        
    }

    //User-img
    const user = JSON.parse(localStorage.getItem('user') || {logged: false});

    const handleSubmit = (e) => {
        e.preventDefault();
        let err = false;

        const hash = document.getElementById('hash');

        if(hash.value === ''){
            Swal.fire(
                'Error al buscar documento',
                'Ingresa un hash para realizar la busqueda',
                'error'
              )

              err = true;
        }

        if(!err){

            fetch('https://certificador.herokuapp.com/api/uploads/verificarhash', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hash : hash.value
                })
            })
            .then(res => res.json())
            .then(data => {

                if(data.errors){
                    return Swal.fire(
                        'Error al buscar documento',
                        'El hash ingresado es incorrecto',
                        'error'
                      )
                }


                Swal.fire(
                    'Documentro encontrado',
                    '',
                    'success'
                  )

                window.open(data.url, '_blank');
            })
        }



    }

  return (
        <div className='row'>
            <div className='col-lg-12'>
                <div className='main'>
                <div className='topbar'>
                    <div className='toggle' onClick={toggleFunction}>
                        <ion-icon name="menu-outline"></ion-icon> 
                    </div>

                    <div className='search'>
                        <form>
                            <label>
                                <input id='hash' type='text' placeholder='Buscar documento por hash...' />
                                <ion-icon onClick={handleSubmit} name="search-outline"></ion-icon>
                            </label>
                        </form>
                    </div>

                    <div className='user'>
                        <NavLink 
                            to='/user/config'
                        >
                            <img src={user.img} />
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
