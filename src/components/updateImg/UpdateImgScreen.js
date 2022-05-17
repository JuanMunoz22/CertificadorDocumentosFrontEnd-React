import React from 'react'
import { actualizarImagen } from '../../helpers/user';
import { useNavigate } from 'react-router-dom';


export const UpdateImgScreen = () => {

    //User
    const user = JSON.parse(localStorage.getItem('user') || {logged: false});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let err = false;

        //Referencias al formulario
        const formulario = document.getElementById('forImg');

        let datos = new FormData(formulario);

        if(!datos.get('archivo')){
            console.log('error');
        }

        const data = datos.get('archivo')

        if(!err){
            actualizarImagen(user.uid, data);
        }
    }


  return (
    <div className='containerUpdateImg'>
        <div className='updateImg'>
            <h3>Actualizar Imagen de perfil</h3>

            <form id='forImg'>
                <div className='col-lg-10 mx-auto'>
                    <label htmlFor="formFile" className="form-label">Seleccionar Imagen</label>
                    <input name='archivo' className="form-control" type="file" id="formFile" />
                </div>

                <div className="d-grid gap-2">
                    <button className="btn btn-primary btnImg" type="submit" onClick={handleSubmit}>
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
