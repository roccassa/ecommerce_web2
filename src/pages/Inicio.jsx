import { Link } from 'react-router-dom'
import TarjetaProducto from '../components/TarjetaProducto'
import Cargando from '../components/Cargando'
import { useProductos } from '../hooks/useProductos'
import MensajeError from '../components/MensajeError'
import imagenSucursales from '../images/sucursales.jpg'


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
    <section className="inicio">
      <div className="inicio__presentacion">
        <div className="inicio__texto">
          <h1>Bienvenido a TechStore Pro</h1>
          <p className="inicio__subtitulo">Productos tecnológicos y más</p>
          <p className='presentacion'>Aquí encontrarás una gran variedad de articulos exclusivos, los cuales podrás adquirir visitando
            alguna de nuestras sucursales en el país o por medio de nuestra tienda en línea.
          </p>
          <p className='presentacion'>Somos una tienda líder en el mercado, tenemos presencia en 15 sucursales en
             todo el país. Además de nuestras sucursales, llevamos años liderando el mercado, desde 2013 nos
             hemos mantenido en el top 3 de las empresas con mayor número de ventas</p>
          <Link to="/productos" className="boton">
            Ver artículos
          </Link>
        </div>

        <img
          src={imagenSucursales}
          alt="Sucursales de TechStore Pro"
          className="inicio__imagen"
        />
      </div>

      <h1>Productos destacados</h1>
      {mostrarDestacados()}
    </section>
  )
}

export default Inicio
