let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;

  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoElement = document.getElementById("carrito");
  const totalElement = document.getElementById("total");

  carritoElement.innerHTML = "";
  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.innerText = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
    carritoElement.appendChild(li);
  });

  totalElement.innerText = total.toFixed(2);
}
