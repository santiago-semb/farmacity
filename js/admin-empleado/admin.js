let Lista= JSON.parse(localStorage.getItem("tablaEmpleado")) || []

Listar()
Estadisticas()

function Guardar(){
    const empleado=document.getElementById("_txtEmpleado-farmacity")
    const legajo=document.getElementById("_txtLegajo-farmacity")
    const fecha=document.getElementById("_txtFecha-farmacity")
    const turno=document.getElementById("_txtTurno-farmacity")
    const asistencia=document.getElementById("_txtAsistencia-farmacity")


    if(empleado.value == "" || isNaN(parseInt(legajo.value)) || fecha.value == "" || turno.value == "" || asistencia.value == ""){
        if(empleado.value == ""){resaltarInput('_txtEmpleado-farmacity', 'red')}else{resaltarInput('_txtEmpleado-farmacity', 'none')}
        if(isNaN(parseInt(legajo.value))){resaltarInput('_txtLegajo-farmacity', 'red')}else{resaltarInput('_txtLegajo-farmacity', 'none')}
        if(fecha.value == ""){resaltarInput('_txtFecha-farmacity', 'red')}else{resaltarInput('_txtFecha-farmacity', 'none')}
        if(turno.value == ""){resaltarInput('_txtTurno-farmacity', 'red')}else{resaltarInput('_txtTurno-farmacity', 'none')}
        if(asistencia.value == ""){resaltarInput('_txtAsistencia-farmacity', 'red')}else{resaltarInput('_txtAsistencia-farmacity', 'none')}

    }else{
        let objeto={
            Empleado:empleado.value,
            Legajo:legajo.value,
            Fecha:fecha.value,
            Turno:turno.value,
            Asistencia: asistencia.value 
        }
        resaltarInput('_txtEmpleado-farmacity', 'none')
        resaltarInput('_txtLegajo-farmacity', 'none')
        resaltarInput('_txtFecha-farmacity', 'none')
    
        Lista.push(objeto)
        localStorage.removeItem("tablaEmpleado")
        localStorage.setItem("tablaEmpleado", JSON.stringify(Lista))
        empleado.value=""
        legajo.value=""
        fecha.value=""
        empleado.focus()
        Listar()
        Estadisticas()
    }

}

function Listar(){
    const divNoProducts = document.getElementById("alert-noProducts")
    if(Lista.length===0){
        divNoProducts.innerHTML = `
        <div id="alert" class="alertpr"> 
        <i class="fa-solid fa-person-falling-burst"></i> No hay empleados disponibles
        </div>
        `
    }else{ 
        divNoProducts.innerHTML = ""
        const _tabla=document.getElementById("container-tabla")
        _tabla.innerHTML=`
        <table id="product-table" class="table table-striped">
        <thead>
        <tr>
            <th>Empleado</th>
            <th>N° Legajo</th>
            <th>Fecha</th>
            <th>Turno</th>
            <th>Asistencia</th>
            <th></th>
        </tr>
        </thead>
        <tbody id="admin-tabla-empleados-farmacity"></tbody>
        </table>`

    const _tbody=document.getElementById("admin-tabla-empleados-farmacity")
    _tbody.innerHTML=""
        for(i=0;i<Lista.length;i++){
            let asistencia = (Lista[i].Asistencia == "Asistio") ? `<i class="fa-regular fa-circle-check" style='font-size: 30px; color: green'></i>` : `<i class="fa-regular fa-circle-xmark" style='font-size: 30px; color: red'></i>`
            _tbody.innerHTML+=`
            <tr>
                <td>${Lista[i].Empleado}</td>
                <td>${Lista[i].Legajo}</td>
                <td>${Lista[i].Fecha}</td>
                <td>${Lista[i].Turno}</td>
                <td>${asistencia}</td>
                <td><a class='btn-delete-empleado' name='${Lista[i].Legajo}'><i class="fa-regular fa-trash-can"></i></a></td>
            </tr>
            `
        }
        let botones = document.querySelectorAll(".btn-delete-empleado")
        
        botones.forEach(boton => {
            boton.addEventListener("click", () => {
                let legajoFiltro = boton.getAttribute('name');
                let empleado = Lista.find(((e) => e.Legajo == legajoFiltro))
                let indexOfEmpleado = Lista.indexOf(empleado)
                Lista.splice(indexOfEmpleado, 1)
                localStorage.setItem("tablaEmpleado", JSON.stringify(Lista))
                window.location.reload()
            })
        })
        
    }
}

function Estadisticas(){

    if(Lista.length===0){
        
    }else{ 
        
const _pEstadisticas=document.getElementById("container-estadisticas")


acumEmpleado=0
acumTurnoTm=0
acumTurnoTt=0                 
acumTurnoTn=0                 
mayEmpleadoPresente=0                 
acumAsistio=0                 
acumNoAsistio=0                 
MayEmpleadoAusente=0                 
indMayP=0                 
indMayA=0                 
menAusente=Number.MAX_SAFE_INTEGER;                 
menPresemte=Number.MAX_SAFE_INTEGER;                 
indMenA=0                 
indMenP=0                 
turno=""
tm=document.getElementById("dia").value         
tn=document.getElementById("tarde").value                 
tt=document.getElementById("noche").value                 
asistio=document.getElementById("si").value                 
noAsistio=document.getElementById("no").value                 
totalNoASISTIO=0
totalAsistio=0
promedio=100

Lista.forEach(empleado => {


    acumEmpleado+=1
    //ACUM TURNOS
    if(empleado.Turno==tm){
        tm=empleado.Turno
        acumTurnoTm+=1
        
    }
    if(empleado.Turno==tt){
        tt=empleado.Turno
        acumTurnoTt+=1
        
    }
    if(empleado.Turno==tn){
        tn=empleado.Turno
        acumTurnoTn+=1        
    }
    //Acum asistencia 
    if(empleado.Asistencia==asistio){
        asistio=empleado.Asistencia
        acumAsistio+=1        
    }
    if(empleado.Asistencia==noAsistio){
        noAsistio=empleado.Asistencia
        acumNoAsistio+=1        
    }
    totalNoASISTIO= (acumNoAsistio/acumEmpleado)*promedio
    totalAsistio= (acumAsistio/acumEmpleado)*promedio
             
    
    

});

_pEstadisticas.innerHTML=` 
<div id="container-estadisticas2">
    
  
<p id="pEstadisticas">
Total de empleado: <b>${acumEmpleado}</b> <br>
Total de empleados del turno ${tm}: <b>${acumTurnoTm}</b> <br>
Total de empleados del turno ${tt}: <b>${acumTurnoTt}</b> <br>
Total de empleados del turno ${tn}: <b>${acumTurnoTn}</b> <br>
Porcentaje de empleados que NO asistieron: <b>${totalNoASISTIO.toFixed(2)}%</b> <br>
Porcentaje de empleados que SI asistieron: <b>${totalAsistio.toFixed(2)}%</b> <br>
</p>
</div>
`
}
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
