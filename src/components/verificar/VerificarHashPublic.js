import React from 'react'
import Swal from 'sweetalert2';


export const VerificarHashPublic = () => {

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

                window.open(data.url, '_blank');
            })
        }
    }

  return (
    <div className='row mx-auto'>
        <center>
        <div  className='col-lg-10'> 
            <div className='VerifyHashPublic'>

                <h3>Verificar documento con hash</h3>

                <form id='verifyPublicHash' className='formVerifyHash'> 

                    <input name='hash' id='hash' type="text" className="inputText form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Ingresa tu hash aqui...'/>

                    <center>

                    <div className="d-grid gap-2">
                        <input onClick={handleSubmit} type='submit' value='Verificar Hash' className='btn btnHash' />
                    </div>
                    </center>
                </form>
            </div>
        </div>
        </center>
    </div>
  )
}
