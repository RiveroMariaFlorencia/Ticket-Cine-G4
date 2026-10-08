// ACTUALIZA LAS FECHAS DE TODA LA CARTELERA.
// calcula hoy, mañana y prox viernes
//y actualiza esos textos para todas las pelis
function actualizarFechasHorarios() {

    // 1. Obtener la fecha actual
    let hoy = new Date();


    // 2. Calcular mañana
    let manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);


    // 3. Calcular próximo viernes
    let proximoViernes = new Date(hoy);

    let diasHastaViernes = (5 - hoy.getDay() + 7) % 7;

    // si el viernes sería hoy o maañana,
    //usamos el viernes de la semana sig
    if (diasHastaViernes <= 1) {
        diasHastaViernes += 7;
    }

    proximoViernes.setDate(hoy.getDate() + diasHastaViernes);


    //4.Definir formato de fecha DD/MM
    let formatoFecha = {
        day: "2-digit",
        month: "2-digit"
    };


    // 5. Actualizar todos los textos q representan "Hoy"
    document.querySelectorAll(".fecha-hoy").forEach(function(elemento) {
        elemento.textContent =
            "Hoy · " + hoy.toLocaleDateString("es-AR", formatoFecha);
    });


    //6. Actualizar todos los textos q representan "Mañana"
    document.querySelectorAll(".fecha-manana").forEach(function(elemento) {
        elemento.textContent =
            "Mañana · " + manana.toLocaleDateString("es-AR", formatoFecha);
    });


    //7. Actualizar todos los textos q representan "proximo viernes"
    document.querySelectorAll(".fecha-viernes").forEach(function(elemento) {
        elemento.textContent =
            "Próximo viernes · " +
            proximoViernes.toLocaleDateString("es-AR", formatoFecha);
    });
}


// 8. Ejecutar automáticamente cuando carga la página :)
actualizarFechasHorarios();