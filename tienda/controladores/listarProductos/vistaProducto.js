/**ESTE COMPONENTE SE ENCARGA DE MOSTRAR EL DETALLE DE UN PRODUCTO */
import { productosServices } from "../../../servicios/productos-servicios.js";
import { ventasServices } from "../../../servicios/ventas-servicios.js";
import {
  getUsuarioAutenticado,
  setUsuarioAutenticado,
} from "../login/login.js";
import Venta from "../../../models/Venta.js";

export async function vistaProducto() {
  /**1-En esta función se deben capturar los elementos html: .carrusel, .seccionProducto, .seccionLogin. Para luego
   * blanquear su contenido.
   * 2-Se deberá capturar el elemento .vistaProducto.
   * 3-Se deberá llamar a la función leerParametro para recuperar de la url el idProducto.
   * 4-Luego se deberán leer los datos del producto indentificado con el idProducto recuperado.
   * 5-Llamar a la función htmlVistaProducto.
   * 6-El resultado de la función deberá asignarse al elemento .vistaProducto capturado previamente.
   * 7-Se deberá capturar el elemento html correspondiente al anchor btnComprar y enlazar el evento click a la función registrarCompra.
   */
  const carrusel = document.querySelector(".carrusel");
  const seccionProducto = document.querySelector(".seccionProductos");
  const seccionLogin = document.querySelector(".seccionLogin");

  if (carrusel) carrusel.innerHTML = "";
  if (seccionProducto) seccionProducto.innerHTML = "";
  if (seccionLogin) seccionLogin.innerHTML = "";

  const vistaProductoElement = document.querySelector(".vistaProducto");
  vistaProductoElement.style.display = "flex";
  const idProducto = leerParametro();

  if (!idProducto) {
    console.error("El parámetro 'idProducto' no está presente en la URL.");
    return;
  }
  if (!vistaProductoElement) {
    console.error("No se recupera el elemento");
    return;
  }

  const producto = await productosServices.getProductoById(idProducto);

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/assets/css/vistaProducto.css";
  document.head.appendChild(link);

  vistaProductoElement.innerHTML = htmlVistaProducto(
    producto.id,
    producto.nombre,
    producto.descripcion,
    producto.formatearPrecio(),
    producto.foto
  );

  const compraBtn = document.getElementById("btnComprar");
  if (!compraBtn) {
    return;
  }
  compraBtn.addEventListener("click", async () => await registrarCompra());
}

function htmlVistaProducto(id, nombre, descripcion, precio, imagen) {
  /**1- ESTA FUNCION RECIBE COMO PARAMETRO los siguiente datos id, nombre, descripcion, precio e imagen del producto */
  /**2- A ESTOS PARAMETROS LOS CONCATENA DENTRO DEL CODIGO CORRESPONDIENTE AL COMPONENTE vistaProducto ( ASSETS/MODULOS/vistaProducto.html)*/
  /**3- POR ULTIMO DEVUELVE LA CADENA RESULTANTE. */
  /**4- SE RECUERDA QUE PARA PODER HACER LA INTERPOLACION DE CADENAS ${NOMBRE_VARIABLE} EL TEXTO DEBE ESTAR ENTRE LAS COMILLAS ` `.
   *
   *  ejemplo
   *   let titulo = 'Señora';
   *   let cadena = `Hola, ${titulo} Claudia  en que podemos ayudarla`;
   *
   */

  return `<div class="imagen">
    <img src="${imagen}" alt="producto">
</div>
<div class="texto">
    <p id="nameProducto" data-idProducto=${id}>${nombre}</p>

    <p id="descripcionProducto">${descripcion}</p>

    <p id="precioProducto">${precio}</p>

    <div class="form-group">
        <label for="cantidadProducto">Cantidad</label>
        <input type="number" step="1" min ="1" value="1" id="cantidadProducto">
    </div>

    <a id="btnComprar" type="button" >Comprar</a>
</div>`;
}

function leerParametro() {
  // Captura el idProducto de la dirección URL enviada por la página que llama
  const hash = window.location.hash;
  const paramsPart = hash.split("?")[1];
  const params = new URLSearchParams(paramsPart);
  const value = params.get("idProducto");
  return value ? value.trim() : null;
}

async function registrarCompra() {
  // 1. Obtiene el usuario logueado
  const auth = getUsuarioAutenticado();

  // ! Valida que el usuario este logueado
  if (
    !auth || // Validación: ¿existe el objeto?
    auth.autenticado !== "true" || // ¿Está autenticado? (debe ser la cadena "true")
    !auth.correoUsuario || // ¿El correo existe y no es falso?
    auth.correoUsuario === "null" // ¿Es igual a la cadena "null"?
  ) {
    alert("Inicie sesion para comprar");
    return;
  }

  // * Toma los datos del usuario logueado
  const usuario = getDataUsuario();
  const idUsuario = usuario.idUsuario;
  const correo = usuario.correo;

  // 2. Toma la informacion del producto
  const nombreProducto = document.querySelector("#nameProducto").textContent;
  const cantidadProducto = document.querySelector("#cantidadProducto").value;
  const idProducto =
    document.querySelector("[data-idproducto]").dataset.idproducto;

  // ! Valida la cantidad ingresada
  if (!cantidadProducto || isNaN(cantidadProducto) || cantidadProducto <= 0) {
    alert("Por favor, ingrese una cantidad válida.");
    return;
  }

  // * Crea una variable fecha con la hora actual
  const fecha = new Date().toISOString();

  // Crea la venta con los datos
  const ventaData = new Venta(
    idUsuario,
    correo,
    idProducto,
    nombreProducto,
    cantidadProducto,
    fecha,
    false
  );

  // La guarda en la API
  try {
    const response = await ventasServices.crear(
      ventaData.idUsuario,
      ventaData.emailUsuario,
      ventaData.idProducto,
      ventaData.nombreProducto,
      ventaData.cantidad,
      ventaData.fecha,
      ventaData.despachado
    );
    if (response.status === 201) alert("Compra realizada exitosamente!");
    else throw new Error();
  } catch (error) {
    alert("No se pudo realizar la compra. Intentelo de nuevo mas tarde.");
  } finally {
    history.go(-1); // Te devuelve al listado de productos
  }
}

function getDataUsuario() {
  const correo = sessionStorage.getItem("correo-usuario");
  const idUsuario = sessionStorage.getItem("id-usuario");
  return {
    correo,
    idUsuario,
  };
}
