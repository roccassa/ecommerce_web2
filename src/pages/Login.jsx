import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSesion } from '../hooks/useSesion'

function Login() {
  const { usuario, iniciarSesion } = useSesion()
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setError(null)
    setEnviando(true)

    try {
      await iniciarSesion(nombreUsuario.trim(), contrasena)
    } catch (errorLogin) {
      setError(errorLogin.message)
      setEnviando(false)
    }
  }

  // Con sesión iniciada (por ejemplo, justo después del login) se pasa a Mi cuenta
  if (usuario) {
    return <Navigate to="/mi-cuenta" replace />
  }

  return (
    <section className="login">
      <h1>Iniciar sesión</h1>

      <form className="login__formulario" onSubmit={manejarEnvio}>
        <label htmlFor="usuario">Usuario</label>
        <input
          id="usuario"
          type="text"
          autoComplete="username"
          value={nombreUsuario}
          onChange={(evento) => setNombreUsuario(evento.target.value)}
          required
        />

        <label htmlFor="contrasena">Contraseña</label>
        <input
          id="contrasena"
          type="password"
          autoComplete="current-password"
          value={contrasena}
          onChange={(evento) => setContrasena(evento.target.value)}
          required
        />

        {error && (
          <p className="login__error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="boton" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </section>
  )
}

export default Login
