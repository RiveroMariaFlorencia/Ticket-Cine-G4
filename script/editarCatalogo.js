const agregar = () => {
    alert("Realizado con exito");
};


const confirmacion = () => {
    // 1. Buscamos todos los checkboxes que el usuario marcó dentro de la lista
    const checkboxesMarcados = document.querySelectorAll('.listaPeliculas input[type="checkbox"]:checked');

    // 2. Si no seleccionó ninguna película, le avisamos
    if (checkboxesMarcados.length === 0) {
        alert("Por favor, seleccione al menos una película para eliminar.");
        return;
    }

    // 3. Recorremos cada checkbox marcado y lo eliminamos junto a su texto
    checkboxesMarcados.forEach(checkbox => {
        // .closest('.opcion_pelicula') busca la etiqueta <label> que envuelve a ese checkbox
        const labelContenedor = checkbox.closest('.opcionPelicula');

        // Eliminamos por completo el label (el checkbox y el nombre de la película)
        labelContenedor.remove();
    });
    alert("Se ha eliminado correctamente");
};