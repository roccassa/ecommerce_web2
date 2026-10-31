import { useState } from 'react'
import Buscador from '../components/Buscador'
import FiltroCategoria from '../components/FiltroCategoria'
import TarjetaProducto from '../components/TarjetaProducto'
import Cargando from '../components/Cargando'
import MensajeError from '../components/MensajeError'
import SinResultados from '../components/SinResultados'
import { useProductos } from '../hooks/useProductos'
import { useCategorias } from '../hooks/useCategorias'

const PRODUCTOS_POR_PAGINA = 12

function Catalogo() {
  const [textoBuscador, setTextoBuscador] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')

  const { categorias, cargando: cargandoCategorias } = useCategorias()
  const { productos, total, cargando, error, reintentar } = useProductos({
    texto: busqueda,
    categoria,
    limit: PRODUCTOS_POR_PAGINA,
    skip: 0,
  })

  // La API no permite buscar dentro de una categoría, así que buscar quita el filtro de categoría
  function manejarBusqueda(texto) {
    setBusqueda(texto)
    setCategoria('')
  }

  // Y elegir una categoría limpia la búsqueda
  function manejarCategoria(nuevaCategoria) {
    setCategoria(nuevaCategoria)
    setBusqueda('')
    setTextoBuscador('')
  }

  function renderizarProductos() {
    if (cargando) return <Cargando />
    if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />
    if (productos.length === 0) {
      return <SinResultados mensaje={`No encontramos productos para "${busqueda}".`} />
    }

    return (
      <>
        <p className="catalogo__resumen">
          Mostrando {productos.length} de {total} productos
        </p>
        <div className="grid-productos">
          {productos.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>
      </>
    )
  }

  return (
    <section className="catalogo">
      <h1>Catálogo</h1>

      <div className="catalogo__controles">
        <Buscador valor={textoBuscador} onCambiar={setTextoBuscador} onBuscar={manejarBusqueda} />
        <FiltroCategoria
          categorias={categorias}
          valor={categoria}
          onCambiar={manejarCategoria}
          deshabilitado={cargandoCategorias}
        />
      </div>

      {renderizarProductos()}
    </section>
  )
}

export default Catalogo
