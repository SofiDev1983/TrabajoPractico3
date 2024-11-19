class Venta {
  constructor(
    idUsuario,
    emailUsuario,
    idProducto,
    nombreProducto,
    cantidad,
    fecha,
    despachado
  ) {
    this.idUsuario = idUsuario;
    this.emailUsuario = emailUsuario;
    this.idProducto = idProducto;
    this.nombreProducto = nombreProducto;
    this.cantidad = cantidad;
    this.fecha = fecha;
    this.despachado = despachado;
  }
}

export default Venta;
