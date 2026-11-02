import { useSesion } from '../hooks/useSesion'

// Esta página solo se muestra dentro de RutaProtegida, así que siempre hay usuario
function MiCuenta() {
  const { usuario, cerrarSesion } = useSesion()

  return (
    <section className="mi-cuenta">
      <h1>Mi cuenta</h1>

      <div className="mi-cuenta__tarjeta">
        <img src={usuario.foto} alt={`Foto de ${usuario.nombre}`} className="mi-cuenta__foto" />
        <h2 className="mi-cuenta__nombre">{usuario.nombre}</h2>
        <p className="mi-cuenta__correo">{usuario.correo}</p>
        <button type="button" className="boton" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </section>
  )
}

export default MiCuenta
