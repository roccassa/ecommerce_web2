import { useState } from 'react'

// Muestra una imagen principal y miniaturas para cambiarla
function GaleriaImagenes({ imagenes, nombre }) {
  const [indiceActual, setIndiceActual] = useState(0)

  return (
    <div className="galeria">
      <img src={imagenes[indiceActual]} alt={nombre} className="galeria__principal" />

      {imagenes.length > 1 && (
        <div className="galeria__miniaturas">
          {imagenes.map((imagen, indice) => (
            <button
              key={imagen}
              type="button"
              className={`galeria__miniatura ${indice === indiceActual ? 'galeria__miniatura--activa' : ''}`}
              onClick={() => setIndiceActual(indice)}
              aria-label={`Ver imagen ${indice + 1} de ${nombre}`}
            >
              <img src={imagen} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default GaleriaImagenes
