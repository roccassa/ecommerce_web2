//Este componente imprime un mensaje de error y un boton para reiniciar la peticion

function MensajeError({ mensaje, onReintentar }) {
    return(
        <div className="mensaje-error">
        <p>{mensaje}</p>
      <button
  className="boton"
  onClick={onReintentar}
  style={{ border: 'none', cursor: 'pointer' }}
>
  Reintentar
</button>
            </div>
    )
}

export default MensajeError