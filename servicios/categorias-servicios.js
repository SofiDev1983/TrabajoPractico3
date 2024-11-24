const url = "https://67439913b7464b1c2a655130.mockapi.io/api/categorias";

async function listar(id) {
  let cadUrl;
  if (isNaN(id)) cadUrl = url;
  else cadUrl = url + "/" + id;
  return await fetch(cadUrl).then((respuesta) => respuesta.json());
}

async function crear(descripcion) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      descripcion: descripcion,
    }),
  });
}

async function editar(id, descripcion) {
  let urlPut = url + "/" + id;
  return await fetch(urlPut, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      descripcion: descripcion,
    }),
  });
}

async function borrar(id) {
  let urlPut = url + "/" + id;
  return await fetch(urlPut, {
    method: "DELETE",
  });
}

export const categoriasServices = {
  listar,
  crear,
  editar,
  borrar,
};
