import { useEffect, useState } from 'react'
import {
  buscarProductos,
  obtenerProductos,
  obtenerProductosPorCategoria,
} from '../services/productosService'

// Elige qué endpoint usar según los filtros: búsqueda, categoría o la lista general
function pedirProductos({ texto, categoria, ...opciones }) {
  if (texto) return buscarProductos(texto, opciones)
  if (categoria) return obtenerProductosPorCategoria(categoria, opciones)
  return obtenerProductos(opciones)
}

// Hook que carga productos desde la API cada vez que cambian los filtros.
// Recibe { texto, categoria, limit, skip, sortBy, order } y devuelve
// { productos, total, cargando, error, reintentar }.
export function useProductos({ texto = '', categoria = '', limit, skip, sortBy, order } = {}) {
  const [intento, setIntento] = useState(0)
  const [resultado, setResultado] = useState({ clave: null, productos: [], total: 0, error: null })

  // La clave identifica la petición actual; si el resultado guardado es de otra clave, sigue cargando
  const clave = JSON.stringify({ texto, categoria, limit, skip, sortBy, order, intento })

  useEffect(() => {
    // Evita guardar la respuesta de una petición vieja si los filtros cambiaron antes de que terminara
    let ignorar = false

    pedirProductos({ texto, categoria, limit, skip, sortBy, order })
      .then(({ productos, total }) => {
        if (!ignorar) setResultado({ clave, productos, total, error: null })
      })
      .catch((error) => {
        if (!ignorar) setResultado({ clave, productos: [], total: 0, error: error.message })
      })

    return () => {
      ignorar = true
    }
  }, [clave, texto, categoria, limit, skip, sortBy, order])

  // Volver a hacer la misma petición (para el botón "Reintentar")
  function reintentar() {
    setIntento((actual) => actual + 1)
  }

  return {
    productos: resultado.productos,
    total: resultado.total,
    cargando: resultado.clave !== clave,
    error: resultado.clave === clave ? resultado.error : null,
    reintentar,
  }
}
