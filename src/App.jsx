import { Route, Routes } from 'react-router-dom'
import Plantilla from './components/Plantilla'
import RutaProtegida from './components/RutaProtegida'
import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import Detalle from './pages/Detalle'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import MiCuenta from './pages/MiCuenta'
import Checkout from './pages/Checkout'
import NoEncontrada from './pages/NoEncontrada'

function App() {
  return (
    <Routes>
      <Route element={<Plantilla />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Catalogo />} />
        <Route path="/producto/:id" element={<Detalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mi-cuenta"
          element={
            <RutaProtegida>
              <MiCuenta />
            </RutaProtegida>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
