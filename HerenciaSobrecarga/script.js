// script.js - Manejo de la interfaz

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Crear una instancia de ProductoElectronico
    const miProducto = new ProductoElectronico(
        "Laptop Gaming Pro",    // nombre
        12500.00,               // precio
        15,                     // stock
        24,                     // garantía en meses
        "ASUS"                  // marca
    );

    // Referencias a elementos del DOM
    const mostrarBtn = document.getElementById('mostrarProductoBtn');
    const productoDetalle = document.getElementById('productoDetalle');

    // Función para mostrar los detalles del producto
    function mostrarDetallesProducto() {
        // Obtener los detalles usando el método sobrescrito
        const detalles = miProducto.mostrarDetalle();
        
        // Dividir el texto en líneas para mejor presentación
        const lineas = detalles.split('\n').filter(linea => linea.trim() !== '');
        
        // Crear HTML para los detalles
        let html = '<div class="product-details">';
        
        lineas.forEach(linea => {
            // Asignar iconos según el contenido
            if (linea.includes('Producto')) {
                html += `<p> ${linea.trim()}</p>`;
            } else if (linea.includes('Precio')) {
                html += `<p> ${linea.trim()}</p>`;
            } else if (linea.includes('Stock')) {
                html += `<p>${linea.trim()}</p>`;
            } else if (linea.includes('Marca')) {
                html += `<p> ${linea.trim()}</p>`;
            } else if (linea.includes('Garantía')) {
                html += `<p>${linea.trim()}</p>`;
            } else if (linea.includes('Tipo')) {
                html += `<p> ${linea.trim()}</p>`;
            } else {
                html += `<p>${linea.trim()}</p>`;
            }
        });
        
        html += '</div>';
        
        // Agregar información adicional
        html += `
            <div class="product-extra">
                <h4><i class="fas fa-info-circle"></i> Información de herencia:</h4>
                <ul>
                    <li><i class="fas fa-check-circle" style="color: #28a745;"></i> Clase padre: Producto</li>
                    <li><i class="fas fa-check-circle" style="color: #28a745;"></i> Clase hija: ProductoElectronico</li>
                    <li><i class="fas fa-check-circle" style="color: #28a745;"></i> Método sobrescrito: mostrarDetalle()</li>
                    <li><i class="fas fa-check-circle" style="color: #28a745;"></i> Atributo adicional: garantía (${miProducto.garantia} meses)</li>
                </ul>
            </div>
        `;
        
        // Actualizar el DOM
        productoDetalle.innerHTML = html;
        
        // Mostrar también en consola (requisito de la actividad)
        console.log('=== DETALLES DEL PRODUCTO ===');
        console.log(miProducto);
        console.log(miProducto.mostrarDetalle());
    }

    // Agregar event listener al botón
    mostrarBtn.addEventListener('click', mostrarDetallesProducto);

    // Mostrar información en consola al cargar
    console.log('=== ACTIVIDAD DE HERENCIA INICIALIZADA ===');
    console.log('Clase ProductoElectronico creada correctamente');
    console.log('Instancia creada:', miProducto);
    console.log('Método sobrescrito funcionando');
});