import { Link, NavLink } from 'react-router-dom'
import { useCarrito } from '../hooks/useCarrito'

function Encabezado() {
  const { cantidadTotal } = useCarrito()

  return (
    <header className="encabezado">
      <div className="encabezado__contenido">
        <Link to="/" className="encabezado__logo">
          TechStore Pro
        </Link>

        <nav className="encabezado__nav">
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/carrito">Carrito
          <span className="encabezado__contador">{cantidadTotal}</span>
          </NavLink>
          <NavLink to="/login">Iniciar sesión</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Encabezado
