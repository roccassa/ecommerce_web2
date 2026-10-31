import { Link } from 'react-router-dom'

// Recibe un producto ya adaptado por productosService
function TarjetaProducto({ producto }) {
  const { id, nombre, categoria, precio, calificacion, stock, imagen } = producto

  return (
    <article className="tarjeta-producto">
      <Link to={`/producto/${id}`} className="tarjeta-producto__enlace">
        <img src={imagen} alt={nombre} className="tarjeta-producto__imagen" loading="lazy" />

        <div className="tarjeta-producto__info">
          <span className="tarjeta-producto__categoria">{categoria}</span>
          <h3 className="tarjeta-producto__nombre">{nombre}</h3>
          <p className="tarjeta-producto__precio">${precio.toFixed(2)}</p>
          <p className="tarjeta-producto__detalles">
            <span>★ {calificacion.toFixed(1)}</span>
            <span>{stock > 0 ? `${stock} en stock` : 'Agotado'}</span>
          </p>
        </div>
      </Link>
    </article>
  )
}

export default TarjetaProducto
