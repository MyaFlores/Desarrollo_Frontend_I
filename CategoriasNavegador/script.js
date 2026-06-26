// script.js - Sistema de Gestión de Productos

// 1. Objeto productos con categorías y productos
const productos = {
    "Electrónicos": [
        { 
            nombre: "Laptop HP", 
            precio: 12500, 
            stock: 15,
            marca: "HP",
            descripcion: "Laptop con procesador i5, 8GB RAM, 512GB SSD"
        },
        { 
            nombre: "Smartphone Samsung", 
            precio: 8500, 
            stock: 8,
            marca: "Samsung",
            descripcion: "Teléfono con pantalla AMOLED, 128GB almacenamiento"
        },
        { 
            nombre: "Tablet Apple", 
            precio: 11000, 
            stock: 5,
            marca: "Apple",
            descripcion: "iPad Air con pantalla Retina, 64GB"
        }
    ],
    "Ropa": [
        { 
            nombre: "Camisa Casual", 
            precio: 450, 
            stock: 50,
            talla: "M",
            color: "Azul",
            material: "Algodón"
        },
        { 
            nombre: "Pantalón Jeans", 
            precio: 650, 
            stock: 30,
            talla: "32",
            color: "Azul oscuro",
            material: "Denim"
        },
        { 
            nombre: "Chamarra de Cuero", 
            precio: 2200, 
            stock: 12,
            talla: "L",
            color: "Negro",
            material: "Cuero sintético"
        }
    ],
    "Hogar": [
        { 
            nombre: "Juego de Sábanas", 
            precio: 850, 
            stock: 25,
            tamaño: "King Size",
            material: "Algodón egipcio",
            colores: ["Blanco", "Azul", "Gris"]
        },
        { 
            nombre: "Set de Cocina", 
            precio: 3200, 
            stock: 10,
            piezas: 15,
            material: "Acero inoxidable",
            incluye: "Sartenes, ollas, cuchillos"
        },
        { 
            nombre: "Lámpara de Mesa", 
            precio: 750, 
            stock: 18,
            tipo: "LED",
            potencia: "10W",
            colorLuz: "Blanco cálido"
        }
    ]
};

// 2. Elementos del DOM
const categorySelect = document.getElementById('categorySelect');
const productsList = document.getElementById('productsList');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');
const fileName = document.getElementById('fileName');
const categoriesCount = document.getElementById('categoriesCount');
const totalProducts = document.getElementById('totalProducts');
const currentCategory = document.getElementById('currentCategory');
const productsContainer = document.getElementById('productsContainer');

// 3. Mostrar iteración en consola
console.log("=== ITERACIÓN DEL OBJETO PRODUCTOS ===");
console.log("Usando for...in para recorrer categorías:");

let totalProductCount = 0;

for (const categoria in productos) {
    console.log(`\n📂 Categoría: ${categoria}`);
    console.log(`Productos en ${categoria}:`);
    
    productos[categoria].forEach((producto, index) => {
        totalProductCount++;
        console.log(`  ${index + 1}. ${producto.nombre} - $${producto.precio} - Stock: ${producto.stock}`);
    });
}

console.log(`\n📊 RESUMEN:`);
console.log(`Total de categorías: ${Object.keys(productos).length}`);
console.log(`Total de productos: ${totalProductCount}`);

// 4. Inicializar select con categorías
function inicializarSelect() {
    // Limpiar opciones existentes (excepto la primera)
    while (categorySelect.options.length > 1) {
        categorySelect.remove(1);
    }
    
    // Agregar categorías al select
    for (const categoria in productos) {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categorySelect.appendChild(option);
    }
    
    // Actualizar estadísticas
    actualizarEstadisticas();
}

// 5. Mostrar productos de una categoría
function mostrarProductos(categoria) {
    // Limpiar lista anterior
    productsList.innerHTML = '';
    
    // Ocultar estado vacío
    const emptyState = productsContainer.querySelector('.empty-state');
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    // Verificar si la categoría existe
    if (!productos[categoria]) {
        productsList.innerHTML = '<p class="error">Categoría no encontrada</p>';
        return;
    }
    
    // Mostrar cada producto
    productos[categoria].forEach(producto => {
        const productCard = crearTarjetaProducto(producto);
        productsList.appendChild(productCard);
    });
    
    // Actualizar estadísticas
    currentCategory.textContent = categoria;
}

// 6. Crear tarjeta de producto
function crearTarjetaProducto(producto) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Determinar clase de stock
    let stockClass = 'stock-high';
    if (producto.stock < 10) stockClass = 'stock-low';
    else if (producto.stock < 20) stockClass = 'stock-medium';
    
    // Crear HTML de la tarjeta
    card.innerHTML = `
        <div class="product-header">
            <h3 class="product-name">${producto.nombre}</h3>
            <span class="product-price">$${producto.precio.toLocaleString()}</span>
        </div>
        
        <div class="product-details">
            <div class="detail-item">
                <span class="detail-label">Stock:</span>
                <span class="detail-value ${stockClass}">${producto.stock} unidades</span>
            </div>
    `;
    
    // Agregar propiedades adicionales (excluyendo nombre, precio, stock)
    for (const prop in producto) {
        if (prop !== 'nombre' && prop !== 'precio' && prop !== 'stock') {
            const value = Array.isArray(producto[prop]) 
                ? producto[prop].join(', ') 
                : producto[prop];
            
            const detail = document.createElement('div');
            detail.className = 'detail-item';
            detail.innerHTML = `
                <span class="detail-label">${prop.charAt(0).toUpperCase() + prop.slice(1)}:</span>
                <span class="detail-value">${value}</span>
            `;
            card.querySelector('.product-details').appendChild(detail);
        }
    }
    
    card.innerHTML += `</div>`;
    return card;
}

// 7. Exportar productos a JSON
function exportarProductos() {
    // Convertir objeto a JSON con formato bonito
    const jsonData = JSON.stringify(productos, null, 2);
    
    // Crear blob y enlace de descarga
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'productos.json';
    
    // Simular clic en el enlace
    document.body.appendChild(link);
    link.click();
    
    // Limpiar
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('✅ Productos exportados a productos.json');
    alert('Archivo productos.json descargado exitosamente');
}

// 8. Importar productos desde JSON
function importarProductos(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validar estructura básica
            if (typeof importedData !== 'object' || importedData === null) {
                throw new Error('El archivo no contiene un objeto JSON válido');
            }
            
            // Actualizar objeto productos
            Object.keys(productos).forEach(key => delete productos[key]);
            Object.assign(productos, importedData);
            
            // Actualizar interfaz
            inicializarSelect();
            mostrarProductos(Object.keys(productos)[0] || '');
            
            console.log('✅ Productos importados exitosamente:', productos);
            alert('Productos importados y actualizados exitosamente');
            
            // Mostrar iteración en consola
            console.log("=== NUEVA ITERACIÓN DESDE JSON IMPORTADO ===");
            for (const categoria in productos) {
                console.log(`Categoría: ${categoria}`);
                productos[categoria].forEach(p => {
                    console.log(`  - ${p.nombre}: $${p.precio}`);
                });
            }
            
        } catch (error) {
            console.error('Error al importar JSON:', error);
            alert('Error: El archivo no es un JSON válido o tiene estructura incorrecta');
        }
    };
    
    reader.onerror = function() {
        alert('Error al leer el archivo');
    };
    
    reader.readAsText(file);
}

// 9. Actualizar estadísticas
function actualizarEstadisticas() {
    const categorias = Object.keys(productos);
    let total = 0;
    
    for (const categoria in productos) {
        total += productos[categoria].length;
    }
    
    categoriesCount.textContent = categorias.length;
    totalProducts.textContent = total;
}

// 10. Event Listeners
categorySelect.addEventListener('change', function() {
    if (this.value) {
        mostrarProductos(this.value);
    } else {
        // Mostrar estado vacío
        productsList.innerHTML = '';
        const emptyState = productsContainer.querySelector('.empty-state');
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        currentCategory.textContent = 'Ninguna';
    }
});

exportBtn.addEventListener('click', exportarProductos);

importFile.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = file.name;
        
        // Validar extensión
        if (!file.name.toLowerCase().endsWith('.json')) {
            alert('Por favor, selecciona un archivo JSON (.json)');
            this.value = '';
            fileName.textContent = 'Ningún archivo seleccionado';
            return;
        }
        
        // Importar archivo
        importarProductos(file);
    } else {
        fileName.textContent = 'Ningún archivo seleccionado';
    }
});

// 11. Inicializar aplicación
function inicializarApp() {
    // Inicializar select
    inicializarSelect();
    
    // Seleccionar primera categoría por defecto
    const primeraCategoria = Object.keys(productos)[0];
    if (primeraCategoria) {
        categorySelect.value = primeraCategoria;
        mostrarProductos(primeraCategoria);
    }
    
    // Mostrar información inicial en consola
    console.log("=== APLICACIÓN INICIALIZADA ===");
    console.log("Categorías cargadas:", Object.keys(productos));
    console.log("Usa el select para navegar entre categorías");
    console.log("Presiona 'Exportar productos' para descargar el JSON");
    console.log("Usa 'Importar JSON' para cargar nuevos datos");
}

// 12. Ejecutar cuando se cargue la página
window.addEventListener('DOMContentLoaded', inicializarApp);

// 13. Función adicional: Agregar nuevo producto (extra)
function agregarProducto(categoria, producto) {
    if (!productos[categoria]) {
        productos[categoria] = [];
    }
    productos[categoria].push(producto);
    inicializarSelect();
    
    if (categorySelect.value === categoria) {
        mostrarProductos(categoria);
    }
    
    console.log(`✅ Producto "${producto.nombre}" agregado a "${categoria}"`);
}