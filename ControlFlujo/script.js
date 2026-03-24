//Arreglo para almacenar el historial
let historial = [];

//Elementos del DOM
const numeroInput = document.getElementById('numeroInput');
const evaluarBtn = document.getElementById('evaluarBtn');
const limpiarBtn = document.getElementById('limpiarBtn');
const resultadoDiv = document.getElementById('resultado');
const historialList = document.getElementById('historialList');
const contadorSpan = document.getElementById('contador');
const numeroMayorSpan = document.getElementById('numeroMayor');
const historialCount = document.getElementById('historialCount');

//Función evaluarNumero() - NÚCLEO DE LA ACTIVIDAD
function evaluarNumero(numero) {
    // Validaciones primero
    if (numero === '' || numero === null || numero === undefined) {
        return { 
            mensaje: 'Por favor ingresa un número',
            categoria: 'error',
            color: 'bg-error'
        };
    }
    
    // Convertir a número
    const num = Number(numero);
    
    // Validar si es realmente un número
    if (isNaN(num)) {
        return { 
            mensaje: 'Entrada no válida - No es un número',
            categoria: 'error',
            color: 'bg-error'
        };
    }
    
    // Validar si es mayor a 1000
    if (num > 1000) {
        return { 
            mensaje: `Número demasiado alto: ${num} > 1000`,
            categoria: 'muy-alto',
            color: 'bg-muy-alto'
        };
    }
    
    // Clasificación del número
    let resultado;
    let categoria;
    
    if (num < 0) {
        resultado = `Número negativo: ${num}`;
        categoria = 'negativo';
    } else if (num <= 10) {
        resultado = `Número pequeño: ${num} (entre 0 y 10)`;
        categoria = 'pequeño';
    } else if (num <= 50) {
        resultado = `Número mediano: ${num} (entre 11 y 50)`;
        categoria = 'mediano';
    } else {
        resultado = `Número grande: ${num} (entre 51 y 1000)`;
        categoria = 'grande';
    }
    
    return {
        mensaje: resultado,
        categoria: categoria,
        color: `bg-${categoria}`,
        valor: num
    };
}

// Función para actualizar el resultado en pantalla
function mostrarResultado(resultado) {
    resultadoDiv.textContent = resultado.mensaje;
    
    // Remover todas las clases de color
    resultadoDiv.className = 'result-box';
    
    // Agregar la clase correspondiente
    if (resultado.color) {
        resultadoDiv.classList.add(resultado.color);
    }
    
    // También cambiar color del texto según categoría
    if (resultado.categoria && resultado.categoria !== 'error') {
        resultadoDiv.classList.add(`text-${resultado.categoria}`);
    }
}

//Función para agregar al historial
function agregarAlHistorial(numero, resultado) {
    // Crear objeto para el historial
    const registro = {
        numero: numero,
        categoria: resultado.categoria,
        mensaje: resultado.mensaje,
        timestamp: new Date().toLocaleTimeString()
    };
    
    // Agregar al arreglo
    historial.push(registro);
    
    // Actualizar la lista en el DOM
    actualizarListaHistorial();
    
    // Actualizar estadísticas
    actualizarEstadisticas();
}

//Función para actualizar la lista visual del historial
function actualizarListaHistorial() {
    // Limpiar la lista
    historialList.innerHTML = '';
    
    if (historial.length === 0) {
        historialList.innerHTML = '<li class="empty-history">No hay números evaluados aún</li>';
        return;
    }
    
    // Mostrar los últimos 10 registros (los más recientes primero)
    const historialReciente = [...historial].reverse().slice(0, 10);
    
    historialReciente.forEach(registro => {
        const li = document.createElement('li');
        
        // Determinar color según categoría
        let colorClass = '';
        switch(registro.categoria) {
            case 'negativo': colorClass = 'text-negativo'; break;
            case 'pequeño': colorClass = 'text-pequeño'; break;
            case 'mediano': colorClass = 'text-mediano'; break;
            case 'grande': colorClass = 'text-grande'; break;
            case 'muy-alto': colorClass = 'text-muy-alto'; break;
            default: colorClass = '';
        }
        
        li.innerHTML = `
            <span class="history-number ${colorClass}">${registro.numero}</span>
            <span class="history-category">${registro.categoria}</span>
            <small>${registro.timestamp}</small>
        `;
        
        historialList.appendChild(li);
    });
    
    // Actualizar contador del historial
    historialCount.textContent = historial.length;
}

//Función para actualizar estadísticas
function actualizarEstadisticas() {
    // Actualizar contador
    contadorSpan.textContent = historial.length;
    
    // Calcular número mayor (solo números válidos, no errores)
    const numerosValidos = historial
        .filter(r => r.categoria !== 'error' && typeof r.numero === 'number')
        .map(r => r.numero);
    
    if (numerosValidos.length > 0) {
        const mayor = Math.max(...numerosValidos);
        numeroMayorSpan.textContent = mayor;
    } else {
        numeroMayorSpan.textContent = '-';
    }
}

//Función principal al hacer clic en Evaluar
function handleEvaluar() {
    // Obtener valor del input
    const valor = numeroInput.value.trim();
    
    // Evaluar el número
    const resultado = evaluarNumero(valor);
    
    // Mostrar resultado
    mostrarResultado(resultado);
    
    // Si no hay error, agregar al historial
    if (resultado.categoria !== 'error' && resultado.valor !== undefined) {
        agregarAlHistorial(resultado.valor, resultado);
    } else {
        // También mostrar errores en el historial? (opcional)
        if (resultado.categoria === 'error') {
            console.log('Error:', resultado.mensaje);
        }
    }
    
    // Mostrar en consola (requisito de la actividad)
    console.log('=== EVALUACIÓN ===');
    console.log('Input:', valor);
    console.log('Resultado:', resultado);
    console.log('Historial:', historial);
}

//Función para limpiar todo
function handleLimpiar() {
    // Vaciar input
    numeroInput.value = '';
    
    // Restaurar mensaje de resultado
    resultadoDiv.textContent = 'Esperando número...';
    resultadoDiv.className = 'result-box';
    
    // Vaciar historial
    historial = [];
    
    // Actualizar lista
    actualizarListaHistorial();
    
    // Actualizar estadísticas
    actualizarEstadisticas();
    
    console.log('=== TODO LIMPIADO ===');
}

//Función para validar mientras se escribe (opcional)
function validarInput() {
    const valor = numeroInput.value;
    
    // Si no está vacío, mostrar preview del tipo
    if (valor.trim() !== '') {
        const resultado = evaluarNumero(valor);
        if (resultado.categoria !== 'error') {
            // Solo mostrar preview, no agregar al historial
            resultadoDiv.textContent = `Preview: ${resultado.mensaje}`;
            resultadoDiv.className = 'result-box preview';
            resultadoDiv.classList.add(resultado.color);
        }
    }
}

//Event Listeners
evaluarBtn.addEventListener('click', handleEvaluar);
limpiarBtn.addEventListener('click', handleLimpiar);

// Permitir evaluar con Enter
numeroInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleEvaluar();
    }
});

// Validación en tiempo real (opcional - descomentar si se quiere)
// numeroInput.addEventListener('input', validarInput);

//Mensaje inicial en consola
console.log('=== EVALUADOR DE NÚMEROS INICIADO ===');
console.log('Instrucciones:');
console.log('- Función evaluarNumero() implementada con if/else');
console.log('- Validaciones: vacío, no numérico, >1000');
console.log('- Clasificación: <0, 0-10, 11-50, >50, >1000');
console.log('- Historial en arreglo con push()');
console.log('=====================================');