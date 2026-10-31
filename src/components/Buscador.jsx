// Campo de búsqueda controlado: el texto vive en el componente padre
function Buscador({ valor, onCambiar, onBuscar }) {
  function manejarEnvio(evento) {
    evento.preventDefault()
    onBuscar(valor.trim())
  }

  return (
    <form className="buscador" onSubmit={manejarEnvio} role="search">
      <input
        type="search"
        placeholder="Buscar productos por nombre..."
        value={valor}
        onChange={(evento) => onCambiar(evento.target.value)}
        aria-label="Buscar productos"
      />
      <button type="submit" className="boton">
        Buscar
      </button>
    </form>
  )
}

export default Buscador
