//STEPPER
//Guarda en q paso estamos (empieza en 1: seleccion de pelicula)
let pasoActual = 1;

//almacena los horarios disponibles para cada película y cada día
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

    coraline: {
        hoy: ["15:30", "18:30", "21:30"],
        manana: ["16:30", "19:30", "22:30"],
        viernes: ["17:30", "20:30", "23:00"]
    }

};
//controla la navegación del stepper
////recibe el paso al que queremos ir
// oculta el contenido anterior, muestra el nuevo
//y actualiza visualmente los pasos como activo, completado o pendiente

function mostrarPaso(numeroPaso) {

    // 1. oculta el contenido del paso actual
    //Busca por id, ej "paso1", y le saca la clase "activo"
    document.getElementById("paso" + pasoActual).classList.remove("activo");

    // 2. mostrar el contenido del nuevo paso
    // ej: si numeroPaso vale 2, busca "paso2" y le agrega "activo"
    document.getElementById("paso" + numeroPaso).classList.add("activo");

    // 3. actualiza la parte visual del stepper
    // busca todos los elementos que tengan la clase "paso" dentro del stepper
    let pasosStepper = document.querySelectorAll(".stepper .paso");

    // recorre los pasos uno por uno y decide segun la posicion
    pasosStepper.forEach((paso, indice) => {

        //dentro de cada paso buscamos su círculo
        let circulo = paso.querySelector(".circulo");

        
        //PASOS ANTERIORES: se consideran completados y el nro se cambia por tilde
        if (indice + 1 < numeroPaso) {
            paso.classList.remove("activo");
            paso.classList.add("completado");
            circulo.textContent = "✓";
        }

        //PASO ACTUAL: se marca como activo
        else if (indice + 1 === numeroPaso) {
            paso.classList.add("activo");
            paso.classList.remove("completado");
            circulo.textContent = indice + 1;
        }

        //PASOS SIGUIENTES: todavía no están activos ni completados
        else {
            paso.classList.remove("activo");
            paso.classList.remove("completado");
            circulo.textContent = indice + 1;
        }
    });
     // 4. Si llegamos al paso 5, armamos el resumen de compra
if (numeroPaso === 5) {

    //buscamos en el html las opciones que eligió el usuario
    let pelicula = document.getElementById("pelicula");
    let dia = document.getElementById("dia");
    let horario = document.getElementById("horario");

    let general = document.getElementById("general");
    let menor = document.getElementById("menor");
    let jubilado = document.getElementById("jubilado");

    //mostramos en el resumen el TEXTO de la opc seleccionada
    document.getElementById("resumenPelicula").textContent =
        pelicula.options[pelicula.selectedIndex].text;

    document.getElementById("resumenDia").textContent =
        dia.options[dia.selectedIndex].text;

    document.getElementById("resumenHorario").textContent =
        horario.options[horario.selectedIndex].text;
    
    //mostramos las cantidades de entradas seleccionadas
    document.getElementById("resumenGeneral").textContent = general.value;
    document.getElementById("resumenMenor").textContent = menor.value;
    document.getElementById("resumenJubilado").textContent = jubilado.value;

    //calculamos nuevamente el total y lo mostramos en el resumen
    let total = calcularTotal();

    document.getElementById("resumenTotal").textContent =
        "$" + total.toLocaleString("es-AR");

}   

//5. Al entrar al paso 2, cargamos los horarios disponibles
if (numeroPaso === 2) {
    actualizarHorarios();
}

//6. Guardamos cuál es ahora el paso actual
//permite saber qué paso hay que ocultar la prox vez
pasoActual = numeroPaso;

}

//CALCULA EL PRECIO TOTAL DE LAS ENTRADAS
//toma las cantidades elegidas, las multiplica por su precio
// y actualiza el total mostrado en pantalla.
function calcularTotal() {

    //1.Obtener las cantidades seleccionadas
    //buscamos cada select por su id y tomamos su valor
    //parseInt convierte ese valor a nro
    let general = parseInt(document.getElementById("general").value);
    let menor = parseInt(document.getElementById("menor").value);
    let jubilado = parseInt(document.getElementById("jubilado").value);

    //2.Definir el precio de cada tipo de entrada
    let precioGeneral = 12000;
    let precioMenor = 8000;
    let precioJubilado = 9000;

    //3. Cálculo del total
    let total =
        (general * precioGeneral) +
        (menor * precioMenor) +
        (jubilado * precioJubilado);

    //4.Mostrar el total en el html
    //busca el span con id="totalEntradas" y reemplaza su contenido
    document.getElementById("totalEntradas").textContent =
        "$" + total.toLocaleString("es-AR");

    return total;
}

//ACTUALIZA LOS HORARIOS DISPONIBLES
//Toma la pelicula y el dia seleccionados
// busca los horarios correspondientes en "programacion"
//y los carga dentro del select de horarios
function actualizarHorarios() {

    //1.Obtener la pelicula y el día seleccionados
    let pelicula = document.getElementById("pelicula").value;
    let dia = document.getElementById("dia").value;

    //guardamos el select donde se van a mostrar los horarios
    let selectHorario = document.getElementById("horario");

    //2. Buscar los horarios correspondientes
    // accedemos al objeto programación usando película y día
    let horariosDisponibles = programacion[pelicula][dia];

    //3. Borrar los horarios anteriores, así no se mezcan con los nuevos
    selectHorario.innerHTML = "";

    //4. Recorrer todos los horarios disponibles
    horariosDisponibles.forEach(function(hora) {

        //creamos una nueva opción para el select
        let opcion = document.createElement("option");

        //le asignamos el horario como valor y como texto visible
        opcion.value = hora;
        opcion.textContent = hora;

        //agregamos la opción al select de horarios.
        selectHorario.appendChild(opcion);
    });
}


// ACTUALIZA LAS FECHAS QUE VE EL USUARIO.
// Toma la fecha actual, calcula mañana y el próximo viernes,
// y modifica el texto de las opciones del select de días.
function actualizarFechas() {

    // 1. OBTENER LA FECHA ACTUAL
    let hoy = new Date();


    // 2. CALCULAR LA FECHA DE MAÑANA
    // Copiamos la fecha de hoy y le sumamos un día.
    let manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);


    // 3. CALCULAR EL PRÓXIMO VIERNES
    let proximoViernes = new Date(hoy);

    // getDay() devuelve el día de la semana:
    // domingo = 0, lunes = 1, ..., viernes = 5.
    let diasHastaViernes = (5 - hoy.getDay() + 7) % 7;

    // Si el viernes sería hoy o mañana,
    // usamos el viernes de la semana siguiente para no repetir fechas.
    if (diasHastaViernes <= 1) {
        diasHastaViernes += 7;
    }

    proximoViernes.setDate(hoy.getDate() + diasHastaViernes);


    // 4. DEFINIR CÓMO QUEREMOS MOSTRAR LA FECHA
    // Solo mostramos día y mes.
    let formatoFecha = {
        day: "2-digit",
        month: "2-digit"
    };


    // 5. ACTUALIZAR EL TEXTO DE LAS OPCIONES DEL HTML
    document.getElementById("diaHoy").textContent =
        "Hoy · " + hoy.toLocaleDateString("es-AR", formatoFecha);

    document.getElementById("diaManana").textContent =
        "Mañana · " + manana.toLocaleDateString("es-AR", formatoFecha);

    document.getElementById("diaViernes").textContent =
        "Próximo viernes · " +
        proximoViernes.toLocaleDateString("es-AR", formatoFecha);
}



//VALIDA QUE EL USUARIO HAYA SELECCIONADO AL MENOS 1 ENTRADA
//Si no eligió ninguna, muestra un mensaje y no permite avanzar.
function validarEntradas() {

    //1. Obtener la cant de cada tipo de entrada
    //parseInt convierte los valores del select en nros
    let general = parseInt(document.getElementById("general").value);
    let menor = parseInt(document.getElementById("menor").value);
    let jubilado = parseInt(document.getElementById("jubilado").value);

    //2. Sumar la cant total de entradas
    let totalEntradas = general + menor + jubilado;


    //3. Validar
    //si la suma = 0 salta el mensaje
    if (totalEntradas === 0) {
        alert("Seleccioná al menos una entrada.");
        return false;
    }
    //4.Si hay al menos 1 entrada, la validación es correcta
    return true;
}

//VALIDA LOS DATOS DEL CLIENTE Y DE LA TARJETA
//si algún dato es incorrecto, muestra alerta y devuelve false
//si todo está ok, devuelve true
function validarPago() {

    //1.Obtener los datos ingresados
    //trim() elimina espacios al principio y al final
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let tarjeta = document.getElementById("tarjeta").value.trim();
    let titular = document.getElementById("titular").value.trim();
    let vencimiento = document.getElementById("vencimiento").value.trim();
    let cvv = document.getElementById("cvv").value.trim();


    //2.Validar q no haya campos vacíos
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


    //3.Validar formato email (algo@algo.algo)
    let formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email)) {
        alert("Ingresá un email válido.");
        return false;
    }


    //4.Validar q la tarjeta tenga 16 nros
    let formatoTarjeta = /^\d{16}$/;

    if (!formatoTarjeta.test(tarjeta)) {
        alert("El número de tarjeta debe tener 16 dígitos.");
        return false;
    }


    //5.Validar formato vto mm/aa
    let formatoVencimiento = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!formatoVencimiento.test(vencimiento)) {
        alert("Ingresá el vencimiento con formato MM/AA.");
        return false;
    }

    // 6.Validar q la tj no esté vcda
    //separamos mm y aa
    let partesVencimiento = vencimiento.split("/");

    let mesVencimiento = parseInt(partesVencimiento[0]);
    let anioVencimiento = parseInt("20" + partesVencimiento[1]);

    //obtenemos mes y año actuales
    let fechaActual = new Date();
    let mesActual = fechaActual.getMonth() + 1;
    let anioActual = fechaActual.getFullYear();
    
//si el año ya pasó, o es el mismo pero el mes ya pasó = tj vcda
if (
    anioVencimiento < anioActual ||
    (anioVencimiento === anioActual && mesVencimiento < mesActual)
) {
    alert("La tarjeta está vencida.");
    return false;
}

    // 7.Validar q el cvv tenga 3 nros
    let formatoCVV = /^\d{3}$/;

    if (!formatoCVV.test(cvv)) {
        alert("El CVV debe tener 3 dígitos.");
        return false;
    }

    //8. Si TODAS las validaciones pasaron, puede continuar :)
    return true;
}


//FINALIZA LA COMPRA
//toma los datos seleccionados por el usuario
//genera el mje de compra exitosa!
//y marca todos los pasos del stepper como completados
function finalizarCompra() {

    //1.Obtener los datos seleccionados
    let pelicula = document.getElementById("pelicula");
    let dia = document.getElementById("dia");
    let horario = document.getElementById("horario");

    //2. Calcular el totoal final
    let total = calcularTotal();


    //3. Reemplazar el contenido del paso 5
    //innerHTML genera contenido html desde js
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

    //4.Marca todo el stepper como completado!!!!
    completarStepper();
}


//MARCA TODOS LOS PASOS DEL STEPPER COMO COMPLETADOS
//se usa cuando la compra ya terminó
function completarStepper() {

    //1. Buscar todos los pasos del stepper
    let pasosStepper = document.querySelectorAll(".stepper .paso");


    //2.Recorrerlos uno por uno
    pasosStepper.forEach(function(paso) {

        //sacamos "activo" y agregamos "completado"
        paso.classList.remove("activo");
        paso.classList.add("completado");

        //3. Cambiar el nro del circulo por un tilde
        let circulo = paso.querySelector(".circulo");
        circulo.textContent = "✓";
    });
}

// DATOS RECIBIDOS DESDE horarios.html
//recibe los datos enviados desde horarios.html
//permite conservar la pelicula, el dia y el horario q el usuario ya eligio antes


//1. Leer los parámetros de la url
const parametros = new URLSearchParams(window.location.search);


//2.Obtener cada dato
const peliculaSeleccionada = parametros.get("pelicula");
const diaSeleccionado = parametros.get("dia");
const horarioSeleccionado = parametros.get("horario");


//3.Si llegaron los 3 datos, los cargamos en el select
if (peliculaSeleccionada && diaSeleccionado && horarioSeleccionado) {

    document.getElementById("pelicula").value = peliculaSeleccionada;

    document.getElementById("dia").value = diaSeleccionado;

    //cargamos primero los horarios correspondientes a esa peli y dia
    actualizarHorarios();


    //luego seleccionamos el horario recibido
    document.getElementById("horario").value = horarioSeleccionado;


    //como peli y horario ya fueron elegidos, llevamos al usuario al paso 3: entradas

    mostrarPaso(3);
}

//4. Actualizar las fechas al cargar la página
actualizarFechas();