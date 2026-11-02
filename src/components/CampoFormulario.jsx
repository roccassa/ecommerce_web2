// Campo de formulario con su etiqueta y el mensaje de error debajo
function CampoFormulario({ etiqueta, name, value, onChange, error, ...propsInput }) {
  const idError = `${name}-error`

  return (
    <div className="campo-formulario">
      <label htmlFor={name}>{etiqueta}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? idError : undefined}
        {...propsInput}
      />
      {error && (
        <p id={idError} className="campo-formulario__error">
          {error}
        </p>
      )}
    </div>
  )
}

export default CampoFormulario
