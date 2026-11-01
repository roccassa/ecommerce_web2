// Lista de reseñas de un producto, ya adaptadas por productosService
function ListaResenas({ resenas }) {
  if (resenas.length === 0) {
    return <p className="resenas__vacio">Este producto todavía no tiene reseñas.</p>
  }

  return (
    <ul className="resenas">
      {resenas.map((resena) => (
        <li key={`${resena.autor}-${resena.fecha}`} className="resenas__item">
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
