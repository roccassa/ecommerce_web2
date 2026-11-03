import { createContext, useEffect, useState } from 'react'
import { iniciarSesion as iniciarSesionApi } from '../services/authService'

export const SesionContexto = createContext(null)

const CLAVE_ALMACENAMIENTO = 'sesion'

// Lee la sesión guardada; si no hay o está dañada, no hay sesión
function leerSesion() {
  try {
    const guardada = localStorage.getItem(CLAVE_ALMACENAMIENTO)
    return guardada ? JSON.parse(guardada) : null
  } catch {
    return null
  }
}

// Comparte el usuario actual con toda la aplicación y conserva la sesión al recargar
export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion)

  // Cada cambio de sesión se refleja en localStorage
  useEffect(() => {
    if (usuario) {
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(usuario))
    } else {
      localStorage.removeItem(CLAVE_ALMACENAMIENTO)
    }
  }, [usuario])

  // Si las credenciales son incorrectas, el error llega a quien llamó (la página de login)
  async function iniciarSesion(nombreUsuario, contrasena) {
    const datos = await iniciarSesionApi(nombreUsuario, contrasena)
    setUsuario(datos)
  }

  function cerrarSesion() {
    setUsuario(null)
  }

  const valor = { usuario, iniciarSesion, cerrarSesion }

  return <SesionContexto.Provider value={valor}>{children}</SesionContexto.Provider>
}
