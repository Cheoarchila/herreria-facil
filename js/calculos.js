function calcular() {

    const medidaFinal = Number(document.getElementById("medidaFinal").value);
    const canales = Number(document.getElementById("canales").value);
    const profundidad = Number(document.getElementById("profundidad").value);
    const bordes = Number(document.getElementById("bordes").value);
    const espesor = Number(document.getElementById("espesor").value);

    // 1. Matemáticas corregidas de taller:
    // El espacio real de los canales descuenta los dos bordes laterales
    const anchoCanal = (medidaFinal - (bordes * 2)) / canales;
    const altoCanal = profundidad;

    // Deducción exacta de material por cada pliegue a 90 grados
    const numeroDobleces = canales * 2;
    const deduccionDoblez = 1.67 * espesor; 
    
    // Desarrollo real de la lámina estirada en plano antes de doblar
    const desarrollo = medidaFinal + (numeroDobleces * profundidad) - (numeroDobleces * deduccionDoblez);
    
    // Mostramos los resultados redondeados tal como lo tenías pensado
    document.getElementById("anchoCanal").textContent = Math.round(anchoCanal);
    document.getElementById("altoCanal").textContent = Math.round(altoCanal);
    document.getElementById("desarrollo").textContent = Math.round(desarrollo);

    // 2. Ciclo de Marcas Acumulativo (Para medir de corrido con la regla)
    let marca = bordes;
    let listaMarcas = Math.round(marca) + "<br>";

    for (let i = 0; i < canales; i++) {
        // Marca donde empieza la bajada del canal
        marca += (profundidad - deduccionDoblez);
        listaMarcas += Math.round(marca) + "<br>";

        // Marca del fondo donde termina la bajada y empieza la base
        marca += anchoCanal;
        listaMarcas += Math.round(marca) + "<br>";

        // Marca donde termina la base y vuelve a subir
        marca += (profundidad - deduccionDoblez);
        listaMarcas += Math.round(marca) + "<br>";

        // Si faltan más canales, sumamos la distancia plana antes del siguiente doblez
        if (i < canales - 1) {
            marca += anchoCanal; 
            listaMarcas += Math.round(marca) + "<br>";
        }
    }

    document.getElementById("listaMarcas").innerHTML = listaMarcas;
}

// --- TUS FUNCIONES DE VALIDACIÓN (Mantenidas exactamente igual) ---

let ultimaProfundidad = 15;

function verificarCanales() {
    let canales = Number(document.getElementById("canales").value);
    canales = Math.floor(canales);
    document.getElementById("canales").value = canales;

    if (canales < 1) {
        document.getElementById("canales").value = 1;
        canales = 1;
    }

    if (canales === 1) {
        document.getElementById("profundidad").value = 0;
        document.getElementById("profundidad").disabled = true;
        document.getElementById("bordes").value = ultimoBordePositivo;
    } else {
        document.getElementById("profundidad").value = ultimaProfundidad;
        document.getElementById("profundidad").disabled = false;
        document.getElementById("bordes").value = ultimoBorde;
    }
}

function verificarMedidaFinal() {
    const campo = document.getElementById("medidaFinal");
    let valor = Number(campo.value);

    if (campo.value === "" || valor < 1) {
        alert("Debes ingresar una Medida final válida.");
        campo.value = ultimaMedidaFinal; // Nota: Asegúrate de tener declarada 'ultimaMedidaFinal = 1000;' arriba si usas esto
        return;
    }

    valor = Math.floor(valor);
    campo.value = valor;
}

function verificarProfundidad() {
    const profundidad = document.getElementById("profundidad").value;

    if (profundidad === "" || Number(profundidad) < 1) {
        alert("Debes ingresar una profundidad válida.");
        document.getElementById("profundidad").value = ultimaProfundidad;
        return;
    }
    ultimaProfundidad = Number(profundidad);
}

let ultimoBorde = 20;
let ultimoBordePositivo = 20;

function verificarBordes() {
    const campo = document.getElementById("bordes");
    const valor = campo.value;
    const canales = Number(document.getElementById("canales").value);

    if (valor === "") {
        campo.value = 0;
        if (canales > 1) {
            ultimoBorde = 0;
        }
        return;
    }

    const numero = Number(valor);

    if (!Number.isInteger(numero) || numero < 0) {
        alert("Debes ingresar un valor de bordes válido.");
        campo.value = ultimoBorde;
        return;
    }

    ultimoBorde = numero;

    if (numero > 0) {
        ultimoBordePositivo = numero;
    }

    if (canales === 1 && numero === 0) {
        campo.value = ultimoBordePositivo;
        ultimoBorde = 0;
    }
}

function verificarEspesor() {
    const campo = document.getElementById("espesor");
    const valor = campo.value;

    if (valor === "" || Number(valor) < 1) {
        campo.value = 1;
    }
}
