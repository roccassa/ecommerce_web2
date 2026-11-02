// Servicio de autenticación: inicio de sesión contra DummyJSON y su adaptador

const URL_LOGIN = 'https://dummyjson.com/auth/login'

// Usuarios de prueba propios de la app: edwin no existe en DummyJSON y la API no permite
// crear usuarios (POST /users/add solo simula), así que estos se validan aquí, sin petición
const USUARIOS_LOCALES = [
  {
    username: 'edwin',
    password: 'edwinpass',
    id: 'local-1',
    firstName: 'Edwin',
    lastName: 'Cambindo',
    email: 'edwin@pasenosporfavor.com',
    image: 'https://media.bolavip.com/wp-content/uploads/sites/23/2026/07/24122156/Diber-Cambindo-Leon-1200x740.jpg',
    accessToken: null,
  },
]

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

// Primero busca en los usuarios locales; si no coincide, usa POST /auth/login enviando
// usuario y contraseña en JSON. En ambos casos devuelve el usuario adaptado
export async function iniciarSesion(usuario, contrasena) {
  const usuarioLocal = USUARIOS_LOCALES.find(
    (local) => local.username === usuario && local.password === contrasena,
  )

  if (usuarioLocal) {
    return adaptarUsuario(usuarioLocal)
  }

  let respuesta

  // fetch solo falla aquí cuando no hay conexión; las respuestas con error se revisan abajo
  try {
    respuesta = await fetch(URL_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usuario, password: contrasena }),
    })
  } catch {
    throw new Error('No se pudo conectar. Revisa tu internet e intenta de nuevo.')
  }

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
