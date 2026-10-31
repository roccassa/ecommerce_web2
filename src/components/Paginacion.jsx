function Paginacion({ paginaActual, totalPaginas, onCambiar }){
    const styleBoton = (deshabilitado)=> ({
        border: 'none',
        cursor: deshabilitado ? 'not-allowed' : 'pointer',
        opacity: deshabilitado ? 0.5 : 1,
    })

    const Primera = paginaActual <= 1
    const Ultima = paginaActual >= totalPaginas
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
            disabled={Primera}
            style={styleBoton(Primera)}
            >
                Anterior
            </button>

            <span>
                Pagina {paginaActual} de {totalPaginas}
            </span>

            <button className="boton"
            onClick={() => onCambiar(paginaActual + 1)}
            disabled={Ultima}
            style={styleBoton(Ultima)}
            >
                Siguiente
                </button>
        </nav>
    )
}

export default Paginacion