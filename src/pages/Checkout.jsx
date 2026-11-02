import { useState } from 'react'
import { Link } from 'react-router-dom'
import CampoFormulario from '../components/CampoFormulario'
import ResumenPedido from '../components/ResumenPedido'
import SinResultados from '../components/SinResultados'
import { useCarrito } from '../hooks/useCarrito'
import { useFormularioCheckout } from '../hooks/useFormularioCheckout'

function Checkout() {
  const { items, total, vaciar } = useCarrito()
  const { valores, errores, manejarCambio, validar } = useFormularioCheckout()
  const [pedido, setPedido] = useState(null)

  function manejarEnvio(evento) {
    evento.preventDefault()

    if (!validar()) return

    // Se guarda una copia del pedido porque el carrito queda vacío al confirmar
    setPedido({ items, total, nombre: valores.nombre.trim() })
    vaciar()
  }

  if (pedido) {
    return (
      <section className="checkout checkout--confirmado">
        <h1>¡Compra exitosa!</h1>
        <p role="status">Gracias, {pedido.nombre}. Tu pedido quedó confirmado.</p>
        <ResumenPedido items={pedido.items} total={pedido.total} />
        <Link to="/productos" className="boton">
          Seguir comprando
        </Link>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="checkout checkout--vacio">
        <h1>Checkout</h1>
        <SinResultados mensaje="Tu carrito está vacío." />
        <Link to="/productos" className="boton">
          Ir al catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className="checkout">
      <h1>Checkout</h1>

      <div className="checkout__contenido">
        {/* noValidate desactiva los avisos del navegador para mostrar nuestros mensajes */}
        <form className="checkout__formulario" onSubmit={manejarEnvio} noValidate>
          <CampoFormulario
            etiqueta="Nombre"
            name="nombre"
            value={valores.nombre}
            onChange={manejarCambio}
            error={errores.nombre}
            autoComplete="name"
          />
          <CampoFormulario
            etiqueta="Correo"
            name="correo"
            type="email"
            value={valores.correo}
            onChange={manejarCambio}
            error={errores.correo}
            autoComplete="email"
          />
          <CampoFormulario
            etiqueta="Dirección"
            name="direccion"
            value={valores.direccion}
            onChange={manejarCambio}
            error={errores.direccion}
            autoComplete="street-address"
          />
          <CampoFormulario
            etiqueta="Código postal"
            name="codigoPostal"
            inputMode="numeric"
            value={valores.codigoPostal}
            onChange={manejarCambio}
            error={errores.codigoPostal}
            autoComplete="postal-code"
          />
          <CampoFormulario
            etiqueta="Teléfono"
            name="telefono"
            type="tel"
            inputMode="numeric"
            value={valores.telefono}
            onChange={manejarCambio}
            error={errores.telefono}
            autoComplete="tel-national"
          />

          <button type="submit" className="boton">
            Confirmar compra
          </button>
        </form>

        <ResumenPedido items={items} total={total} />
      </div>
    </section>
  )
}

export default Checkout
