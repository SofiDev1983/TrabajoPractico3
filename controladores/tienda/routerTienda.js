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

  if (hash.startsWith("#/tienda/vistaProducto")) {
    applyStyles("vistaProducto");
    vistaProducto();
  } else if (hash === "#/tienda") {
    applyStyles(["carrusel", "productos"]);
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

/**
 *
 * @param {Array<string>} estilosParaAplicar
 */
function applyStyles(estilosParaAplicar) {
  const doc = document;
  const estilos = {
    carrusel: "/assets/css/carrousel.css",
    productos: "/assets/css/productos.css",
    vistaProducto: "/assets/css/vistaProducto.css",
    login: "/assets/css/login.css",
  };

  estilosParaAplicar.forEach((estilo) => {
    let stylesheet = estilos[estilo];
    const link = doc.createElement("link");
    link.rel = "stylesheet";
    link.href = stylesheet;
    doc.head.appendChild(link);
  });
}
