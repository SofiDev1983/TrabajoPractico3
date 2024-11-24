class Usuario {
  /**
   *
   * @param {string} apellido
   * @param {string} nombre
   * @param {string} correo correo del usuario
   * @param {string} password contrasena
   * @param {string} avatar url de la foto del usuario
   * @param {string} pais
   * @param {string} ciudad
   * @param {string} direccion
   * @param {string} telefono
   * @param {string} role rol del usuario ("admin" o "user")
   */
  constructor(
    apellido,
    nombre,
    correo,
    password,
    avatar,
    pais,
    ciudad,
    direccion,
    telefono,
    role
  ) {
    this.apellido = apellido;
    this.nombre = nombre;
    this.correo = correo;
    this.password = password;
    this.avatar = avatar;
    this.pais = pais;
    this.ciudad = ciudad;
    this.direccion = direccion;
    this.telefono = telefono;
    this.role = role;
  }
}
