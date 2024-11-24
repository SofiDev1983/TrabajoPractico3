const url = "https://67439913b7464b1c2a655130.mockapi.io/api/usuarios";

//API-REST USUARIOS//

async function listar(id) {
  let cadUrl;
  if (isNaN(id)) cadUrl = url;
  else cadUrl = url + "/" + id;
  const response = await fetch(cadUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [];
    });
  return response;
}

async function crear(
  apellido,
  nombre,
  correo,
  password,
  avatar,
  pais,
  ciudad,
  direccion,
  telefono,
  role = "admin"
) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apellido: apellido,
      nombre: nombre,
      correo: correo,
      password: password,
      avatar: avatar,
      pais: pais,
      ciudad: ciudad,
      direccion: direccion,
      telefono: telefono,
      role: role,
    }),
  });
}

async function editar(
  id,
  apellido,
  nombre,
  correo,
  password,
  avatar,
  pais,
  ciudad,
  direccion,
  telefono,
  role = "admin"
) {
  let urlPut = url + "/" + id;
  return await fetch(urlPut, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apellido: apellido,
      nombre: nombre,
      correo: correo,
      password: password,
      avatar: avatar,
      pais: pais,
      ciudad: ciudad,
      direccion: direccion,
      telefono: telefono,
      role: role,
    }),
  });
}

async function borrar(id) {
  let urlPut = url + "/" + id;
  return await fetch(urlPut, {
    method: "DELETE",
  });
}

export const usuariosServices = {
  listar,
  crear,
  editar,
  borrar,
};
