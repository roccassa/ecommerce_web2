import { Link } from 'react-router-dom'

function NoEncontrada() {
  return (
    <section className="no-encontrada">
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="boton">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NoEncontrada
