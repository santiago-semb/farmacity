document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Aquí debes agregar la lógica de verificación de usuario y contraseña
    // Este es solo un ejemplo básico
    if (username === "profesistemas" && password === "undiezporfa") {
        window.location.href = "../../ADMIN-inicio.html"
    } else {
      const divErr = document.getElementById("credentialsErr")
      divErr.innerHTML = `
        <p style='color: red;'>Contraseña incorrecta.</p>
      `
    }
 });
  