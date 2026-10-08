//VALIDA EL INICIO DE SESIÓN
//comprueba q el email sea uno de los usuarios permitidos
// y que la contraseña sea correcta
const validarFormularioIniciarSesion = () => {
    let email = document.getElementById("emailIniciarSesion").value;
    let password = document.getElementById("passwordIniciarSesion").value;

    //solo pueden acceder los dos adms
    if (email !== "flor@email.com" && email !== "anto@email.com") {
        alert("Los emails no coinciden");
        return;
    }

    //valida q la contra sea correcta
    if (password !== "123") {
        alert("PASSWORD INCORRECTO");
        return;
    }
    //si todo está ok, ir al catálogo
    window.location.href = "./editarCatalogo.html"
}


//VALIDA EL FORM DE REGISTRO
//Controla mail,DNI y confirmacion de contraseña
const validarFormularioRegistrarse = () => {

    //obtiene los datos ingresados
    let email = document.getElementById("emailRegistrarse").value;
    let dni = String(document.getElementById("dniRegistrarse").value);
    let password = document.getElementById("passwordRegistrarse").value;
    let passwordC = document.getElementById("passwordRegistrarseConfirmacion").value;

        //verifica q el mail no esté ya registrado
    if (email == "flor@email.com" || email == "anto@email.com") {
        alert("Email ya registrado");
        return;
    }

    //valida q el dni tenga 8 nros
    if (dni.length !== 8) {
        alert("DNI no valido");
        return;
    }

        //verifica q las dos contras no coincidan
    if (password !== passwordC) {
        alert("Ingrerse de nuevo las passwords");
        return;
    }

    //si todo ok, ir a la compra
    window.location.href = "./comprarTicket.html"
}