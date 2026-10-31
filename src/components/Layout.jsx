import { Outlet } from 'react-router-dom'
import Encabezado from './Encabezado'

// Estructura común a todas las páginas: el encabezado arriba y la página actual debajo
function Layout() {
  return (
    <>
      <Encabezado />
      <main className="contenedor">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
