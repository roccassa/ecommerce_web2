import { Link } from 'react-router-dom'
import ItemCarrito from '../components/ItemCarrito'
import SinResultados from '../components/SinResultados'
import { useCarrito } from '../hooks/useCarrito'

function Carrito() {
  const { items, aumentar, disminuir, eliminar, vaciar, total } = useCarrito()

  if (items.length === 0) {
    return (
      <section className="carrito carrito--vacio">
        <h1>Carrito</h1>
        <SinResultados mensaje="Tu carrito está vacío." />
        <Link to="/productos" className="boton">
          Ir al catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className="carrito">
      <h1>Carrito</h1>

      <ul className="carrito__lista">
        {items.map((item) => (
          <ItemCarrito
            key={item.id}
            item={item}
            onAumentar={aumentar}
            onDisminuir={disminuir}
            onEliminar={eliminar}
          />
        ))}
      </ul>

      <div className="carrito__resumen">
        <p className="carrito__total">
          Total: <strong>${total.toFixed(2)}</strong>
        </p>
        <div className="carrito__acciones">
          <button type="button" className="boton boton--secundario" onClick={vaciar}>
            Vaciar carrito
          </button>
          <Link to="/checkout" className="boton">
            Ir a pagar
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Carrito
