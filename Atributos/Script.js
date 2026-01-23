// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener referencias a los elementos del DOM
    const inputNombre = document.getElementById('nombre');
    const btnSaludar = document.getElementById('btnSaludar');
    const mensajeResultado = document.getElementById('mensajeResultado');
    
    // Función para mostrar mensaje en la página (mejor que alert)
    function mostrarMensajeEnPagina(mensaje, tipo = 'info') {
        mensajeResultado.textContent = mensaje;
        mensajeResultado.style.display = 'block';
        
        // Estilos según tipo de mensaje
        switch(tipo) {
            case 'error':
                mensajeResultado.style.backgroundColor = '#ffe6e6';
                mensajeResultado.style.color = '#c0392b';
                mensajeResultado.style.border = '1px solid #c0392b';
                break;
            case 'success':
                mensajeResultado.style.backgroundColor = '#e6ffe6';
                mensajeResultado.style.color = '#27ae60';
                mensajeResultado.style.border = '1px solid #27ae60';
                break;
            default:
                mensajeResultado.style.backgroundColor = '#e6f3ff';
                mensajeResultado.style.color = '#2c3e50';
                mensajeResultado.style.border = '1px solid #4a90e2';
        }
        
        // Ocultar mensaje después de 4 segundos
        setTimeout(() => {
            mensajeResultado.style.display = 'none';
        }, 4000);
    }
    
    // Función para saludar al usuario
    function saludarUsuario() {
        // Obtener el valor del input y limpiar espacios en blanco
        const nombre = inputNombre.value.trim();
        
        // Validar si el campo está vacío
        if (nombre === '') {
            mostrarMensajeEnPagina('Por favor escribe tu nombre', 'error');
            
            // Efecto visual en el input vacío
            inputNombre.style.borderColor = '#c0392b';
            setTimeout(() => {
                inputNombre.style.borderColor = '#ddd';
            }, 1000);
            
            // Poner foco en el input
            inputNombre.focus();
            return;
        }
        
        // Mostrar saludo personalizado
        const saludo = `¡Hola, ${nombre}! ¡Es un placer saludarte! 👋`;
        mostrarMensajeEnPagina(saludo, 'success');
        
        // Efecto visual en el botón
        btnSaludar.style.backgroundColor = '#27ae60';
        setTimeout(() => {
            btnSaludar.style.backgroundColor = '#2ecc71';
        }, 300);
        
    }
    
    // Agregar evento click al botón
    btnSaludar.addEventListener('click', saludarUsuario);
    
    // Agregar evento para que funcione con Enter en el input
    inputNombre.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            saludarUsuario();
        }
    });
    
    // Agregar efecto al pasar el mouse sobre el botón
    btnSaludar.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btnSaludar.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    // Mensaje inicial de bienvenida
    setTimeout(() => {
        mostrarMensajeEnPagina('¡Bienvenido! Escribe tu nombre y haz clic en Saludar', 'info');
    }, 1000);
    
    // Configurar el foco inicial en el input
    inputNombre.focus();
});