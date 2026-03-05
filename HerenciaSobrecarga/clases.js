// clases.js - Sistema de Productos con Herencia

// ============================================
// CLASE PADRE: Producto
// ============================================
class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    // Método para mostrar detalles del producto
    mostrarDetalle() {
        return `
            📦 Producto: ${this.nombre}
            💰 Precio: $${this.precio.toFixed(2)}
            📊 Stock disponible: ${this.stock} unidades
        `;
    }

    // Método adicional para calcular precio con descuento
    calcularPrecioConDescuento(porcentaje) {
        const descuento = (this.precio * porcentaje) / 100;
        return this.precio - descuento;
    }
}

// ============================================
// CLASE HIJA: ProductoElectronico
// HEREDA de Producto usando 'extends'
// ============================================
class ProductoElectronico extends Producto {
    constructor(nombre, precio, stock, garantia, marca) {
        // super() llama al constructor de la clase padre
        super(nombre, precio, stock);
        
        // Atributos adicionales de la clase hija
        this.garantia = garantia; // en meses
        this.marca = marca;
    }

    // SOBRESCRITURA (OVERRIDE) del método mostrarDetalle()
    // Agrega información de garantía a los detalles heredados
    mostrarDetalle() {
        // Usamos super.mostrarDetalle() para obtener los detalles del padre
        const detallesBase = super.mostrarDetalle();
        
        return `${detallesBase}
            🔧 Marca: ${this.marca}
            ⏱️ Garantía: ${this.garantia} meses
            ⚡ Tipo: Producto Electrónico
        `;
    }

    // Método específico de productos electrónicos
    calcularTiempoRestanteGarantia(mesesTranscurridos) {
        const mesesRestantes = this.garantia - mesesTranscurridos;
        if (mesesRestantes > 0) {
            return `✅ Garantía vigente por ${mesesRestantes} meses más`;
        } else if (mesesRestantes === 0) {
            return "⚠️ La garantía expira este mes";
        } else {
            return "❌ Garantía expirada";
        }
    }
}

// ============================================
// DEMOSTRACIÓN EN CONSOLA
// ============================================
console.log("=== DEMOSTRACIÓN DE CLASES EN JAVASCRIPT ===");

// Crear una instancia de ProductoElectronico
const laptop = new ProductoElectronico(
    "Laptop Gaming Pro", 
    12500.00, 
    15, 
    24, 
    "ASUS"
);

console.log("📋 Detalles del producto (desde consola):");
console.log(laptop.mostrarDetalle());

// Probar método adicional
console.log("\n💰 Prueba de métodos:");
console.log(`Precio con 10% descuento: $${laptop.calcularPrecioConDescuento(10)}`);
console.log(laptop.calcularTiempoRestanteGarantia(6));

// ============================================
// EXPORTAR PARA USO EN HTML
// ============================================
// Hacemos la clase disponible globalmente
window.ProductoElectronico = ProductoElectronico;