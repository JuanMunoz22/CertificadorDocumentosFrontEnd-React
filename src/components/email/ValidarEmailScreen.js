import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { validateRUT } from 'validar-rut';

export const ValidarEmailScreen = () => {

    const {id} = useParams();   
    const navigate = useNavigate();
    let error = false;

    const rutValido = validateRUT(id);

    if(!rutValido){
        error = true;   
    }
    
    fetch(`https://certificador.herokuapp.com/api/usuarios/validate/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' } 
    })
    .then(res => res.json())
    .then(data => {

        if(data.msg){
            navigate('/', {
                replace: true
            });
        }

        if(data.estado === true){
            navigate('/', {
                replace: true
            });
        }
    })

    useEffect(() => {
        if(error){
            navigate('/', {
                replace: true
            });
        }
    }, [])



    return (
    <div className='validarEmail'>
        <div className='row'>
            <div className='col-lg-12 mx-auto'>
                <h4>Gracias por validar tu correo</h4>

                <ion-icon name="mail-open-outline"></ion-icon>
                <p>Ya puedes iniciar sesión con tu cuenta</p>


                <NavLink
                    to='/login'
                >
                    Iniciar Sesión
                </NavLink>


            </div>
        </div>
    </div>
  )
}
