let data =  JSON.parse(localStorage.getItem("data")) || []

if(window.location.pathname == "/ADMIN-vacunacion.html") Listar()

function Guardar(){
    let nombre = document.getElementById("nombre")
    let email = document.getElementById("email")
    let telefono = document.getElementById("telefono")
    let fecha = document.getElementById("fecha")
    let mensaje = document.getElementById("mensaje")

    let identificador = data.length > 0 ? data[data.length - 1].id + 1 : 1;

    let objTurno = {
        id: identificador,
        nombre: nombre.value,
        email: email.value,
        telefono: telefono.value,
        fecha: fecha.value,
        mensaje: mensaje.value,
        estado: false
    }

    objTurno.id += 1
    data.push(objTurno)

    VaciarCampos(nombre, email, telefono, fecha, mensaje)
    Focus(nombre)

    let jsonData = JSON.stringify(data)

    localStorage.setItem("data", jsonData)
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
        tabla.innerHTML = `
        <table>
        <thead>
        <tr>
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