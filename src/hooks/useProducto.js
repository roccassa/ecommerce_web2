import { useEffect, useState } from 'react'
import { obtenerProductoPorId } from '../services/productosService'

// Hook que carga un producto por su id.
// Devuelve { producto, cargando, error, reintentar }.
export function useProducto(id) {
  const [intento, setIntento] = useState(0)
  const [resultado, setResultado] = useState({ clave: null, producto: null, error: null })

  // Igual que en useProductos: si el resultado guardado es de otra clave, sigue cargando
  const clave = `${id}-${intento}`

  useEffect(() => {
    let ignorar = false

    obtenerProductoPorId(id)
      .then((producto) => {
        if (!ignorar) setResultado({ clave, producto, error: null })
      })
      .catch((error) => {
        if (!ignorar) setResultado({ clave, producto: null, error: error.message })
      })

    return () => {
      ignorar = true
    }
  }, [clave, id])

  // Volver a hacer la misma petición (para el botón "Reintentar")
  function reintentar() {
    setIntento((actual) => actual + 1)
  }

  const vigente = resultado.clave === clave

  return {
    producto: vigente ? resultado.producto : null,
    cargando: !vigente,
    error: vigente ? resultado.error : null,
    reintentar,
  }
}
