import { Link } from 'react-router-dom'
import SelectorCantidad from './SelectorCantidad'

// Fila del carrito; las acciones las recibe por props desde la página
function ItemCarrito({ item, onAumentar, onDisminuir, onEliminar }) {
  const { id, nombre, precio, imagen, cantidad, stock } = item

  function manejarCambio(nuevaCantidad) {
    if (nuevaCantidad > cantidad) {
      onAumentar(id)
    } else {
      onDisminuir(id)
    }
  }

  return (
    <li className="item-carrito">
      <img src={imagen} alt={nombre} className="item-carrito__imagen" />

      <div className="item-carrito__info">
        <Link to={`/producto/${id}`} className="item-carrito__nombre">
          {nombre}
        </Link>
        <span className="item-carrito__precio">${precio.toFixed(2)} c/u</span>
      </div>

      <SelectorCantidad
        cantidad={cantidad}
        maximo={stock ?? Infinity}
        onCambiar={manejarCambio}
      />

      <strong className="item-carrito__subtotal">${(precio * cantidad).toFixed(2)}</strong>

      <button type="button" className="item-carrito__eliminar" onClick={() => onEliminar(id)}>
        Eliminar
      </button>
    </li>
  )
}

export default ItemCarrito
