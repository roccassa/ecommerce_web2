import { useContext } from 'react'
import { SesionContexto } from '../context/SesionContexto'

// Hook para usar la sesión desde cualquier componente
export function useSesion() {
  const contexto = useContext(SesionContexto)

  if (!contexto) {
    throw new Error('useSesion debe ser utilizado dentro de un SesionProvider')
  }

  return contexto
}
