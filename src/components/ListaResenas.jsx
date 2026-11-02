// Lista de reseñas de un producto, ya adaptadas por productosService
function ListaResenas({ resenas }) {
  if (resenas.length === 0) {
    return <p className="resenas__vacio">Este producto todavía no tiene reseñas.</p>
  }

  return (
    <ul className="resenas">
      {/* La API no da id a las reseñas y puede repetir autor y fecha; la lista nunca se reordena */}
      {resenas.map((resena, indice) => (
        <li key={indice} className="resenas__item">
          <div className="resenas__encabezado">
            <strong>{resena.autor}</strong>
            <span>★ {resena.calificacion}</span>
          </div>
          <p className="resenas__comentario">{resena.comentario}</p>
          <small className="resenas__fecha">
            {new Date(resena.fecha).toLocaleDateString('es-MX')}
          </small>
        </li>
      ))}
    </ul>
  )
}

export default ListaResenas
