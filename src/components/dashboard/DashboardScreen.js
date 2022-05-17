import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export const DashboardScreen = () => {

  //User
  const user = JSON.parse(localStorage.getItem('user'));
  const [total, setTotal] = useState([]);

  const myHeader = new Headers({
    'x-token' : user.token
  });

  const data = useEffect(() => {
    fetch(`https://certificador.herokuapp.com/api/document/${user.uid}`, {
      method: 'GET',
      headers: myHeader,
      mode: 'cors',
    })
    .then(res => res.json())
    .then(data => {
      setTotal(data.total);
    })
  }, [])  

  //MSG
  const mensajes = () => {
    Swal.fire(
      'No tienes mensajes recibidos',
      '',
      'warning'
    )
  }

  const docProteguidos = () => {
    if(total === 0){
      Swal.fire(
        'No tienes documentos proteguidos',
        'Protegue un documento antes de ingresar a esta sección',
        'warning'
      )
    }else{
      window.location = 'history/protect';
    }
  }

  return (
    <div className='row dashboard'>
      <div className='col-lg-10 mx-auto'>
        <div className='cardBox'>
        <div onClick={docProteguidos} className='cardUser'>
          <div>
            <div className='numbers'>{total}</div>
            <div className='cardName'>Documentos Protegidos</div>
          </div>
          <div className='iconBx'>
            <ion-icon name="document-lock-outline"></ion-icon>
          </div>
        </div>

        <div onClick={mensajes} id='msg' className='cardUser'>
          <div>
            <div className='numbers'>0</div>
            <div className='cardName'>Mensajes</div>
          </div>
          <div className='iconBx'>
            <ion-icon name="chatbubbles-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}
