import { useState } from 'react'
import SelectorCantidad from './SelectorCantidad'
import { useCarrito } from '../hooks/useCarrito'

// Selector de cantidad y botón para agregar al carrito.
// Lo que ya está en el carrito cuenta contra el stock, para no poder pasarse agregando varias veces.
function CompraProducto({ producto }) {
  const { items, agregar } = useCarrito()
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  const enCarrito = items.find((item) => item.id === producto.id)?.cantidad ?? 0
  const disponible = producto.stock - enCarrito

  function manejarCambio(nuevaCantidad) {
    setCantidad(nuevaCantidad)
    setAgregado(false)
  }

  function manejarAgregar() {
    // El carrito cobra el campo precio, así que se le pasa el precio ya con descuento
    agregar({ ...producto, precio: producto.precioConDescuento }, cantidad)
    setCantidad(1)
    setAgregado(true)
  }

  return (
    <div className="compra">
      {disponible > 0 ? (
        <div className="compra__controles">
          <SelectorCantidad cantidad={cantidad} maximo={disponible} onCambiar={manejarCambio} />
          <button type="button" className="boton" onClick={manejarAgregar}>
            Agregar al carrito
          </button>
        </div>
      ) : (
        <p className="compra__aviso">
          {producto.stock === 0
            ? 'Producto agotado.'
            : 'Ya tienes en tu carrito todo el stock disponible.'}
        </p>
      )}

      {agregado && (
        <p className="compra__confirmacion" role="status">
          Producto agregado al carrito.
        </p>
      )}
    </div>
  )
}

export default CompraProducto
