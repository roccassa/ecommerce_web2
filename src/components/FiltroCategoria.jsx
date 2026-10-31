// Selector de categoría; recibe las categorías ya cargadas y avisa al padre cuando cambia
function FiltroCategoria({ categorias, valor, onCambiar, deshabilitado = false }) {
  return (
    <select
      className="filtro-categoria"
      value={valor}
      onChange={(evento) => onCambiar(evento.target.value)}
      disabled={deshabilitado}
      aria-label="Filtrar por categoría"
    >
      <option value="">Todas las categorías</option>
      {categorias.map((categoria) => (
        <option key={categoria.id} value={categoria.id}>
          {categoria.nombre}
        </option>
      ))}
    </select>
  )
}

export default FiltroCategoria
