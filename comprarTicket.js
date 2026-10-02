let pasoActual = 1;

const programacion = {

    oppenheimer: {
        hoy: ["16:30", "19:00", "22:15"],
        manana: ["15:30", "18:30", "21:30"],
        viernes: ["17:00", "20:00", "23:00"]
    },

    barbie: {
        hoy: ["17:00", "20:00", "22:30"],
        manana: ["16:00", "19:00", "21:30"],
        viernes: ["15:30", "18:00", "20:30"]
    },

    avatar: {
        hoy: ["15:30", "18:30", "21:30"],
        manana: ["16:30", "19:30", "22:30"],
        viernes: ["17:30", "20:30", "23:00"]
    }

};

function mostrarPaso(numeroPaso) {

    // Ocultamos el paso actual
    document.getElementById("paso" + pasoActual).classList.remove("activo");

    // Mostramos el nuevo paso
    document.getElementById("paso" + numeroPaso).classList.add("activo");

    // Buscamos todos los pasos del stepper
    let pasosStepper = document.querySelectorAll(".stepper .paso");

    // Recorremos los pasos
    pasosStepper.forEach((paso, indice) => {

        let circulo = paso.querySelector(".circulo");

        // Paso ya completado
        if (indice + 1 < numeroPaso) {
            paso.classList.remove("activo");
            paso.classList.add("completado");
            circulo.textContent = "✓";
        }

        // Paso en el que estamos
        else if (indice + 1 === numeroPaso) {
            paso.classList.add("activo");
            paso.classList.remove("completado");
            circulo.textContent = indice + 1;
        }

        // Pasos que todavía no hicimos
        else {
            paso.classList.remove("activo");
            paso.classList.remove("completado");
            circulo.textContent = indice + 1;
        }
    });
     // Si llegamos al paso 5, completamos el resumen
if (numeroPaso === 5) {

    let pelicula = document.getElementById("pelicula");
    let dia = document.getElementById("dia");
    let horario = document.getElementById("horario");

    let general = document.getElementById("general");
    let menor = document.getElementById("menor");
    let jubilado = document.getElementById("jubilado");

    document.getElementById("resumenPelicula").textContent =
        pelicula.options[pelicula.selectedIndex].text;

    document.getElementById("resumenDia").textContent =
        dia.options[dia.selectedIndex].text;

    document.getElementById("resumenHorario").textContent =
        horario.options[horario.selectedIndex].text;
    
    document.getElementById("resumenGeneral").textContent = general.value;
    document.getElementById("resumenMenor").textContent = menor.value;
    document.getElementById("resumenJubilado").textContent = jubilado.value;

let total = calcularTotal();

document.getElementById("resumenTotal").textContent =
    "$" + total.toLocaleString("es-AR");

}   

if (numeroPaso === 2) {
    actualizarHorarios();
}

// Actualizamos el paso actual
pasoActual = numeroPaso;

}
function calcularTotal() {

    let general = parseInt(document.getElementById("general").value);
    let menor = parseInt(document.getElementById("menor").value);
    let jubilado = parseInt(document.getElementById("jubilado").value);

    let precioGeneral = 12000;
    let precioMenor = 8000;
    let precioJubilado = 9000;

    let total =
        (general * precioGeneral) +
        (menor * precioMenor) +
        (jubilado * precioJubilado);

    document.getElementById("totalEntradas").textContent =
        "$" + total.toLocaleString("es-AR");

    return total;
}
function actualizarHorarios() {

    let pelicula = document.getElementById("pelicula").value;
    let dia = document.getElementById("dia").value;
    let selectHorario = document.getElementById("horario");

    let horariosDisponibles = programacion[pelicula][dia];

    selectHorario.innerHTML = "";

    horariosDisponibles.forEach(function(hora) {

        let opcion = document.createElement("option");

        opcion.value = hora;
        opcion.textContent = hora;

        selectHorario.appendChild(opcion);
    });
}

function validarEntradas() {

    let general = parseInt(document.getElementById("general").value);
    let menor = parseInt(document.getElementById("menor").value);
    let jubilado = parseInt(document.getElementById("jubilado").value);

    let totalEntradas = general + menor + jubilado;

    if (totalEntradas === 0) {
        alert("Seleccioná al menos una entrada.");
        return false;
    }

    return true;
}


function validarPago() {

    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let tarjeta = document.getElementById("tarjeta").value.trim();
    let titular = document.getElementById("titular").value.trim();
    let vencimiento = document.getElementById("vencimiento").value.trim();
    let cvv = document.getElementById("cvv").value.trim();


    // VALIDAR CAMPOS VACÍOS

    if (
        nombre === "" ||
        email === "" ||
        tarjeta === "" ||
        titular === "" ||
        vencimiento === "" ||
        cvv === ""
    ) {
        alert("Completá todos los datos antes de continuar.");
        return false;
    }


    // VALIDAR EMAIL

    let formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email)) {
        alert("Ingresá un email válido.");
        return false;
    }


    // VALIDAR TARJETA

    let formatoTarjeta = /^\d{16}$/;

    if (!formatoTarjeta.test(tarjeta)) {
        alert("El número de tarjeta debe tener 16 dígitos.");
        return false;
    }


    // VALIDAR VENCIMIENTO MM/AA

    let formatoVencimiento = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!formatoVencimiento.test(vencimiento)) {
        alert("Ingresá el vencimiento con formato MM/AA.");
        return false;
    }

    // VALIDAR QUE LA TARJETA NO ESTÉ VENCIDA

    let partesVencimiento = vencimiento.split("/");

    let mesVencimiento = parseInt(partesVencimiento[0]);
    let anioVencimiento = parseInt("20" + partesVencimiento[1]);

    let fechaActual = new Date();

    let mesActual = fechaActual.getMonth() + 1;
    let anioActual = fechaActual.getFullYear();

if (
    anioVencimiento < anioActual ||
    (anioVencimiento === anioActual && mesVencimiento < mesActual)
) {
    alert("La tarjeta está vencida.");
    return false;
}

    // VALIDAR CVV

    let formatoCVV = /^\d{3}$/;

    if (!formatoCVV.test(cvv)) {
        alert("El CVV debe tener 3 dígitos.");
        return false;
    }


    return true;
}

function finalizarCompra() {

    let pelicula = document.getElementById("pelicula");
    let dia = document.getElementById("dia");
    let horario = document.getElementById("horario");

    let total = calcularTotal();

    document.getElementById("paso5").innerHTML = `
        <div class="compra-exitosa">

            <h2>✓ COMPRA REALIZADA CON ÉXITO</h2>

            <p>
                Película:
                ${pelicula.options[pelicula.selectedIndex].text}
            </p>

            <p>
                Día:
                ${dia.options[dia.selectedIndex].text}
            </p>

            <p>
                Horario:
                ${horario.options[horario.selectedIndex].text}
            </p>

            <p class="total">
                Total pagado:
                $${total.toLocaleString("es-AR")}
            </p>

            <p>¡Gracias por tu compra!</p>

        </div>
    `;

    completarStepper();
}

function completarStepper() {

    let pasosStepper = document.querySelectorAll(".stepper .paso");

    pasosStepper.forEach(function(paso) {

        paso.classList.remove("activo");
        paso.classList.add("completado");

        let circulo = paso.querySelector(".circulo");
        circulo.textContent = "✓";
    });
}

// DATOS RECIBIDOS DESDE horarios.html

const parametros = new URLSearchParams(window.location.search);

const peliculaSeleccionada = parametros.get("pelicula");
const diaSeleccionado = parametros.get("dia");
const horarioSeleccionado = parametros.get("horario");

if (peliculaSeleccionada && diaSeleccionado && horarioSeleccionado) {

    document.getElementById("pelicula").value = peliculaSeleccionada;

    document.getElementById("dia").value = diaSeleccionado;

    actualizarHorarios();

    document.getElementById("horario").value = horarioSeleccionado;

    mostrarPaso(3);
}