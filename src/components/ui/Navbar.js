import React from 'react'
import {NavLink } from 'react-router-dom'

const toggle = () => {
    const navigate = document.getElementById('nav-toggle');
    navigate.checked = false;
}

export const Navbar = () => {
    return (
 
        <nav className=''>
            <input id="nav-toggle" type="checkbox"/>

            <div className='logo'>
                <NavLink
                    to='/'
                >
                    Certificador<strong>Blockchain</strong>
                </NavLink>
            </div>
            
            <div className='links'>
                <NavLink 
                    to='/'
                    className='items'
                    onClick={toggle}
                >
                    Inicio
                </NavLink>

                <NavLink 
                    to='/verificar'
                    className='items'
                    onClick={toggle}
                >
                    Verificar Documento
                </NavLink>

                <NavLink 
                    to='/login'
                    className='items'
                    onClick={toggle}
                >
                    Iniciar Sesión
                </NavLink>
            </div>

            <label htmlFor='nav-toggle' className='iconNav'>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
            </label>           
        </nav>
    )

}