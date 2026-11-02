// Servicio de autenticación: inicio de sesión contra DummyJSON y su adaptador

const URL_LOGIN = 'https://dummyjson.com/auth/login'

// Convierte el usuario de la API a nuestro formato
function adaptarUsuario(usuario) {
  return {
    id: usuario.id,
    usuario: usuario.username,
    nombre: `${usuario.firstName} ${usuario.lastName}`,
    correo: usuario.email,
    foto: usuario.image,
    token: usuario.accessToken,
  }
}

// POST /auth/login — envía usuario y contraseña en JSON y devuelve el usuario adaptado
export async function iniciarSesion(usuario, contrasena) {
  const respuesta = await fetch(URL_LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: usuario, password: contrasena }),
  })

  // La API responde 400 cuando las credenciales son incorrectas
  if (respuesta.status === 400 || respuesta.status === 401) {
    throw new Error('Usuario o contraseña incorrectos.')
  }

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al iniciar sesión.`)
  }

  const datos = await respuesta.json()
  return adaptarUsuario(datos)
}
