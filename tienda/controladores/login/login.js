import { App } from "../../../App/App.js";
/**ESTE MODULO SE ENCARGA DE RENDERIZAR LA PANTALLA DE LOGIN Y DE REGISTRO SEGUN CORRESPONDA */
import { usuariosServices } from "../../../servicios/usuarios-servicios.js";

/**1- Se debe asignar a la siguiente constante todo el código correspondiente al componente de login (/asset/modulos/login.html)  */
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
        <p >Iniciar sesión</p>
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
                <button type="submit"  id="iniciar-sesion" class="btnAmarillo">Login</button>
                </div>
            </div>
        </form>
    </div>
</div>`;

/*2-Se deben definir 4 variables globales al módulo, una para el formulario html, y otras tres para los inputs de email, contraseña y
 *   repetir contraseña
 */
var formulario;
var inputEmail;
var inputPassword;
var inputRepetirPass;

export async function login() {
  /** 3- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de login
   *
   */
  crearFormulario(false);
}

export function register() {
  /** 4- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de registro.
   *     Esta función es similar a la de login, pero en el llamado a la función crearFormulario lo hace pasando el valor true al
   *     al parámetro registro que espera función mencionada.
   *     Por último enlaza el evento submit del formulario a la función registrarUsuario.
   *
   */
  crearFormulario(true);
}

function crearFormulario(registrar) {
  /**
   * 1- Esta función deberá capturar el elemento cuya clase es .carrusel y le asignará en su interior un blanco para eliminar su contenido previo.
   * 2- Deberá realizar lo mismo para la clase .seccionProductos y .vistaProducto.
   * 3- Luego deberá capturar la .seccionLogin para asignarle el contenido html del componente login, el cual se encuentra previamente
   *    cargado en la constante htmlLogin.
   * 4- Deberá capturar los id correspondientes a loginEmail, loginPassword y reLoginPassword para asignarlos a las variable definidas
   *    inputEmail, inputPassword e inputRepetirPass.
   * 5- En el caso que el parámetro registrar sea falso deberá eliminar el contenido del elemento id reLoginPassword.
   * 6- Para el caso que el parámetro registrar sea verdadero deberá cambiar el valor de la propiedad css dysplay a block. De esta forma
   *    el input reLoginPassword se mostrará en pantalla.
   * 7- Por último se deberá capturar el formulario indentificado con la clase .formLogin y asignarlo a la variable global formulario.
   */
  console.log(document.children);
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
  /**
   * 1- Esta función tiene como objetivo controlar que el texto en inputEmail e inputPassword se corresponda con alguna cuenta almacenada
   *    en el REST-API.
   * 2- Para ello en primera instancia deberá cancelar el comportamiento por defecto del envento recibido . Para ello deberá
   *    tomar el parámetro evento ( e ) y ejecutar el método preventDefault().
   * 3- Luego se deberá llamar la función llamada usuarioExiste. La misma devuelve un valor falso si el usuario no existe y el id del
   *    usuario en el caso que la cuenta sea válida.
   * 4- Através de una estructura de desición se deberá, en el caso de que el usuario sea válido :
   *     a- Llamar a la función setUsuarioAutenticado (usuariosServices) pasandole como parámetro el valor true y el id del usuario. De esta forma dicha
   *        función guardará estos datos en el sessionStorage del navegado, para poder ser consultados en el momento de la compra.
   *     b- Llamar a la función mostrarUsuario, pasandole como parámetro el texto del email de la cuenta.
   * 5- En el caso de que el usuario no sea válido se deberá mostrar una alerta con el texto 'Email o contraseña incorrecto, intenta nuevamente'.
   */
  console.log("Hola");

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

  setUsuarioAutenticado(email, existeUsuario);
  location.replace("#");
}

async function registrarUsuario(e) {
  /**
   * 1- Esta función tiene como objetivo controlar que el texto en inputPassword sea exactamente igual al texto ingresado en
   *    inputRepetirPass y luego registrar la cuenta en el REST-API.
   * 2- Para ello en primera instancia deberá cancelar el comportamiento por defecto del envento recibido . Para ello deberá
   *    tomar el parámetro evento ( e ) y ejecutar el método preventDefault().
   * 3- Luego se comparará con una estructura de decisión si los textos ingresados en los controles mencionados son exactamente iguales.
   * 4- En caso afirmativo utilizando usuariosServices mediante el método crear, dará de alta el nuevo usuario.
   * 5- Deberá mostrar una alerta con la leyenda "Email registrado" y cambiará el valor del objeto window.location.href a "#login", para que
   *    se muestre la pantalla de login.
   * 5- En caso negativo o falso mostrará una alerta indicando que las contraseñas ingresadas no son iguales.
   */
  e.preventDefault();
  const email = inputEmail?.value;
  const password = inputPassword?.value;
  const rePassword = inputRepetirPass?.value;

  if (password !== rePassword) {
    mostrarMensaje("Las contraseñas no coinciden.");
    return;
  }
}

async function usuarioExiste() {
  /**
   * 1- El objetivo de esta función es consultar la lista de usuarios con la función usuariosServices.listar() y mediante
   *    un bucle comparar el email y la contraseña ingresado por el usuario en inputEmail e inputPassword con los previamente
   *    almacenados dentro del API-REST sobre el recuros usuarios.
   * 2- Si el email y la contraseña son válidos devuelve el id de usuario.
   * 3- Si el email y la contraseña no son válido devuelve falso.
   */
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
  /**
   * 1- Esta función deberá capturar del dom la clase .btnLogin y asignarle el texto existente en el parámetro email.
   * 2- Deberá capturar del dom la clase .btnRegister y asignarle el texto "Logout" y a este elemento asignarle el valor
   *    "#logout" sobre el atributo href.
   **/
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

function mostrarMensaje(msj) {
  /**
   * Esta función muestra una alerta con el texto recibido en el parámetro msj.
   */
  alert(msj);
}

export function setUsuarioAutenticado(booleano, idUsuario) {
  /**
   * 1- Esta función deberá registar en el sessionStorage tres valores: autenticado, idUsuario y email.
   * 2- Los valores de los mismos serán tomados de los dos parámetros recibidos y el email será tomado desde la variable
   *    inputEmail.
   */
  sessionStorage.setItem("autenticado", booleano);
  sessionStorage.setItem("id-usuario", idUsuario);
  sessionStorage.setItem("correo-usuario", inputEmail?.value ?? null);
  console.log("Correo Usuario:", inputEmail?.value);
  mostrarUsuario();
}
export function getUsuarioAutenticado() {
  /**
   * 1- Esta función debera leer los valores almacenados en el sessionStorage y construir un objeto con los valores
   * autenticado, idUsuario y email.
   * 2- Luego los devolverá como resultado.
   */
  const autenticado = sessionStorage.getItem("autenticado");
  const idUsuario = sessionStorage.getItem("id-usuario");
  const correoUsuario = sessionStorage.getItem("correo-usuario");

  return {
    autenticado,
    idUsuario,
    correoUsuario,
  };
}
