import { Link } from 'react-router-dom'
import TarjetaProducto from '../components/TarjetaProducto'
import Cargando from '../components/MensajeError'
import { useProductos } from '../hooks/useProductos'
import MensajeError from '../components/MensajeError'


function Inicio() {

  const { productos, cargando, error, reintentar } = useProductos({ limit: 4})

  function mostrarDestacados(){
    if(cargando) return <Cargando/>
    if(error) return <MensajeError mensaje={error} onReintentar={reintentar}/>

    return(
      <div className='grid-productos'>
        {productos.map((producto)=> (
          <TarjetaProducto key={producto.id} producto={producto}/>
        ))}
      </div>
    )
  }

  return (
    <section className="Inicio">
      <div style={{ textAlign: 'center', padding: '48px 16px'}}>
        <h1>Bienvenido a Techstore Pro</h1>
        <p>Productos tecnologicos y mas</p>
        <Link to="/productos" className="boton">
        Ver articulos
        </Link>
      </div>

      <h1>Productos destacados</h1>
      {mostrarDestacados()}
    </section>
  )
}

export default Inicio
