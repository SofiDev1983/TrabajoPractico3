var inputEmail = null;
var inputPassword = null;
var frmLogin = null;

import { usuariosServices } from "/servicios/usuarios-servicios.js";

export function setLogin() {
  frmLogin = document.getElementById("frmLogin");
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) btnLogout.addEventListener("click", logout);

  if (getUsuarioAutenticado()) {
    if (frmLogin) frmLogin.outerHTML = "";
  } else {
    document.getElementById("sitio").classList.add("d-none");

    inputEmail = document.getElementById("loginEmail");

    inputPassword = document.getElementById("loginPassword");

    const btnLogin = document.getElementById("iniciar-sesion");

    inputEmail.addEventListener("blur", validarForm);
    inputPassword.addEventListener("blur", validarForm);

    btnLogin.addEventListener("click", usuarioExiste);
  }
}

async function usuarioExiste() {
  let existeUsuario;
  let usuarioActivo;
  let usuarioFoto;
  let usuarioId;
  const spinner = document.querySelector("#spinner");

  await usuariosServices
    .listar()
    .then((respuesta) => {
      respuesta.forEach((usuario) => {
        if (
          usuario.correo === inputEmail.value &&
          usuario.password === inputPassword.value
        ) {
          usuarioId = usuario.id;
          usuarioActivo = usuario.nombre + " " + usuario.apellido;
          usuarioFoto = usuario.avatar;
          return (existeUsuario = true);
        } else {
          return;
        }
      });
    })
    .catch((error) => console.log(error));

  if (!existeUsuario) {
    mostrarMensaje("Email o contraseña incorrecto, intenta nuevamente");
  } else {
    //ocultar login
    if (!frmLogin) {
      return;
    }
    frmLogin.outerHTML = "";
    document.getElementById("sitio").classList.remove("d-none");

    //guardar en sessionStorage
    sessionStorage.setItem("usuarioId", usuarioId);
    sessionStorage.setItem("usuarioActivo", usuarioActivo);
    sessionStorage.setItem("usuarioFoto", usuarioFoto);
    sessionStorage.setItem("usuarioCorreo", inputEmail?.value);

    // Muestra los datos del usuario
    mostrarUsuario(usuarioActivo, usuarioFoto);

    setUsuarioAutenticado(true);
    window.location.href = "#/home";
  }
}

function validarForm(e) {
  return true;
}

function mostrarMensaje(msj) {
  alert(msj);
}

function setUsuarioAutenticado(booleano) {
  sessionStorage.setItem("autenticado", booleano);
}
function getUsuarioAutenticado() {
  return sessionStorage.getItem("autenticado") === "true";
}

function logout() {
  setUsuarioAutenticado(false);
  window.location.replace("index.html");
}

function mostrarUsuario(nombreCompleto, foto) {
  // Mostrar el nombre del usuario y la foto
  const divUsuario = document.getElementById("info-usuario");
  if (!divUsuario) return;

  const imagenUsuario = document.getElementById("imagen-usuario");
  const nombreUsuario = document.getElementById("nombre-usuario");
  console.log(imagenUsuario, nombreUsuario);

  if (imagenUsuario) imagenUsuario.src = foto;
  if (nombreUsuario) nombreUsuario.textContent = nombreCompleto;
}
