import { Outlet } from 'react-router-dom'
import Encabezado from './Encabezado'
import PiePagina from './PiePagina'

// Estructura común a todas las páginas: el encabezado arriba y la página actual debajo
function Plantilla() {
  return (
    <>
      <Encabezado />
      <main className="contenedor">
        <Outlet />
      </main>
      <PiePagina />
    </>
  )
}

export default Plantilla
