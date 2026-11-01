import { Link, useParams } from 'react-router-dom'
import Cargando from '../components/Cargando'
import CompraProducto from '../components/CompraProducto'
import GaleriaImagenes from '../components/GaleriaImagenes'
import ListaResenas from '../components/ListaResenas'
import MensajeError from '../components/MensajeError'
import { useProducto } from '../hooks/useProducto'

function Detalle() {
  const { id } = useParams()
  const { producto, cargando, error, reintentar } = useProducto(id)

  function renderizarProducto() {
    if (cargando) return <Cargando />
    if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />

    return (
      <>
        <div className="detalle__principal">
          <GaleriaImagenes
            key={producto.id}
            imagenes={producto.imagenes.length > 0 ? producto.imagenes : [producto.imagen]}
            nombre={producto.nombre}
          />

          <div className="detalle__info">
            <span className="detalle__categoria">{producto.categoria}</span>
            <h1 className="detalle__nombre">{producto.nombre}</h1>
            <p className="detalle__marca">Marca: {producto.marca}</p>

            <div className="detalle__precios">
              <span className="detalle__precio">${producto.precioConDescuento.toFixed(2)}</span>
              {producto.descuento > 0 && (
                <>
                  <s className="detalle__precio-original">${producto.precio.toFixed(2)}</s>
                  <span className="detalle__descuento">-{producto.descuento.toFixed(0)}%</span>
                </>
              )}
            </div>

            <p className="detalle__datos">
              ★ {producto.calificacion.toFixed(1)} · {producto.stock} en stock
            </p>
            <p>{producto.descripcion}</p>

            <CompraProducto key={producto.id} producto={producto} />
          </div>
        </div>

        <h2>Reseñas</h2>
        <ListaResenas resenas={producto.resenas} />
      </>
    )
  }

  return (
    <section className="detalle">
      <Link to="/productos" className="boton boton--secundario detalle__regresar">
        ← Regresar al catálogo
      </Link>

      {renderizarProducto()}
    </section>
  )
}

export default Detalle
