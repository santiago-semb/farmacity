let productos = JSON.parse(localStorage.getItem("productos")) || []

if(window.location.pathname == "/productos.html") ListarProductos()
if(window.location.pathname == "/ADMIN-productos.html") ListarProductosAdmin()
if(window.location.pathname == "/ADMIN-editar-producto.html") MostrarEditarProductoAdmin()

if(window.location.pathname == "/ADMIN-editar-producto.html"){
    let botonEditar = document.getElementById("btn-edit")
    botonEditar.addEventListener("click", (e) => {
        e.preventDefault()
        const nombreUrlData = ObtenerParamBy('nombre')
        let producto = productos.find(((e) => e.nombre == nombreUrlData))
            producto.nombre = document.getElementById("nombreEdit").value
            producto.descripcion = document.getElementById("descripcionEdit").value
            producto.precio = parseInt(document.getElementById("precioEdit").value)
            producto.img = document.getElementById("imagenEdit").value
        localStorage.setItem('productos', JSON.stringify(productos))
        window.location.href = "../../ADMIN-productos.html"
    })
}

function CargarProducto(){
  let nombreProducto = document.getElementById("productName")
  let descripcionProducto = document.getElementById("productDescription")
  let precioProducto = document.getElementById("productPrice")
  let imgProducto = document.getElementById("productImage")

  if(nombreProducto.value == "" || descripcionProducto.value == "" || isNaN(parseInt(precioProducto.value)) || imgProducto.value == ""){

        if(nombreProducto.value == ""){resaltarInput('productName', 'red')}else{resaltarInput('productName', 'none')}
        if(descripcionProducto.value == ""){resaltarInput('productDescription', 'red')}else{resaltarInput('productDescription', 'none')}
        if(isNaN(parseInt(precioProducto.value))){resaltarInput('productPrice', 'red')}else{resaltarInput('productPrice', 'none')}
        if(imgProducto.value == ""){resaltarInput('productImage', 'red')}else{resaltarInput('productImage', 'none')}

  }else{

    let objProducto = {
        nombre: nombreProducto.value,
        descripcion: descripcionProducto.value,
        precio: parseInt(precioProducto.value),
        img: imgProducto.value
      }
    
      productos.push(objProducto)
    
      let jsonProductos = JSON.stringify(productos)
      localStorage.setItem("productos", jsonProductos)

      window.location.reload()
  }
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
            itemContainer.style.marginTop = "10px";
            itemContainer.style.marginBottom = "30px";
            itemContainer.classList.add("cart-item");

        let pNoItems = document.createElement("span")
        pNoItems.textContent = `El carrito esta vacío...`
        pNoItems.style.fontSize = "25px"
        pNoItems.style.marginLeft = "20px"

        pNoItems.style.fontWeight = "bold"

        itemContainer.appendChild(pNoItems)
        cartItems.appendChild(itemContainer);
    }else{
        cart.forEach(item => {
            let itemContainer = document.createElement("div");
            itemContainer.style.marginTop = "10px";
            itemContainer.style.marginBottom = "30px";
            itemContainer.classList.add("cart-item");
    
            let spanTexto = document.createElement("span");
            spanTexto.textContent = item.name;
            let spanPrecio = document.createElement("span");
            spanPrecio.textContent = `$${item.price.toFixed(2)}`;

            spanTexto.id = "textoCarrito"
            spanPrecio.id = "precioCarrito"
    
            spanTexto.style.marginLeft = "5px"
            spanTexto.style.marginRight = "5px"
            spanTexto.style.textTransform = "capitalize"
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
            <table id="product-table" class="table table-striped">
                <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>  
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
                <td><img style='height: 60px; width: 50px' src="${productos[i].img}" alt="Imagen del producto 1"></td>
                <td>${productos[i].nombre}</td>
                <td>${productos[i].descripcion}</td>
                <td>$ ${productos[i].precio}</td>
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
    const h2Titulo = document.getElementById("titulo-producto")
    let producto = productos.find(((e) => e.nombre == nombre))
    h2Titulo.innerHTML = producto.nombre
    tbody.innerHTML = `
    <tr>
        <td><img class="icons-check-and-fail" src="${producto.img}" alt=""></td>
        <td>${producto.nombre}</td>
        <td>${producto.descripcion}</td>
        <td>$ ${producto.precio}</td>     
        <td>
            <a href='../../ADMIN-editar-producto.html?nombre=${producto.nombre}'><button class='btn btn-warning'><i class="fa-solid fa-pen"></i></button></a>
        </td>
    </tr>
    `
}

function MostrarEditarProductoAdmin(){
    const nombreUrlData = ObtenerParamBy('nombre')
    let producto = productos.find(((e) => e.nombre == nombreUrlData))
    const main = document.getElementById("mainEditarProducto")
    main.innerHTML = `
    
        <div class="form-container">
        <form>
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombreEdit" name="nombre" value='${producto.nombre}' required autocomplete="off">
            </div>
            <div class="form-group">
                <label for="descripcion">Descripción</label>
                <textarea id="descripcionEdit" name="descripcion" required autocomplete="off">${producto.descripcion}</textarea>
            </div>
            <div class="form-group">
                <label for="precio">Precio</label>
                <input type="number" id="precioEdit" name="precio" value='${producto.precio}' required autocomplete="off">
            </div>
            <div class="form-group">
                <label for="imagen">Imagen</label>
                <input type="text" id="imagenEdit" name="imagen" value='${producto.img}' required autocomplete="off">
            </div>
            <div class="form-group" style="text-align: center;">
                <input type="submit" value="Actualizar" id='btn-edit'>
            </div>
        </form>
        </div>

    `
}

function ObtenerParamBy(clave){
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    // Obtener el valor del parámetro 'id'
    const data = urlParams.get(clave);
    return data
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