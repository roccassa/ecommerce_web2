import { useEffect, useState } from 'react'
import { obtenerCategorias } from '../services/productosService'

// Hook que carga la lista de categorías para el filtro del catálogo.
// Devuelve { categorias, cargando, error, reintentar }.
export function useCategorias() {
  const [intento, setIntento] = useState(0)
  const [resultado, setResultado] = useState({ intento: null, categorias: [], error: null })

  useEffect(() => {
    let ignorar = false

    obtenerCategorias()
      .then((categorias) => {
        if (!ignorar) setResultado({ intento, categorias, error: null })
      })
      .catch((error) => {
        if (!ignorar) setResultado({ intento, categorias: [], error: error.message })
      })

    return () => {
      ignorar = true
    }
  }, [intento])

  // Volver a hacer la petición (para el botón "Reintentar")
  function reintentar() {
    setIntento((actual) => actual + 1)
  }

  // Igual que en useProductos: si el resultado guardado es de otro intento, sigue cargando
  const vigente = resultado.intento === intento

  return {
    categorias: resultado.categorias,
    cargando: !vigente,
    error: vigente ? resultado.error : null,
    reintentar,
  }
}
