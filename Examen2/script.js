
// Clase PELICULA
class Pelicula {
    constructor(titulo, genero, año) {
        this.titulo = titulo;
        this.genero = genero;
        this.año = año;
    }

    // Método que retorna la descripción
    descripcion() {
        return `${this.titulo} es una producción del género ${this.genero} estrenada en ${this.año}.`;
    }
}

// Creacion de peliculas
const peliculas = [
    new Pelicula("Stranger Things", "Ciencia ficción", 2016),
    new Pelicula("Wednesday", "Misterio", 2022),
    new Pelicula("Squid Game", "Suspenso", 2021),
    new Pelicula("The Witcher", "Fantasía", 2019),
    new Pelicula("Money Heist", "Crimen", 2017),
    new Pelicula("Pinocchio", "Animacion", 2021)
];

//Variables del estado
let catalogoMostrado = false;  // Control para no duplicar tarjetas
let favoritos = [];            // Arreglo para llevar el conteo de favoritos

//Eventos DOM
const mostrarCatalogoBtn = document.getElementById('mostrarCatalogoBtn');
const catalogoContainer = document.getElementById('catalogo');
const favoritosCountSpan = document.getElementById('favoritosCount');

// Funcion para actualizar contenedores
function actualizarContadorFavoritos() {
    favoritosCountSpan.textContent = favoritos.length;
}

// Funcion para agregar a favotiros
function agregarFavorito(event, peliculaIndex) {
    // Obtener la tarjeta específica
    const tarjeta = event.target.closest('.pelicula-card');
    
    // Verificar si ya es favorita
    if (tarjeta.classList.contains('favorita')) {
        return; 
    }
    
    // Cambiar color de la tarjeta
    tarjeta.classList.add('favorita');
    
    // Buscar el botón de favoritos dentro de esta tarjeta
    const favoritoBtn = tarjeta.querySelector('.btn-favorito');
    
    // Cambiar texto y desactivar botón
    favoritoBtn.innerHTML = '<i class="fas fa-check"></i> Agregada a favoritos';
    favoritoBtn.disabled = true;
    
    // Agregar al arreglo de favoritos
    favoritos.push(peliculaIndex);
    
    // Actualizar contador
    actualizarContadorFavoritos();
    
    // Mostrar en consola (opcional)
    console.log(`✅ Agregada a favoritos: ${peliculas[peliculaIndex].titulo}`);
}

// Funcion para mostrar detalles
function verDetalles(peliculaIndex) {
    const pelicula = peliculas[peliculaIndex];
    
    // Mostrar alert con la descripción
    alert(pelicula.descripcion());
    
}

// Funcion para mostrar el catalogo y crear las tarjetas
function mostrarCatalogo() {
    if (catalogoMostrado) {
        alert('El catálogo ya está visible');
        return;
    }
    
    // Limpiar contenedor y eliminar el mensaje de vacío
    catalogoContainer.innerHTML = '';
    
    // Crear contenedor grid para las tarjetas
    const gridContainer = document.createElement('div');
    gridContainer.className = 'peliculas-grid';
    
    // Recorrer el arreglo de películas y crear tarjetas
    peliculas.forEach((pelicula, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'pelicula-card';
        
        // Contenido de la tarjeta
        tarjeta.innerHTML = `
            <div class="pelicula-info">
                <h3 class="pelicula-titulo">
                    <i class="fas fa-film"></i> ${pelicula.titulo}
                </h3>
                <p class="pelicula-detalle">
                    <i class="fas fa-tag"></i> 
                    <span class="pelicula-genero">${pelicula.genero}</span>
                </p>
                <p class="pelicula-detalle">
                    <i class="fas fa-calendar"></i> Año: ${pelicula.año}
                </p>
            </div>
            <div class="pelicula-acciones">
                <button class="pelicula-btn btn-detalles" data-index="${index}">
                    <i class="fas fa-info-circle"></i> Ver detalles
                </button>
                <button class="pelicula-btn btn-favorito" data-index="${index}">
                    <i class="fas fa-heart"></i> Agregar a favoritos
                </button>
            </div>
        `;
        
        // Agregar la tarjeta al grid
        gridContainer.appendChild(tarjeta);
    });
    
    // Agregar el grid al contenedor principal
    catalogoContainer.appendChild(gridContainer);
    
    
    // Botones "Ver detalles"
    const detallesBtns = document.querySelectorAll('.btn-detalles');
    detallesBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            verDetalles(parseInt(index));
        });
    });
    
    // Botones "Agregar a favoritos"
    const favoritoBtns = document.querySelectorAll('.btn-favorito');
    favoritoBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            const index = this.getAttribute('data-index');
            agregarFavorito(event, parseInt(index));
        });
    });
    
    // Cambiar estado a mostrado
    catalogoMostrado = true;
    
    // Cambiar texto del botón
    mostrarCatalogoBtn.innerHTML = '<i class="fas fa-check"></i> Catálogo visible';
    mostrarCatalogoBtn.disabled = true;

}

// Event listener para el botón de mostrar catálogo
mostrarCatalogoBtn.addEventListener('click', mostrarCatalogo);
