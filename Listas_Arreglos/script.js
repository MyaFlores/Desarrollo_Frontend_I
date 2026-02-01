// Archivo: script.js - Versión simple

// 1. Declarar arreglo con 5 ciudades
const ciudades = [
    "Ciudad de México",
    "Madrid",
    "Buenos Aires",
    "Lima",
    "Santiago"
];

// 2. Mostrar cada ciudad en consola con forEach
console.log("=== Ciudades en consola ===");
ciudades.forEach((ciudad, index) => {
    console.log(`Ciudad ${index + 1}: ${ciudad}`);
});

// 3. Referencias a elementos DOM
const showBtn = document.getElementById('showBtn');
const citiesList = document.getElementById('citiesList');
const message = document.getElementById('message');

// 4. Evento para el botón
showBtn.addEventListener('click', function() {
    // Limpiar lista anterior
    citiesList.innerHTML = '';
    
    // Ocultar mensaje
    message.style.display = 'none';
    
    // Crear y agregar cada ciudad al DOM
    ciudades.forEach((ciudad, index) => {
        // Crear elemento li
        const listItem = document.createElement('li');
        
        // Crear número
        const number = document.createElement('span');
        number.className = 'city-number';
        number.textContent = `${index + 1}.`;
        
        // Crear nombre de ciudad
        const name = document.createElement('span');
        name.className = 'city-name';
        name.textContent = ciudad;
        
        // Agregar elementos al li
        listItem.appendChild(number);
        listItem.appendChild(name);
        
        // Agregar li a la lista
        citiesList.appendChild(listItem);
    });
    
    // Cambiar texto del botón
    showBtn.textContent = 'Lista Mostrada ✓';
    showBtn.disabled = true;
    
    // Ejemplo BOM: Mostrar mensaje
    setTimeout(() => {
        window.alert(`Mostradas ${ciudades.length} ciudades`);
    }, 300);
    
    console.log("Ciudades añadidas al DOM");
});

// 5. Ejemplo BOM al cargar la página
window.addEventListener('load', function() {
    console.log("Página cargada - URL:", window.location.href);
});