const validarFormularioIniciarSesion = () => {
    let email = document.getElementById("emailIniciarSesion").value;
    let password = document.getElementById("passwordIniciarSesion").value;

    if (email !== "flor@email.com" && email !== "anto@email.com") {
        alert("Los emails no coinciden");
        return;
    }

    if (password !== "123") {
        alert("PASSWORD INCORRECTO");
        return;
    }

    window.location.href = "../editarCatalogo.html"
}

const validarFormularioRegistrarse = () => {
    let email = document.getElementById("emailRegistrarse").value;
    let dni = String(document.getElementById("dniRegistrarse").value);
    let password = document.getElementById("passwordRegistrarse").value;
    let passwordC = document.getElementById("passwordRegistrarseConfirmacion").value;

    if (email == "flor@email.com" || email == "anto@email.com") {
        alert("Email ya registrado");
        return;
    }

    if (dni.length !== 8) {
        alert("DNI no valido");
        return;
    }

    if (password !== passwordC) {
        alert("Ingrerse de nuevo las passwords");
        return;
    }

    window.location.href = "../comprarTicket.html"
}