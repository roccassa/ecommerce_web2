import { useParams } from 'react-router-dom'

function Detalle() {
  const { id } = useParams()

  return (
    <section>
      <h1>Detalle del producto {id}</h1>
    </section>
  )
}

export default Detalle
