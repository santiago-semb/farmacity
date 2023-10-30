let productos = JSON.parse(localStorage.getItem("productos")) || []

if(window.location.pathname == "/productos.html") ListarProductos()
if(window.location.pathname == "/ADMIN-productos.html") ListarProductosAdmin()

function CargarProducto(){
  let nombreProducto = document.getElementById("productName")
  let descripcionProducto = document.getElementById("productDescription")
  let precioProducto = document.getElementById("productPrice")
  let imgProducto = document.getElementById("productImage")

  let objProducto = {
    nombre: nombreProducto.value,
    descripcion: descripcionProducto.value,
    precio: parseInt(precioProducto.value),
    img: imgProducto.value
  }

  productos.push(objProducto)

  let jsonProductos = JSON.stringify(productos)
  localStorage.setItem("productos", jsonProductos)
}

function ListarProductos(){
    if(productos.length == 0){
        const divNoProducts = document.getElementById("alert-noProducts")
        divNoProducts.innerHTML = `
            <div id="alert" class="alertpr"> 
            <i class="fa-solid fa-cat"></i> No hay productos disponibles
            </div>
        `
    }else{
        const cardContainer = document.getElementById("card-container")
        for(let i=0; i<productos.length; i++){
            cardContainer.innerHTML += `
                <div class="card">
                <div class="card-img">
                <img id="productImg" src="${productos[i].img}" alt="Producto">
                </div>
                <div class="card-content">
                <h2 class="card-title"><span id="productName">${productos[i].nombre}</span></h2>
                <p class="card-description" id="productDescription">${productos[i].descripcion}</p>
                <p>$ <span class="card-price"><span id="productPrice">${productos[i].precio.toFixed(2)}</span></span></p>
                <button
                    id="boton-add-to-cart"
                    class="btn"
                    style="background-color: rgb(236, 90, 36); color: white;">
                    Agregar
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
        // Actualizar el localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        // Volver a renderizar el carrito
        openCart();
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
    
    if(cart.length == 0){
        let itemContainer = document.createElement("div");
            itemContainer.style.marginTop = "30px";
            itemContainer.style.marginBottom = "30px";
            itemContainer.classList.add("cart-item");

        let pNoItems = document.createElement("span")
        pNoItems.textContent = `El carrito esta vacío :(`
        pNoItems.style.fontSize = "17px"
        pNoItems.style.fontWeight = "bold"

        itemContainer.appendChild(pNoItems)
        cartItems.appendChild(itemContainer);
    }else{
        cart.forEach(item => {
            let itemContainer = document.createElement("div");
            itemContainer.style.marginTop = "30px";
            itemContainer.style.marginBottom = "30px";
            itemContainer.classList.add("cart-item");
    
            let spanTexto = document.createElement("span");
            spanTexto.textContent = item.name;
            let spanPrecio = document.createElement("span");
            spanPrecio.textContent = `$${item.price.toFixed(2)}`;
    
            spanTexto.style.marginLeft = "5px"
            spanTexto.style.marginRight = "5px"
            spanTexto.style.textTransform = "uppercase"
            spanTexto.style.fontSize = "18px"
    
            spanPrecio.style.fontWeight = "bold"
            spanPrecio.style.fontSize = "18px"
            spanPrecio.style.float = "right"
            spanPrecio.style.marginTop = "15px"
            spanPrecio.style.marginLeft = "10px"
    
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
    }

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


function ListarProductosAdmin(){
    if(productos.length == 0){
        const divNoProducts = document.getElementById("alert-noProducts")
        divNoProducts.innerHTML = `
        <div id="alert" class="alertpr"> 
            <i class="fa-solid fa-cat"></i> No hay productos disponibles
        </div>
        `
    }else{
        const divAdminTable = document.getElementById("container-table-admProductos")
        divAdminTable.innerHTML = `
            <h2>Productos</h2>
            <table id="product-table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                    <th><i class="fa-solid fa-screwdriver-wrench"></i></th>
                </tr>
            </thead>
            <tbody id="admin-tabla-productos"></tbody>
            </table>
        `
        const tbody = document.getElementById("admin-tabla-productos")
        for(let i=0; i<productos.length; i++){
            tbody.innerHTML += `
            
            <tr>
                <td id="product-name1">${productos[i].nombre}</td>
                <td id="product-description1">${productos[i].descripcion}</td>
                <td id="product-price1">$${productos[i].precio}</td>
                <td><img src="${productos[i].img}" alt="Imagen del producto 1"></td>
                <td>
                    <a href='../../ADMIN-gestion-productos.html?nombre=${productos[i].nombre}'><button class='btn btn-info'><i class="fa-solid fa-pen-to-square"></i></button></a>
                </td>
            </tr>
            
            `
        }
    }
    
}


function EliminarProductoAdmin(nombre) {
    let index = productos.findIndex((e) => e.nombre === nombre);

    if (index !== -1) {
        productos.splice(index, 1)
        localStorage.setItem("productos", JSON.stringify(productos));
    }
    window.location.href = "../../ADMIN-productos.html"
}

function ListarByNombre(nombre){
    const tbody = document.getElementById("admin-tabla-productos")
    let producto = productos.find(((e) => e.nombre == nombre))
    tbody.innerHTML = `
    <tr>
        <td>${producto.nombre}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.precio}</td>
        <td><img class="icons-check-and-fail" src="${producto.img}" alt=""></td>
        <td><button class='btn btn-warning'><i class="fa-solid fa-pen"></i></button></td>
    </tr>
    `
}