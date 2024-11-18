import {
  getUsuarioAutenticado,
  mostrarUsuario,
} from "../../tienda/controladores/login/login.js";
import { Carrusel } from "../../tienda/controladores/carrusel/carrusel.js";
import { listarProductos } from "../../tienda/controladores/listarProductos/listarProductos.js";
import { vistaProducto } from "../../tienda/controladores/listarProductos/vistaProducto.js";
export function RouterTienda() {
  let session = getUsuarioAutenticado();
  setSession(session);
  let hash = location.hash;

  if (hash === "#/tienda/vistaProducto") {
    vistaProducto();
  } else if (hash === "#/tienda") {
    Carrusel();
    listarProductos();
  }
  console.log(hash);
}

function setSession(session) {
  /**
   * Esta función se utiliza para recuperar los datos de sessión cada vez que se recarga la página.
   */
  let d = document;
  if (session.autenticado) {
    mostrarUsuario(session.email);
  }
}
