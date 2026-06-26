class Producto {
    constructor(nombre, precio, categoria) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }

    MostrarDetalle() {
    return `Nombre: ${this.nombre} - Precio: $${this.precio} - Categoría: ${this.categoria}`;
    }
};

const button = document.getElementById("Resultado");
button.addEventListener("click", function(){
    let producto1 = new Producto("Laptop", 1500, "Electrónica");
    let producto2 = new Producto("Smartphone", 10000, "Electrónica");
    let producto3 = new Producto("Mouse", 100, "Electrónica");
    let producto4 = new Producto("Teclado", 250, "Electrónica");
    let producto5 = new Producto("Monitor", 1700, "Electrónica");
    let producto6 = new Producto("Cable USB", 350, "Electrónica");
    let producto7 = new Producto("Impresora", 2000, "Electrónica");
    let producto8 = new Producto("Auriculares", 500, "Electrónica");
    let producto9 = new Producto("Disco Duro", 1200, "Electrónica");
    let producto10 = new Producto("Memoria RAM", 5000, "Electrónica");

    Math.random() * 10;
    let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10];
    let randomIndex = Math.floor(Math.random() * productos.length);
    let randomProducto = productos[randomIndex];

    document.getElementById("Producto").innerHTML = randomProducto.MostrarDetalle();

});
