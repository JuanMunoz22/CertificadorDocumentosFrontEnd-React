import React from 'react'
import {NavLink } from 'react-router-dom'

export const HomeScreen = () => {
  return (
    <div>
      <div className='principal'>
        <div className='row justify-content-md-center'>
          <div className='col-lg-4 col-xs-12'>
            <h1>Certificación de documentos con <strong>Blockchain</strong></h1>
            <p>Avance con la transformacion digital de su empresa de forma segura con BaaS utilizando los reconocidos Smart Contract para proteger tus documentos.</p>
          </div>

          <div className='col-lg-4 col-sm-12 col-xs-12'>
              <img src='../assets/images/red-blockchain.png'/>
          </div>

          <div className='col-lg-8'>
            <NavLink
              to='/registro'
            >
              Registrate Aqui
            </NavLink>
          </div>
        </div>
      </div>
 
      <div className='secondSection'>
        <div className='why'>
          <div className='row justify-content-md-center'>
            <div className='col-lg-12'>
                <h2>¿Por qué elegirnos?</h2>
                <p>Somos una Compañia con presencia en diferentes mercados, y trabajamos diariamente para que nuestros clientes nos tengan presente cuando desean expandirse, modernizar sus equipos y para requerir servicios especializados. Si Ud. aún no es cliente, sepa que será integrado a este ámbito y filosofía de trabajo.</p>
                <br/>
                <p>Ademas, nuestro servicios le permitiran mantener: </p>  
                <br/>

                <div className='card-group groupServices'>
                  <div className='card servicios'>
                    <img className='card-img-top' src='../assets/images/integridad.jpg'/>
                    <div className='card-body'>
                      <h5 className='card-tittle'>Integridad de la información</h5>
                      <p className='card-text'>Una vez generado el registro de la información en la blockchain, no puede ser modificado ni adulterado.</p>
                    </div>
                  </div>

                  <div className='card servicios'>
                    <img className='card-img-top' src='../assets/images/transparencia.png'/>
                    <div className='card-body'>
                      <h5 className='card-tittle'>Transparencia</h5>
                      <p className='card-text'>Nuestra solución permite generar información, rastreable, verificable y confiable.</p>
                    </div>
                  </div>

                  <div className='card servicios'>
                    <img className='card-img-top' src='../assets/images/confianza.jpg'/>
                    <div className='card-body'>
                    <h5 className='card-tittle'>Sin necesidad de terceros de confianza</h5>
                    <p className='card-text'>No hay necesidad de una autoridad central, ya que toda la información se registra en la blockchain.</p>                    </div>
                  </div>
                </div>
              </div>       
            </div>
          </div>
        </div>
      </div>

  )
}
