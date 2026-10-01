const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const password = document.getElementById("password").value;

    message.textContent = "Comprobando...";

    try {

        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: password
            })
        });

        const data = await response.json();

if (response.ok && data.success) {

    message.textContent = "Acceso correcto";

window.location.href = "/admin-panel.html";
} else {

            message.textContent = data.message || "Contraseña incorrecta";

        }

    } catch (error) {

        console.error(error);
        message.textContent = "Error de conexión con el servidor.";

    }

});
