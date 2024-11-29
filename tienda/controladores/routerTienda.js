import { Carrusel } from "./carrusel/carrusel.js";
import { listarProductos } from "./listarProductos/listarProductos.js";
import { vistaProducto } from "./listarProductos/vistaProducto.js";
import {
  getUsuarioAutenticado,
  login,
  mostrarUsuario,
  register,
  setUsuarioAutenticado,
} from "./login/login.js";

export function RouterTienda() {
  let session = getUsuarioAutenticado();
  setSession(session);
  let hash = location.hash;

  if (hash === "#vistaProducto") {
    vistaProducto();
  } else if (hash === "#login") {
    login();
  } else if (hash === "#register") {
    register();
  } else if (hash === "#logout") {
    setUsuarioAutenticado(false, -1);
    location.href = "";
  } else if (hash.startsWith("#/vistaProducto")) {
    vistaProducto();
  } else if (hash === "" || hash === "#/tienda") {
    listarProductos();
    Carrusel();
  }
  console.log(hash);
}

function setSession(session) {
  /**
   * Esta función se utiliza para recuperar los datos de sessión cada vez que se recarga la página.
   */
  let d = document;

  if (session.autenticado) {
    mostrarUsuario();
  }
}
