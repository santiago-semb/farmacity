let fullData = []

// Poner un vector con los id de los inputs
let arrIdData = ["nombre","apellido","edad"]

// Ignorar
let boton = document.getElementById("guardar")
boton.addEventListener("click", () => {
    Guardar(arrIdData)
})

let datos = {}
// Pasarle el vector como argumento
function Guardar(arrIdDatos)
{ 
    for(let i=0; i<arrIdDatos.length; i++){
        let clave = `dato${i}`
        datos[clave] = document.getElementById(arrIdDatos[i]).value
    }
    console.log(datos)
    Mostrar("mostrar")
}

function Mostrar(idElemento){
    let e = document.getElementById(idElemento)
    for(let i=0; i<1; i++){
        e.innerHTML += "hgh"
    }
}