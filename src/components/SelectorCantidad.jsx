// Selector con botones - y +; la cantidad siempre queda entre 1 y el máximo recibido
function SelectorCantidad({ cantidad, maximo, onCambiar }) {
  return (
    <div className="selector-cantidad">
      <button
        type="button"
        onClick={() => onCambiar(cantidad - 1)}
        disabled={cantidad <= 1}
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span aria-live="polite">{cantidad}</span>
      <button
        type="button"
        onClick={() => onCambiar(cantidad + 1)}
        disabled={cantidad >= maximo}
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  )
}

export default SelectorCantidad
