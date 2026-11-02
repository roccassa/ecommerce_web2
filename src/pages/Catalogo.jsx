import { useState } from 'react'
import Buscador from '../components/Buscador'
import FiltroCategoria from '../components/FiltroCategoria'
import SelectorOrden from '../components/SelectorOrden'
import Paginacion from '../components/Paginacion'
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
  const [orden, setOrden] = useState('')
  const [pagina, setPagina] = useState(1)

  //Ordenamiento
  const [sortBy, order] = orden ? orden.split('-') : [undefined, undefined]

  const {
    categorias,
    cargando: cargandoCategorias,
    error: errorCategorias,
    reintentar: reintentarCategorias,
  } = useCategorias()
  const { productos, total, cargando, error, reintentar } = useProductos({
    texto: busqueda,
    categoria,
    limit: PRODUCTOS_POR_PAGINA,
    skip: (pagina - 1) * PRODUCTOS_POR_PAGINA,
    sortBy, 
    order
  })

  const totalPaginas = Math.ceil(total/PRODUCTOS_POR_PAGINA)

  // La API no permite buscar dentro de una categoría, así que buscar quita el filtro de categoría
  function manejarBusqueda(texto) {
    setBusqueda(texto)
    setCategoria('')
    setPagina(1)
  }

  // Y elegir una categoría limpia la búsqueda
  function manejarCategoria(nuevaCategoria) {
    setCategoria(nuevaCategoria)
    setBusqueda('')
    setTextoBuscador('')
    setPagina(1)
  }

  // Cambiar el orden también regresa a la primera página
  function manejarOrden(nuevoOrden) {
    setOrden(nuevoOrden)
    setPagina(1)
  }

  function renderizarProductos() {
    if (cargando) return <Cargando />
    if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />
    if (productos.length === 0) {
      const mensaje = busqueda
        ? `No encontramos productos para "${busqueda}".`
        : 'No hay productos disponibles.'

      return <SinResultados mensaje={mensaje} />
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
        <Paginacion
          paginaActual={pagina}
          totalPaginas={totalPaginas}
          onCambiar={setPagina}
        />
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
          cargando={cargandoCategorias}
        />
        <SelectorOrden valor={orden} onCambiar={manejarOrden} />
      </div>

      {/* Si fallan las categorías los productos siguen visibles: son peticiones independientes */}
      {errorCategorias && (
        <div className="catalogo__error-categorias">
          <MensajeError
            mensaje="No se pudieron cargar las categorías."
            onReintentar={reintentarCategorias}
          />
        </div>
      )}

      {renderizarProductos()}
    </section>
  )
}

export default Catalogo
