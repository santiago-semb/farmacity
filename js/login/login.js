document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Aquí debes agregar la lógica de verificación de usuario y contraseña
    // Este es solo un ejemplo básico
    if (username === "profesistemas" && password === "undiezporfa") {
        window.location.href = "../../ADMIN-inicio.html"
    } else {
      alert("Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
 });
  