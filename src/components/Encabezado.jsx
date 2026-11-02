import { Link, NavLink } from 'react-router-dom'
import { useCarrito } from '../hooks/useCarrito'
import { useSesion } from '../hooks/useSesion'

function Encabezado() {
  const { cantidadTotal } = useCarrito()
  const { usuario, cerrarSesion } = useSesion()

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
          {usuario ? (
            <>
              <NavLink to="/mi-cuenta">{usuario.nombre}</NavLink>
              <button type="button" className="encabezado__salir" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <NavLink to="/login">Iniciar sesión</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Encabezado
