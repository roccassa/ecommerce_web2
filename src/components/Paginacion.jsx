function Paginacion({ paginaActual, totalPaginas, onCambiar }){
    const estiloBoton = (deshabilitado)=> ({
        border: 'none',
        cursor: deshabilitado ? 'not-allowed' : 'pointer',
        opacity: deshabilitado ? 0.5 : 1,
    })

    const esPrimera = paginaActual <= 1
    const esUltima = paginaActual >= totalPaginas
    return(
        <nav className="paginacion"
        style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        marginTop: '24px',  
        }}
        >
            <button className="boton"
            onClick={() => onCambiar(paginaActual - 1)}
            disabled={esPrimera}
            style={estiloBoton(esPrimera)}
            >
                Anterior
            </button>

            <span>
                Página {paginaActual} de {totalPaginas}
            </span>

            <button className="boton"
            onClick={() => onCambiar(paginaActual + 1)}
            disabled={esUltima}
            style={estiloBoton(esUltima)}
            >
                Siguiente
                </button>
        </nav>
    )
}

export default Paginacion