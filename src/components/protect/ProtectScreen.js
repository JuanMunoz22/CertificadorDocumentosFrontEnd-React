import React from 'react'
import Swal from 'sweetalert2';

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

  //User
  const user = JSON.parse(localStorage.getItem('user'));

  //Referencias al formulario
  const formulario = document.getElementById('protect-form');
  let file = document.getElementById('document').files[0];

  //Referencias HTML
  const div = document.getElementById('drop');

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



  let datos = new FormData(formulario);
  
  if(!datos.get('archivo')){
    Swal.fire(
      'Error al subir documento',
      'Ningun documento enviado, por favor selecciona un documento',
      'error'
    )

    err = true;
  }

  if(file.type != 'application/pdf'){
    err = true;

    return Swal.fire(
      'Error al subir documento',
      'Solo se permiten archivos PDF, por favor verifica la extensión de tu archivo',
      'error'
    ) 
  }

  if(file === undefined){
    Swal.fire(
      'Error al subir documento',
      'Ningun documento seleccionado',
      'error'
    )

    err = true;
  }

  if(!err){
    const data = file;

    const formData = new FormData();
    formData.append('archivo', data);

    if(data.type != 'application/pdf'){
      return Swal.fire(
        'Error al subir documento',
        'Solo se permiten archivos PDF, por favor verifica la extensión de tu archivo',
        'error'
      )
    }

    const myHeader = new Headers({
        'x-token' : user.token
    });

    fetch('https://certificador.herokuapp.com/api/uploads/proteguer', {
      method: 'POST',
      headers: myHeader,
      mode: 'cors',
      body: formData  
    })
    .then(res => res.json())
    .then(data => {

      if(data.msg === 'Token no valido'){
        localStorage.removeItem('user');
        window.location.reload();
      }
        
      if(data.msg){
        return Swal.fire(
          'Error al proteguer documento',
          'Verifica que este documento no este certificado anteriormente',
          'warning'
        )
      }

      const crearHTML = `
      <div id='infoZone'>
        <h4> Información de documento certificado </h4>

        <p><strong>Nombre documento: </strong> ${data.nombre}</p>
        <p><strong>Fecha de protección: </strong>${data.protectDate}</p>
        <p><strong>Hash Anterior: </strong>${data.lastHash}</p>
        <p><strong>Hash: </strong>${data.hash}</p>

          <div className='col-lg-6'>

            <center>
            <p><strong>Visualizar documento  </strong></p> 
            </center>
            
            <a href='${data.path}' target='_blank'>
              <center>
                <ion-icon name="eye-outline"></ion-icon>
              </center>          
            </a>
          </div>
        </div>
  
      </div>
    `;

      div.innerHTML = crearHTML;

    })



  }

}


export const ProtectScreen = () => {
  return (
    <div className='row protect-zone'
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
        <div id='drop' className='col-lg-10'>
            <div id='dropZone' className='dropZone'>
                <p>Arrastra aqui tu documento</p>
                <center>
                  <div className='loaded'>
                    <ion-icon name="archive-outline" id='icon'></ion-icon>
                  </div>
                </center>
                <form id='protect-form' className='form-protect'>
                  <input id='document' name='archivo' className='form-control w-50 mx-auto' type='file' accept='.pdf'/>
                  <center>
                   <input onClick={handleSubmit} id='btnProtect' className='btn' type='submit' value='Proteguer' />
                  </center>
                </form>
            </div>
        </div>
    </div>
  )
}
