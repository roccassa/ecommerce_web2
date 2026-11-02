import { useState } from 'react'

const VALORES_INICIALES = {
  nombre: '',
  correo: '',
  direccion: '',
  codigoPostal: '',
  telefono: '',
}

// Revisa un campo y devuelve su mensaje de error, o una cadena vacía si es válido
function validarCampo(campo, valor) {
  const texto = valor.trim()

  switch (campo) {
    case 'nombre':
      return texto ? '' : 'Escribe tu nombre.'
    case 'correo':
      if (!texto) return 'Escribe tu correo.'
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto) ? '' : 'Escribe un correo válido.'
    case 'direccion':
      return texto ? '' : 'Escribe tu dirección.'
    case 'codigoPostal':
      return /^\d{5}$/.test(texto) ? '' : 'El código postal debe tener 5 dígitos.'
    case 'telefono':
      return /^\d{10}$/.test(texto) ? '' : 'El teléfono debe tener 10 dígitos.'
    default:
      return ''
  }
}

// Hook del formulario de checkout: guarda los valores y los errores por campo.
// Devuelve { valores, errores, manejarCambio, validar }.
export function useFormularioCheckout() {
  const [valores, setValores] = useState(VALORES_INICIALES)
  const [errores, setErrores] = useState({})

  // Actualiza el campo que cambió y borra su error mientras el usuario lo corrige
  function manejarCambio(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: '' }))
  }

  // Revisa todos los campos, guarda sus errores y devuelve true si no hay ninguno
  function validar() {
    const nuevosErrores = {}

    Object.keys(valores).forEach((campo) => {
      nuevosErrores[campo] = validarCampo(campo, valores[campo])
    })

    setErrores(nuevosErrores)
    return Object.values(nuevosErrores).every((error) => !error)
  }

  return { valores, errores, manejarCambio, validar }
}
