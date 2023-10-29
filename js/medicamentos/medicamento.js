let medicamentos = JSON.parse(localStorage.getItem("medicamentos")) || []

if(window.location.pathname == "/medicamentos.html") ListarMedicamentos()
if(window.location.pathname == "/ADMIN-medicamentos.html") ListarMedicamentosAdmin()

function CargarMedicamento(){
  let nombreProducto = document.getElementById("productName")
  let descripcionProducto = document.getElementById("productDescription")
  let precioProducto = document.getElementById("productPrice")
  let imgProducto = document.getElementById("productImage")

  let objMedicamento = {
    nombre: nombreProducto.value,
    descripcion: descripcionProducto.value,
    precio: parseInt(precioProducto.value),
    img: imgProducto.value
  }

  medicamentos.push(objMedicamento)

  let jsonMedicamentos = JSON.stringify(medicamentos)
  localStorage.setItem("medicamentos", jsonMedicamentos)
}

function ListarMedicamentos(){
    if(medicamentos.length == 0){
        const divNoMedicamentos = document.getElementById("alert-noMedicamentos")
        divNoMedicamentos.innerHTML = `
            <div id="alert" class="alertpr"> 
                Aun no hay medicamentos !! 
            </div>
        `
    }else{
        const cardContainer = document.getElementById("card-container")
        for(let i=0; i<medicamentos.length; i++){
            cardContainer.innerHTML += `
                <div class="card">
                <div class="card-img">
                <img id="productImg" src="${medicamentos[i].img}" alt="Producto">
                </div>
                <div class="card-content">
                <h2 class="card-title"><span id="productName">${medicamentos[i].nombre}</span></h2>
                <p class="card-description" id="productDescription">${medicamentos[i].descripcion}</p>
                <p>$ <span class="card-price"><span id="productPrice">${medicamentos[i].precio}</span></span></p>
                <button
                    id="boton-add-to-cart"
                    class="btn"
                    style="background-color: rgb(236, 90, 36); color: white;">
                    Comprar
                </button>
                </div>
            `
        }
    }
}

// carrito

let cart = JSON.parse(localStorage.getItem("carrito")) || [];

if(!window.location.pathname.includes("ADMIN")){
    let botonesCart = document.querySelectorAll(".btn");
    botonesCart.forEach(boton => {
    boton.addEventListener("click", (event) => {
        let card = event.target.closest(".card");
        let productName = card.querySelector(".card-title").textContent;
        let productPrice = parseInt(card.querySelector(".card-price").textContent);
        let productImg = card.querySelector(".card-img img").src;
        addToCart(productName, productPrice, productImg);
    });
    });
}

function addToCart(nombre, precio, img) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let limiteCaracteres = 10;
    if (nombre.length > limiteCaracteres) {
        nombre = nombre.substring(0, limiteCaracteres) + "...";
    }
    cart.push({
        name: nombre,
        price: precio,
        img: img
    });

    localStorage.setItem("cart", JSON.stringify(cart));
}


function eliminarProducto(nombre) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let index = cart.findIndex(product => product.name === nombre);
  if (index !== -1) {
      cart.splice(index, 1);
      console.log(`Producto con nombre ${nombre} eliminado.`);
      // Eliminar el elemento del carrito del DOM
      let cartItems = document.getElementById("cart-items");
      let elementos = cartItems.getElementsByTagName("span");
      let elementosAEliminar = [];
      for (let i = 0; i < elementos.length; i++) {
          if (elementos[i].textContent === nombre) {
              elementosAEliminar.push(elementos[i]);
          }
      }
      elementosAEliminar.forEach(elemento => {
          elemento.parentNode.removeChild(elemento);
      });
      // Actualizar el precio total del carrito
      let bPrecioTotalCarrito = document.getElementById("precio-total-carrito");
      let totalPrecios = 0;
      cart.forEach(item => {
          totalPrecios += item.price;
      });
      bPrecioTotalCarrito.innerHTML = `$${totalPrecios.toFixed(2)}`;
      // Actualizar el localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
  } else {
      console.log(`Producto con nombre ${nombre} no encontrado en el carrito.`);
  }
}



function openCart() {
    let modal = document.getElementById("cart-modal");
    let cartItems = document.getElementById("cart-items");
    let modalContent = document.getElementById("modal-content");

    // Vacía el contenido anterior para evitar duplicados
    cartItems.innerHTML = '';

    let totalPrecios = 0;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => {
        let itemContainer = document.createElement("div");
        itemContainer.style.marginTop = "30px";
        itemContainer.style.marginBottom = "30px";
        itemContainer.classList.add("cart-item");

        let spanTexto = document.createElement("span");
        spanTexto.textContent = item.name;
        let spanPrecio = document.createElement("span");
        spanPrecio.textContent = `$${item.price.toFixed(2)}`;

        let imgProducto = document.createElement("img");
        imgProducto.style.width = "60px";
        imgProducto.style.height = "60px";
        imgProducto.src = item.img;

        let botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        botonEliminar.className = "btn btn-danger";
        botonEliminar.style.position = "absolute";
        botonEliminar.style.right = "0";
        botonEliminar.style.marginRight = "20px";
        botonEliminar.style.marginTop = "10px";

        botonEliminar.addEventListener("click", () => {
            eliminarProducto(item.name);
            // Elimina el contenedor completo del item del carrito
            itemContainer.remove();
            // Actualiza el precio total del carrito
            totalPrecios -= item.price;
            bPrecioTotalCarrito.textContent = `$${totalPrecios.toFixed(2)}`;
        });

        totalPrecios += item.price;

        itemContainer.appendChild(imgProducto);
        itemContainer.appendChild(spanTexto);
        itemContainer.appendChild(spanPrecio);
        itemContainer.appendChild(botonEliminar);
        cartItems.appendChild(itemContainer);
    });

    let bPrecioTotalCarrito = document.getElementById("precio-total-carrito");
    bPrecioTotalCarrito.textContent = `$${totalPrecios.toFixed(2)}`;

    modal.style.display = "block";
    modalContent.style.maxHeight = (window.innerHeight * 0.7) + "px";
}



function closeCart() {
  let modal = document.getElementById("cart-modal");
  let modalContent = document.getElementById("modal-content");
  modal.style.display = "none";
  modalContent.style.maxHeight = "70%";
}

function ListarMedicamentosAdmin(){
    if(medicamentos.length == 0){
        const divNoProducts = document.getElementById("alert-noProducts")
        divNoProducts.innerHTML = `
            <div id="alert" class="alertpr"> 
                Aun no hay medicamentos !! 
            </div>
        `
    }else{
        const tbodyAdminTable = document.getElementById("admin-tabla-medicamentos")
        for(let i=0; i<medicamentos.length; i++){
            tbodyAdminTable.innerHTML += `
            <tr>
                <td id="product-name1">${medicamentos[i].nombre}</td>
                <td id="product-description1">${medicamentos[i].descripcion}</td>
                <td id="product-price1">$${medicamentos[i].precio}</td>
                <td><img src="${medicamentos[i].img}" alt="Imagen del producto 1" id="product-image1"></td>
                <td>
                    <a href='../../ADMIN-gestion-medicamentos.html?nombre=${medicamentos[i].nombre}'><button class='btn btn-info'><i class="fa-solid fa-pen-to-square"></i></button></a>
                </td>
            </tr>
            `
        }
    }
    
}

function EliminarMedicamentoAdmin(nombre) {
    let index = medicamentos.findIndex((e) => e.nombre === nombre);

    if (index !== -1) {
        medicamentos.splice(index, 1)
        localStorage.setItem("medicamentos", JSON.stringify(medicamentos));
    }
    window.location.href = "../../ADMIN-medicamentos.html"
}

function ListarByNombre(nombre){
    const tbody = document.getElementById("admin-tabla-medicamentos")
    let medicamento = medicamentos.find(((e) => e.nombre == nombre))
    tbody.innerHTML = `
    <tr>
        <td>${medicamento.nombre}</td>
        <td>${medicamento.descripcion}</td>
        <td>${medicamento.precio}</td>
        <td><img class="icons-check-and-fail" src="${medicamento.img}" alt=""></td>
        <td><button class='btn btn-warning'><i class="fa-solid fa-pen"></i></button></td>
    </tr>
    `
}