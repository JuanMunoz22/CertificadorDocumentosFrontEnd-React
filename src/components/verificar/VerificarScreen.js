//Public Verify

import React from 'react'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

export const VerificarScreen = () => {

  let archivo = false;

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dropZone = document.getElementById('dropZone');
    let fileTest = document.getElementById('document');
    const icon = document.getElementById('icon');
    archivo = e.dataTransfer.files[0];
    dropZone.style.backgroundColor = '#001936';
    fileTest.style.display = 'none';
    icon.style.display = 'block';

    Swal.fire(
      'Archivo cargado correctamente',
      '',
      'success'
    )
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dropZone = document.getElementById('dropZone');
    dropZone.style.backgroundColor = '#F59D00';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = false;

    const formulario = document.getElementById('verifyPublic');
    let file = document.getElementById('document').files[0];

    if(!file && !archivo){
      err = true;
      return Swal.fire(
        'Error al subir documento',
        'Ningun documento enviado, por favor selecciona un documento',
        'error'
      )
    }

    if(archivo != false){
      file = archivo;
    }

    if(file.type != 'application/pdf'){
      err = true;

      return Swal.fire(
        'Error al subir documento',
        'Solo se permiten archivos PDF, por favor verifica la extensión de tu archivo',
        'error'
      ) 
    }

    let datos = new FormData(formulario);

    if(!datos.get('archivo')){
      Swal.fire(
        'Error al subir documento',
        'Ningun documento enviado, por favor selecciona un documento',
        'error'
      )
  
      err = true;
    }

    if(!err){
      const data = file;
      const formData = new FormData();
      formData.append('archivo', data);

      fetch('https://certificador.herokuapp.com/api/uploads/verificar', {
        method: 'POST',
        body: formData  
      })
      .then(res => res.json())
      .then(data => {
  
        if(data.msg){
          return Swal.fire(
            'Error al verificar documento',
            'Este documento no se encuentra certificado con blockchain',
            'error'
          )
        }
  
        if(data.url){
          window.open(data.url, '_blank');
          window.location.reload();
        }
      })
    }
  }


  return (
    <div id='dropArea' className='row'
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className='col-lg-10'>
        <div id='dropZone' className='verifyPublic'>
          <h3>Arrastra aqui el documento original</h3>
          <center>
          <div className='loaded'>
            <ion-icon name="archive-outline" id='icon'></ion-icon>
          </div>
          </center>
          <form id='verifyPublic' className='formVerify'>
              <input name='archivo' id='document' className='form-control w-50 mx-auto' type='file'/>
              <center>
              <input onClick={handleSubmit} id='btnVerify' className='btn' type='submit' value='Verificar' />
              </center>
          </form>

          <NavLink
            to='/verificar/hash'
          >
            <p>Verificar documento con hash</p>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
