import React from 'react'

const user = JSON.parse(localStorage.getItem('user'));
let desde = 0;
const api = `https://certificador.herokuapp.com/api/document/${user.uid}?desde=${desde}&limite=10`;

const myHeader = new Headers({
    'x-token' : user.token
});

fetch(api, {
    method: 'GET',
    headers: myHeader,
    mode: 'cors',
  })
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById('tbody');
    const paginacion = document.getElementById('pages');

    let HTML = '';
    let paginas = 0;

    
    if(data.total > 10){
        paginas = Math.ceil(data.total / 10);
    }else{
        paginas = 1;
    }
    
    for (let i = 0; i < paginas; i++) {

        let paginationHTML = `
            <li class='page-item'>
                <a id='${i+1}' class='page-link' onclick="
                    let valor = document.getElementById('${i+1}').value = ${i+1};
                    console.log(valor);
                " >${i+1}</a>
            </li>
        `;

        paginacion.innerHTML += paginationHTML;        
    }

    for (let i = 0; i < data.total + 1 || i <= 10; i++) {
        HTML = `
            <tr>
                <th scope="row">${i+1}</th>
                <td>${data.documentos[i].nombre}</td>
                <td id='hashTable'>${data.documentos[i].hash}</td>
                <td>
                <center>
                    <a href='${data.documentos[i].path}' target='_blank'>
                        <ion-icon name="eye-outline"></ion-icon>
                    </a>
                </center>
                </td>
            </tr>
        `

        tbody.innerHTML += HTML;
    }
  })

export const ProtectHistoryScreen = () => {
  return (
    <div className='row historyProtect'>
        <div className='col-lg-10'>
           <center>
            <div className='history'>
                <h4>Documentos Proteguidos</h4>

             
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Nombre Documento</th>
                            <th scope='col' id='hashTable'>Hash</th>
                            <th scope='col'>Visualizar Documento</th>
                        </tr>
                    </thead>

                    <tbody id='tbody' scope='row'>

                    </tbody>
                </table>
            </div>

            <div className='Page navigation pagination'>
                <ul id='pages' className='pagination justify-content-center'> 
                </ul>
            </div>
        </center>
        </div>
    </div>
  )
}
