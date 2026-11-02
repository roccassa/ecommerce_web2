import { Navigate } from 'react-router-dom'
import { useSesion } from '../hooks/useSesion'

// Muestra su contenido solo con sesión iniciada; sin sesión redirige a /login
function RutaProtegida({ children }) {
  const { usuario } = useSesion()

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RutaProtegida
