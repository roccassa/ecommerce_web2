import { useEffect, useState } from 'react'
import { obtenerCategorias } from '../services/productosService'

// Hook que carga una sola vez la lista de categorías para el filtro del catálogo.
// Devuelve { categorias, cargando, error }.
export function useCategorias() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignorar = false

    obtenerCategorias()
      .then((datos) => {
        if (!ignorar) setCategorias(datos)
      })
      .catch((error) => {
        if (!ignorar) setError(error.message)
      })
      .finally(() => {
        if (!ignorar) setCargando(false)
      })

    return () => {
      ignorar = true
    }
  }, [])

  return { categorias, cargando, error }
}
