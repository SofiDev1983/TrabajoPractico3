import Producto from "../models/Producto.js";

const url = "https://673b854b339a4ce4451c7f4d.mockapi.io/api/productos";

/**
 * Consulta todos los productos
 * @returns {Producto[]} productos
 */
async function listar(id) {
  let cadUrl;
  if (isNaN(id)) cadUrl = url;
  else cadUrl = url + "/" + id;
  return (await fetch(cadUrl).then((respuesta) => respuesta.json())).map(
    (producto) =>
      new Producto(
        producto.id,
        producto.nombre,
        producto.descripcion,
        producto.foto,
        producto.precio,
        producto.categoria,
        producto.idCategoria
      )
  );
}

/**
 *
 * @param {Number} id id del producto
 * @returns {Producto} producto
 */
async function getProductoById(id) {
  let cadUrl = url + "/" + id;
  const producto = await fetch(cadUrl).then((respuesta) => respuesta.json());
  return new Producto(
    producto.id,
    producto.nombre,
    producto.descripcion,
    producto.foto,
    producto.precio,
    producto.categoria,
    producto.idCategoria
  );
}

async function crear(
  nombre,
  descripcion,
  foto,
  precio,
  idCategoria,
  categoria
) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      descripcion: descripcion,
      foto: foto,
      precio: precio,
      idCategoria: idCategoria,
      categoria: categoria,
    }),
  });
}

async function editar(
  id,
  nombre,
  descripcion,
  foto,
  precio,
  idCategoria,
  categoria
) {
  let urlPut = url + "/" + id;
  return await fetch(urlPut, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      descripcion: descripcion,
      foto: foto,
      precio: precio,
      idCategoria: idCategoria,
      categoria: categoria,
    }),
  });
}

async function borrar(id) {
  let urlPut = url + "/" + id;
  return await fetch(urlPut, {
    method: "DELETE",
  });
}

async function listarPorCategoria(idCategoria) {
  const newUrl = new URL(url);
  newUrl.searchParams.append("idCategoria", idCategoria);
  return await fetch(newUrl).then((respuesta) => respuesta.json());
}

export const productosServices = {
  listar,
  crear,
  editar,
  borrar,
  listarPorCategoria,
  getProductoById,
};
