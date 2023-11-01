// carrito

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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