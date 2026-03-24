
// Arreglo para almacenar el historial de operaciones (éxitos y errores)
let historialOperaciones = [];

// FUNCIÓN PRINCIPAL: calcularOperacion

function calcularOperacion(valor1, valor2, operacion) {
    // === VALIDACIONES ===
    // 1. Validar campos vacíos
    if (valor1 === '' || valor2 === '' || valor1 === null || valor2 === null) {
        throw new Error('Campos vacíos. Por favor, ingresa ambos números.');
    }
    
    // 2. Validar que sean números
    const num1 = Number(valor1);
    const num2 = Number(valor2);
    
    if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Datos no numéricos. Por favor, ingresa números válidos.');
    }
    
    // 3. Validar operación
    if (!operacion) {
        throw new Error('Operación no válida. Por favor, selecciona una operación.');
    }
    
    // Logica de las operaciones de la calculadora
    let resultado;
    let simbolo;
    
    switch (operacion) {
        case 'suma':
            resultado = num1 + num2;
            simbolo = '+';
            break;
        case 'resta':
            resultado = num1 - num2;
            simbolo = '-';
            break;
        case 'multiplicacion':
            resultado = num1 * num2;
            simbolo = '×';
            break;
        case 'division':
            // Validar división entre cero
            if (num2 === 0) {
                throw new Error('División entre cero. No se puede dividir un número entre cero.');
            }
            resultado = num1 / num2;
            simbolo = '÷';
            break;
        default:
            throw new Error('Operación no reconocida. Las operaciones válidas son: suma, resta, multiplicación, división.');
    }
    
    // Retornar objeto con resultado y detalles
    return {
        valor: resultado,
        texto: `${num1} ${simbolo} ${num2} = ${resultado}`,
        num1: num1,
        num2: num2,
        operacion: operacion,
        simbolo: simbolo
    };
}

// Funcion para guardar en el historial (éxito o error)
function guardarEnHistorial(operacionData, esExito, mensaje = null) {
    const registro = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('es-ES'),
        tipo: esExito ? 'exito' : 'error',
        ...operacionData
    };
    
    if (!esExito) {
        registro.mensajeError = mensaje;
    }
    
    historialOperaciones.unshift(registro); // Agregar al inicio
    actualizarHistorialDOM();
}

// Funcion para actuzalizar el historial en el DOM
function actualizarHistorialDOM() {
    const historialList = document.getElementById('historialList');
    const historialContainer = document.getElementById('historialContainer');
    const emptyHistory = historialContainer.querySelector('.empty-history');
    
    if (historialOperaciones.length === 0) {
        if (emptyHistory) emptyHistory.style.display = 'block';
        historialList.innerHTML = '';
        return;
    }
    
    if (emptyHistory) emptyHistory.style.display = 'none';
    
    historialList.innerHTML = historialOperaciones.map(registro => {
        if (registro.tipo === 'exito') {
            return `
                <li class="historial-item historial-exito">
                    <div class="historial-info">
                        <span class="historial-operacion">
                            ${registro.texto || `${registro.num1} ${registro.simbolo} ${registro.num2} = ${registro.valor}`}
                        </span>
                        <span class="historial-timestamp">${registro.timestamp}</span>
                    </div>
                    <i class="fas fa-check-circle" style="color: #4d918d;"></i>
                </li>
            `;
        } else {
            return `
                <li class="historial-item historial-error">
                    <div class="historial-info">
                        <span class="historial-operacion" style="color: #ff6b6b;">
                            ${registro.mensajeError}
                        </span>
                        <span class="historial-timestamp">${registro.timestamp}</span>
                    </div>
                    <i class="fas fa-exclamation-triangle" style="color: #ff6b6b;"></i>
                </li>
            `;
        }
    }).join('');
}

// Funcion para limpiar el historial
function limpiarHistorial() {
    historialOperaciones = [];
    actualizarHistorialDOM();
    console.log('🗑️ Historial limpiado');
}

// Función para mostrar resultado o error en el DOM
function mostrarResultadoEnDOM(resultado, esError = false, esAdvertencia = false) {
    const resultadoArea = document.getElementById('resultadoArea');
    
    if (esError) {
        resultadoArea.innerHTML = `
            <div class="result-error">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>❌ Error:</strong> ${resultado}
            </div>
        `;
    } else if (esAdvertencia) {
        resultadoArea.innerHTML = `
            <div class="result-warning">
                <i class="fas fa-info-circle"></i>
                <strong>⚠️ Advertencia:</strong> ${resultado}
            </div>
        `;
    } else {
        resultadoArea.innerHTML = `
            <div class="result-success">
                <i class="fas fa-check-circle"></i>
                <strong>✅ Resultado:</strong> ${resultado}
            </div>
        `;
    }
}

// Funcion principal para manejar el evento de cálculo
function manejarCalculo() {
    // Obtener valores del DOM
    const valor1 = document.getElementById('numero1').value.trim();
    const valor2 = document.getElementById('numero2').value.trim();
    const operacion = document.getElementById('operacion').value;
    
    // Variables para el registro
    let operacionData = {
        num1: valor1,
        num2: valor2,
        operacion: operacion
    };
    
    //Manejo de excepciones 
    try {
        // Intentar realizar la operación
        const resultado = calcularOperacion(valor1, valor2, operacion);
        
        // Mostrar resultado exitoso
        mostrarResultadoEnDOM(resultado.texto);
        
        // Guardar en historial (éxito)
        guardarEnHistorial(resultado, true);
        
        // Mensaje en consola
        console.log(`✅ Éxito: ${resultado.texto}`);
        
    } catch (error) {
        // Manejar el error
        console.error('Error técnico:', error.message);
        
        // Mostrar error en pantalla
        mostrarResultadoEnDOM(error.message, true);
        
        // Guardar en historial (error)
        guardarEnHistorial(operacionData, false, error.message);
        
    } finally {
        // Bloque finally - SIEMPRE se ejecuta
        console.log(`🔚 Operación finalizada a las ${new Date().toLocaleTimeString()}`);
        console.log('=== =========================== ===');
    }
}

// Funcion para limpiar campos después de cada operación
function limpiarCampos() {
    document.getElementById('numero1').value = '';
    document.getElementById('numero2').value = '';
    document.getElementById('operacion').value = '';
    mostrarResultadoEnDOM('Esperando nueva operación...', false, true);
}

// Even Listener para el botón de calcular y limpiar historial
document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcularBtn');
    const limpiarHistorialBtn = document.getElementById('limpiarHistorialBtn');
    
    calcularBtn.addEventListener('click', manejarCalculo);
    
    if (limpiarHistorialBtn) {
        limpiarHistorialBtn.addEventListener('click', limpiarHistorial);
    }
});