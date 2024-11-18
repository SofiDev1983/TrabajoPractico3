// Escribir el HTML en el archivo tienda.html
import { categoriasServices } from "../../../servicios/categorias-servicios.js";
import { productosServices } from "../../../servicios/productos-servicios.js";
import { RouterTienda } from "./routerTienda.js";
// Copiar el contenido del main

const htmlTienda = `<div>
        <section class="seccionLogin">
            
        </section>
        
        <section class="carrusel">

        </section>

        <section class="seccionProductos">

        </section>
        
        <section class="vistaProducto">

        </section>
    </div>`;

export async function Tienda() {
  let d = document;
  d.querySelector(".contenidoTitulo").innerHTML = "Tienda";
  d.querySelector(".contenidoTituloSec").innerHTML = "";
  d.querySelector(".rutaMenu").innerHTML = "Tienda";
  d.querySelector(".rutaMenu").setAttribute("href", "#/tienda");
  let cP = d.getElementById("contenidoPrincipal");
  cP.innerHTML = htmlTienda;

  const localPath = window.location.href;
  console.log(localPath);
  RouterTienda()
}

export async function listarProductos() {
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
        producto.precio
      );
      seccionProductosPorCategoria.appendChild(itemProducto);
    });

    seccionCategoria.appendChild(seccionProductosPorCategoria);
    seccionProductos.appendChild(seccionCategoria);
  });
}

function htmlItemProducto(id, imagen, nombre, precio) {
  return `<div class="item-producto">
  <img src="${imagen}" style='height: 128px'>
  <p class="producto_nombre">${nombre}</p>
  <p class="producto_precio">${formatPrice(precio)}</p>

  <a href="#/tienda?idProducto=${id}" type="button" class="producto_enlace" >Ver producto</a>

</div>`;
}

function formatPrice(price) {
  const precioNumerico = parseFloat(price); // Convertir a número
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

function verProducto(id, nombre, descripcion, precio, imagen) {
  const verProductoHtml = `<div class="imagen">
    <img src="${imagen}" alt="producto">
</div>
<div class="texto">
    <p id="nameProducto" data-idProducto=${id}>${nombre}</p>

    <p id="descripcionProducto">${descripcion}</p>

    <p id="precioProducto">${formatPrice(precio)}</p>

    <div class="form-group">
        <label for="cantidadProducto">Cantidad</label>
        <input type="number" step="1" min ="1" value="1" id="cantidadProducto">
    </div>

    <a id="btnComprar" >Comprar</a>
</div>`;
}
