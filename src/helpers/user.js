const { default: Swal } = require("sweetalert2")

const url = 'https://certificador.herokuapp.com/api'
const api = {
    register: `${url}/usuarios/`, 
    update: `${url}/api/usuarios/`,
    updateImg: `${url}/uploads/usuarios/`,
    img: `${url}/uploads/usuarios/`,
    protect: `${url}/uploads/proteguer`
}

//User-img
const user = JSON.parse(localStorage.getItem('user'));   


const registrarUsuario = (data = {}) => {

    fetch(api.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            rut: data.rut,
            nombre: `${data.nombre} ${data.apellido}`,
            correo: data.correo,
            password: data.password,
            rol :"USER_ROLE",
        })
    })
    .then(res => res.json())
    .then(data => {

        if(data.errors){
            Swal.fire(
                'Error al registrar datos',
                'Por favor verifica el correcto ingreso de tus datos',
                'error'
        )}else{
            Swal.fire(
                'Registro Correcto',
                'Por favor verifica tu correo para activar tu cuenta',
                'success'
            )};
        })
        .catch((errors) => {
            console.log(`Errores: ${errors}`)
        })
}


const updatePassword = (data = '',) => {
    const user = JSON.parse(localStorage.getItem('user') || {logged: false});

    fetch(`${api.register}${user.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            password: data
        })
    })
    .then(res => res.json())
    .then(data => {
        return Swal.fire(
            'Contraseña Cambiada Correctamente',
            '',
            'success'
          )
    })
}

const mostrarImagen = (uid = '') => {
    fetch(`${api.img}${uid}`)
    .then(res => res.url)
    .then(data => {
        return data;
    })
}

const actualizarImagen = (uid = '', file = '') => {
    const formData = new FormData();
    formData.append('archivo', file);

    fetch(`${api.updateImg}${uid}`, {
        method: 'PUT',
        body: formData
    })
    .then(res => res.json())
    .then(data => {

        if(data.msg){
            Swal.fire(
                'Error al actualizar imagen',
                'Selecciona un archivo para subir',
                'error'
            )
        }

        user.img = data.img;
        localStorage.setItem('user', JSON.stringify(user));

        window.location.reload();

        return true;
    })
}

const protegerDocumento = (token = '', file = '') => {

    const formData = new FormData();
    formData.append('archivo', file);

    const myHeader = new Headers({
        'x-token' : token
    });

    fetch(`${api.protect}`, {
        method: 'POST',
        headers: myHeader,
        mode: 'cors',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        return data;
    })
}





module.exports = {
    actualizarImagen,
    updatePassword,
    registrarUsuario,
    protegerDocumento,
    mostrarImagen,
}