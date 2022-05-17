import React from 'react'

export const ProtectScreenInfo = () => {
  return (
    <div className='row protect-zone'>
        <div className='col-lg-10'>
            <div className='dropZone'>
                <p>Arrastra aqui tu documento</p>

                <form id='protect-form' className='form-protect'>
                  <input id='document' name='archivo' className='form-control w-50 mx-auto' type='file'/>
                  <center>
                   <input onClick={handleSubmit} id='btnProtect' className='btn' type='submit' value='Proteguer' />
                  </center>
                </form>
            </div>
        </div>
    </div>
  )
}
