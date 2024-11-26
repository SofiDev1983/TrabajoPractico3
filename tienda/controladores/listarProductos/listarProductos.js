import { categoriasServices } from "../../../servicios/categorias-servicios.js";
import { productosServices } from "../../../servicios/productos-servicios.js";

function htmlCategoria(id, categoria) {
  /*ESTA FUNCION RECIBE DOS PARAMETROS ID Y CATEGORIA*/
  /*EN ESTA SE GENERA UNA CADENA DE CARACTERES CON EL CODIGO HTML CORRESPONDIENTE A LA CATEGORIA (ESTA EN ASSETS/MODULOS/listarProducto.html)*/
  /*SE DEBERÁ CONCATENAR PARA INCORPORAR EL id DE LA CATEGORIA AL ATRIBUTO data-idCategoria  */
  /*Y ADEMAS REEMPLAZAR EL TEXTO Nombre de Categoría POR EL VALOR QUE LLEGA AL PARAMETRO CATEGORIA DE LA FUNCION*/
  /*POR ULTIMO, LA FUNCION DEVOLVERA LA CADENA RESULTANTE*/
}

function htmlItemProducto(id, imagen, nombre, precio) {
  return `<div class="item-producto">
  <img src="${imagen}" style='height: 128px'>
  <p class="producto_nombre">${nombre}</p>
  <p class="producto_precio">${precio}</p>

  <a href="#/vistaProducto?idProducto=${id}" type="button" class="producto_enlace" >Ver producto</a>

</div>`;
}
async function asignarProducto(id) {
  /*1- ESTA FUNCION DEBERA CONSULTAR EN EL API-REST TODOS LOS PRODUCTOS PERTENECIENTES A LA CATEGORIA CON CODIGO ID  */
  /*2- HACER UN BUCLE CON EL RESULTADO DE LA CONSULTA Y RECORRELO PRODUCTO POR PRODUCTO*/
  /*3- EN EL INTERIOR DEL BUCLE DEBERA LLAMAR A LA FUNCION htmlItemProducto y acumular su resultado en una cadena de caracteres */
  /*4- LUEGO DEL BUCLE Y CON LA CADENA RESULTANTE SE DEBE CAPTURAR EL ELEMENTO DEL DOM PARA ASIGNAR ESTOS PRODUCTOS DENTRO DE LA CATEGORIA CORRESPONDIENTE */
  /*5- PARA ELLO PODEMOS HACER USO DE UN SELECTOR CSS QUE SELECCIONE EL ATRIBUTO data-idCategoria=X, Ó LA CLASE .productos  .SIENDO X EL VALOR LA CATEGORIA EN CUESTION.*/
}
export async function listarProductos() {
  const carrusel = document.querySelector(".carrusel");
  const seccionVistaProducto = document.querySelector(".vistaProducto");
  const seccionLogin = document.querySelector(".seccionLogin");
  if (carrusel) carrusel.innerHTML = "";
  if (seccionVistaProducto) {
    seccionVistaProducto.innerHTML = "";
    seccionVistaProducto.style.display = "none";
  }
  if (seccionLogin) seccionLogin.innerHTML = "";

  const productos = await productosServices.listar();
  const categorias = await categoriasServices.listar();

  console.log(productos);

  const productosPorCategoria = categorias.reduce((acumulador, categoria) => {
    acumulador[Number(categoria.id)] = {
      categoria: categoria.descripcion,
      productos: productos.filter(
        (producto) => producto.idCategoria == categoria.id
      ),
    };
    return acumulador;
  }, {});

  const seccionProductos =
    document.getElementsByClassName("seccionProductos")[0];

  Object.values(productosPorCategoria).forEach((categoria) => {
    const seccionCategoria = document.createElement("section");
    seccionCategoria.className = "categorias";

    const tituloCategoria = document.createElement("h1");
    tituloCategoria.innerText = categoria.categoria.toUpperCase();
    seccionCategoria.appendChild(tituloCategoria);

    const seccionProductosPorCategoria = document.createElement("div");
    seccionProductosPorCategoria.className = "categoria-productos";

    categoria.productos.forEach((producto) => {
      const itemProducto = document.createElement("div");
      itemProducto.innerHTML = htmlItemProducto(
        producto.id,
        producto.foto,
        producto.nombre,
        producto.formatearPrecio()
      );
      seccionProductosPorCategoria.appendChild(itemProducto);
    });

    seccionCategoria.appendChild(seccionProductosPorCategoria);
    seccionProductos.appendChild(seccionCategoria);
  });
}
