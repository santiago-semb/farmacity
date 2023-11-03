let data =  JSON.parse(localStorage.getItem("data")) || []

if(window.location.pathname == "/ADMIN-vacunacion.html") Listar()

function Guardar(){
    let nombre = document.getElementById("nombre")
    let email = document.getElementById("email")
    let telefono = document.getElementById("telefono")
    let fecha = document.getElementById("fecha")
    let mensaje = document.getElementById("mensaje")

    let identificador = data.length > 0 ? data[data.length - 1].id + 1 : 1;

    const alertaCamposObligatorios = document.getElementById("alertaCamposObligatorios")
    if(nombre.value == "" || email.value == "" || telefono.value == "" || fecha.value == ""){     
        alertaCamposObligatorios.innerHTML = `
        <div class="alert alert-danger" role="alert" style="width: 80%; margin: 0 auto; margin-top: 20px; text-align: center;">
            El formulario no puede estar vacío
        </div>
        `
    }else{
        let objTurno = {
            id: identificador,
            nombre: nombre.value,
            email: email.value,
            telefono: telefono.value,
            fecha: fecha.value,
            mensaje: mensaje.value,
            estado: false
        }
    
        data.push(objTurno)
    
        VaciarCampos(nombre, email, telefono, fecha, mensaje)
    
        let jsonData = JSON.stringify(data)
    
        localStorage.setItem("data", jsonData)
    
        alertaCamposObligatorios.innerHTML = `
            <div class="alert alert-success" role="alert" style="width: 80%; margin: 0 auto; margin-top: 20px; text-align: center;">
                <p>Se ha solicitado el turno correctamente.</p>
                <p>Su número de turno: <b style='font-size: 21px'>${objTurno.id}</b></p>
            </div>
        `
    }
}

function Listar(){
    const tabla = document.getElementById("tabla-vacunacion")
    if(data.length == 0){
        const divAlert = document.getElementById("alerta-nodata")
        divAlert.innerHTML = `
        <div class="alert alert-warning" style="width: 70%; margin: 0 auto; margin-top: 20px;" role="alert">
            <span style="font-size: 18px;">Aún no hay solicitudes</span>
        </div>
        `
    }else{
        const h3Titulo = document.getElementById("h3-vacunacion")
        h3Titulo.innerHTML = "Solicitudes Turnos Vacunación"
        tabla.innerHTML = `
        <table>
        <thead>
        <tr>
            <th>N°Turno</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Teléfono</th>
            <th>Fecha</th>
            <th>Mensaje</th>
            <th>Estado</th>
            <th><i class="fa-solid fa-pen-to-square"></i></th>
        </tr>
        </thead>
            <tbody id="tbody-vacunacion"></tbody>
        </table>
        `
        const tbody = document.getElementById("tbody-vacunacion")
        for(let i=0; i<data.length; i++){
            let icon = (data[i].estado) ? "./assets/icons/check-icon.png" : "./assets/icons/fail-icon.png"
            tbody.innerHTML += `
                <tr class='tr-data'>
                    <td>${data[i].id}</td>
                    <td>${data[i].nombre}</td>
                    <td>${data[i].email}</td>
                    <td>${data[i].telefono}</td>
                    <td>${data[i].fecha}</td>
                    <td>${data[i].mensaje}</td>
                    <td><img class="icons-check-and-fail" src="${icon}" alt="icon"></td>
                    <td><a href="../../ADMIN-gestion-vacunacion.html?id=${data[i].id}">Ver</a></td>
                </tr>
            `
        }
    }
}

function ConsultarTurno(nroTurno){
    const divInfoTurno = document.getElementById("infoNumeroTurno")
    let turno = data.find(((e) => e.id == nroTurno))
    const divAlertaTurno = document.getElementById("alertaTurno")
    if(isNaN(nroTurno)){
        divInfoTurno.innerHTML = ""
        divAlertaTurno.innerHTML = `
        <div class="alert alert-info" role="alert" style="width: 80%; margin: 0 auto; margin-top: 20px; text-align: center;">
            Por favor ingrese un número
        </div>
        `
    }else if(turno === "undefined" || turno === undefined){
        divInfoTurno.innerHTML = ""
        divAlertaTurno.innerHTML = `
        <div class="alert alert-danger" role="alert" style="width: 80%; margin: 0 auto; margin-top: 20px; text-align: center;">
            No se ha encontrado el número de turno: <b>${nroTurno}</b>
        </div>
        `
    }else{
        divAlertaTurno.innerHTML = ""
        imgEstadoTurno = (turno.estado) ? "../../assets/icons/check-icon.png" : "../../assets/icons/fail-icon.png"
        divInfoTurno.innerHTML = `
            <hr>
            <div class="card-turno">
            <div class="container-turno">
                <br>
                <h4><strong>Número de turno: </strong> ${turno.id}</h4>
                <hr>
                <h4><strong>Estado de turno: </strong> <img style='width: 35px; height: 35px' src='${imgEstadoTurno}'></h4>
                <hr>
                <h4><strong>Nombre completo: </strong> <span style='text-transform: capitalize'>${turno.nombre}</span></h4>
                <hr>
                <h4><strong>Email: </strong> ${turno.email}</h4>
                <hr>
                <h4><strong>Fecha: </strong> ${turno.fecha}</h4>
                <hr>
                <h4><strong>Mensaje: </strong> <span class='msg'>${turno.mensaje}</span></h4>
                <br>
            </div>
            </div>
        `
    }
}

function ListarById(paramId){
    const tbody = document.getElementById("tbody-tabla-gestion-vacunacion")
    let dato = data.find(((e) => e.id == paramId))
    let iconoEstado = (dato.estado) ? "../../assets/icons/check-icon.png" : "../../assets/icons/fail-icon.png"
    tbody.innerHTML = `
    <tr>
        <td>${dato.nombre}</td>
        <td>${dato.email}</td>
        <td>${dato.telefono}</td>
        <td>${dato.fecha}</td>
        <td>${dato.mensaje}</td>
        <td><img class="icons-check-and-fail" src="${iconoEstado}" alt=""></td>
    </tr>
    `
}

function AceptarTurno(paramId) {
    // Busca el índice del objeto que coincide con el id proporcionado
    let index = data.findIndex((e) => e.id === paramId);

    if (index !== -1) {
        // Actualiza el objeto encontrado
        data[index].estado = true;

        // Vuelve a convertir a JSON y actualiza en localStorage
        localStorage.setItem("data", JSON.stringify(data));
    }
    window.location.href = "../../ADMIN-vacunacion.html"
}

function RechazarTurno(paramId) {
    // Busca el índice del objeto que coincide con el id proporcionado
    let index = data.findIndex((e) => e.id === paramId);

    if (index !== -1) {
        // Elimina el objeto encontrado
        data.splice(index, 1)

        // Vuelve a convertir a JSON y actualiza en localStorage
        localStorage.setItem("data", JSON.stringify(data));
    }
    window.location.href = "../../ADMIN-vacunacion.html"
}

const VaciarCampos = (...campos) => {
    for(let i=0; i<campos.length; i++)
    {
        campos[i].value = ""
    }
}

const Focus = (elemento) => {
    elemento.focus()
} 

function GenerarID() {
    let timestamp = new Date().getTime(); // Marca de tiempo actual en milisegundos
    let random = Math.floor(Math.random() * 1000); // Número aleatorio entre 0 y 999
    let idPedido = timestamp + '-' + random; // ID de pedido combinando marca de tiempo y número aleatorio
    console.log(idPedido)
}

function resaltarInput(idElement, color) {
    let input = document.getElementById(idElement)
    //let label = input.previousElementSibling
    if(color == "none"){
        input.style.border = "1px solid #ddd"
    }else{
        input.style.border = `2px solid ${color}`;
    } 
}