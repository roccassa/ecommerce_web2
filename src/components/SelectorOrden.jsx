function SelectorOrden({ valor, onCambiar }){
    return(
        <select className="selector-orden filtro-categoria"
        value={valor}
        onChange={(evento) => onCambiar(evento.target.value)}
        aria-label="Ordenar productos"
        >
            <option value="">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="title-asc">Nombre: A-Z</option>
            <option value="title-desc">Nombre: Z-A</option>
        </select>
    )
}

export default SelectorOrden