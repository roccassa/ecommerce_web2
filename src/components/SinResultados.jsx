//Este componente muestra un mensaje cuando una busqueda falla o no devuelve nada

function SinResultados({ mensaje }){
    return(
        <div className="sin-resultados">
            <p>{mensaje}</p>
            </div>
    )
}

export default SinResultados