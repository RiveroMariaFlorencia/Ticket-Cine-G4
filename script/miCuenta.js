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


// VALIDA EL FORMULARIO DE REGISTRO
// Controla mail, DNI y confirmación de contraseña
const validarFormularioRegistrarse = () => {

    // Obtiene los datos ingresados
    let email = document.getElementById("emailRegistrarse").value;
    let dni = String(document.getElementById("dniRegistrarse").value);
    let password = document.getElementById("passwordRegistrarse").value;
    let passwordC = document.getElementById("passwordRegistrarseConfirmacion").value;

    // Verifica que el mail no esté ya registrado
    if (email == "flor@email.com" || email == "anto@email.com") {
        alert("Email ya registrado");
        return;
    }

    // Valida que el DNI tenga 8 números
    if (dni.length !== 8) {
        alert("DNI no valido");
        return;
    }

    // Verifica que las dos contraseñas coincidan
    if (password !== passwordC) {
        alert("Ingrese de nuevo las passwords");
        return;
    }

    // Recupera película, día y horario que vienen desde horarios.html
    const parametros = new URLSearchParams(window.location.search);

    // Extracción de los datos de la URL
    const pelicula = parametros.get('pelicula'); 
    const dia      = parametros.get('dia');      
    const horario  = parametros.get('horario');  

    // Si vino desde horarios, conserva esos datos
    if (pelicula && dia && horario) {

        window.location.href =`./comprarTicket.html?pelicula=${pelicula}&dia=${dia}&horario=${horario}`;

    } else {
        // Si entró directamente a Crear Cuenta
        window.location.href = "./comprarTicket.html";
    }
}