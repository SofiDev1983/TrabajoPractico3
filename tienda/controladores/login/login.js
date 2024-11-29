import { usuariosServices } from "../../../servicios/usuarios-servicios.js";

const htmlLogin = `<div class="contenedorLogin">
    <div class="cajaLogin">
        <p >Iniciar sesión</p>
        <form class="formLogin">
            <div class="input-group">
                <input type="email" class="form-control" id="loginEmail" placeholder="Email" name="loginEmail" autocomplete required>
            </div>
            <div class="input-group">
                <input type="password" class="form-control" id="loginPassword" placeholder="Password" name="loginPassword" autocomplete required>
            </div>
            <div class="row">
                <div class="col-4">
                <button type="submit"  id="iniciar-sesion" class="btnAmarillo">Login</button>
                </div>
            </div>
        </form>
    </div>
</div>`;

const htmlRegister = `<div class="contenedorLogin">
    <div class="cajaLogin">
        <p>Crear cuenta</p>
        <form class="formLogin">
            <div class="input-group">
                <input type="email" class="form-control" id="loginEmail" placeholder="Email" name="loginEmail" autocomplete required>
            </div>
            <div class="input-group">
                <input type="password" class="form-control" id="loginPassword" placeholder="Password" name="loginPassword" autocomplete required>
            </div>
            <div class="input-group">
                <input type="password" class="form-control" id="reLoginPassword" placeholder="Repetir Password" name="reLoginPassword">
            </div>
            <div class="row">
                <div class="col-4">
                <button type="submit"  id="iniciar-sesion" class="btnAmarillo">Crear Cuenta</button>
                </div>
            </div>
        </form>
    </div>
</div>`;

var formulario;
var inputEmail;
var inputPassword;
var inputRepetirPass;

export async function login() {
  crearFormulario(false);
}


// !con el tema de registrar usuario funciona igual que con el login, se crea un formulario pero con el registrar en true
export function register() {
  crearFormulario(true);
}

//  !se le asigna el html para registrar y en la parte del submit se registra el usuario 
//  !se re redirige a la funcion registrar usuario se toma el email, passwor y reafirmacion de la contrasena
// ! se validan que las contrasenas sean iguales, tambien se valida el email
function crearFormulario(registrar) {
  const carrusel = document.querySelector(".carrusel");
  if (carrusel) carrusel.innerHTML = "";

  const seccionProductos = document.querySelector(".seccionProductos");
  if (seccionProductos) seccionProductos.innerHTML = "";

  const vistaProducto = document.querySelector(".vistaProducto");
  if (vistaProducto) vistaProducto.innerHTML = "";

  const seccionLogin = document.querySelector(".seccionLogin");
  console.log("LOGIN", seccionLogin);

  if (seccionLogin) {
    if (registrar) seccionLogin.innerHTML = htmlRegister;
    else seccionLogin.innerHTML = htmlLogin;
  }

  inputEmail = document.getElementById("loginEmail");
  inputPassword = document.getElementById("loginPassword");
  inputRepetirPass = document.getElementById("reLoginPassword");
  formulario = document.getElementsByClassName("formLogin")[0];

  console.log(formulario);

  if (!formulario) return;

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (registrar) await registrarUsuario(event);
    else await ingresar(event);
  });
}

async function ingresar(e) {
  e.preventDefault();
  const email = inputEmail?.value;
  const password = inputPassword?.value;
  if (!email || !password) {
    alert("Debe ingresar usuario y contraseña");
    return;
  }

  const existeUsuario = await usuarioExiste();
  if (!existeUsuario) {
    mostrarMensaje("Email o contraseña incorrecto, intenta nuevamente.");
    return;
  }

  setUsuarioAutenticado(parseInt(existeUsuario) > 0, existeUsuario);
  location.replace("#");
}

async function registrarUsuario(e) {
  e.preventDefault();
  const email = inputEmail?.value;
  const password = inputPassword?.value;
  const rePassword = inputRepetirPass?.value;

  // Valida la informacion ingresada por el usuario
  if (password !== rePassword) {
    mostrarMensaje("Las contraseñas no coinciden.");
    return;
  }
  if (!email) {
    mostrarMensaje("Debe ingresar un correo valido.");
    return;
  }

  //  !donde se llama al servicio de usuarios y se crea un usuario como customer osea cliente
  await usuariosServices.crear(
    "",
    "",
    email,
    password,
    "",
    "",
    "",
    "",
    "",
    "customer"
  );

  //  !despues de eso se llama al ingresar, para loguear al usuario recien creado 
  await ingresar(e);
}

async function usuarioExiste() {
  let usuarios = await usuariosServices.listar();
  let exists = usuarios.some(
    (usuario) =>
      usuario.correo === inputEmail?.value &&
      usuario.password === inputPassword?.value
  );
  if (!exists) return false;
  const usuario = usuarios.find(
    (u) => u.correo === inputEmail?.value && u.password === inputPassword?.value
  );
  return !usuario ? false : usuario.id;
}

export function mostrarUsuario() {
  const email = sessionStorage.getItem("correo-usuario");
  const btnLogin = document.getElementsByClassName("btnLogin")[0];
  const btnRegistrar = document.getElementsByClassName("btnRegister")[0];
  if (!email || email === "null") {
    btnLogin.textContent = "Log In";
    btnRegistrar.textContent = "Registrarse";
    btnRegistrar.href = "#register";
  } else {
    btnLogin.textContent = email;
    btnRegistrar.textContent = "Logout";
    btnRegistrar.href = "#logout";
  }
}

/**
 * Esta función muestra una alerta con el texto recibido en el parámetro msj.
 */
function mostrarMensaje(msj) {
  alert(msj);
}

export function setUsuarioAutenticado(booleano, idUsuario) {
  sessionStorage.setItem("autenticado", booleano);
  sessionStorage.setItem("id-usuario", idUsuario);
  sessionStorage.setItem("correo-usuario", inputEmail?.value ?? null);
  console.log("Correo Usuario:", inputEmail?.value);
  mostrarUsuario();
}

export function getUsuarioAutenticado() {
  const autenticado = sessionStorage.getItem("autenticado");
  const idUsuario = sessionStorage.getItem("id-usuario");
  const correoUsuario = sessionStorage.getItem("correo-usuario");

  return {
    autenticado,
    idUsuario,
    correoUsuario,
  };
}
