class Producto {
  constructor(id, nombre, descripcion, foto, precio, categoria, idCategoria) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.foto = foto;
    this.precio = precio;
    this.categoria = categoria;
    this.idCategoria = idCategoria;
  }
  formatearPrecio() {
    const precioNumerico = parseFloat(this.precio); // Convertir a número
    if (isNaN(precioNumerico)) {
      return "Valor no válido"; // Manejar caso de error
    }

    // Formatear como moneda argentina
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(precioNumerico);
  }
}

export default Producto;
