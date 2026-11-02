// Lista de productos del pedido con sus subtotales y el total
function ResumenPedido({ items, total }) {
  return (
    <div className="resumen-pedido">
      <h2>Resumen del pedido</h2>

      <ul className="resumen-pedido__lista">
        {items.map((item) => (
          <li key={item.id} className="resumen-pedido__item">
            <span>
              {item.cantidad} × {item.nombre}
            </span>
            <span>${(item.precio * item.cantidad).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <p className="resumen-pedido__total">
        <span>Total</span>
        <strong>${total.toFixed(2)}</strong>
      </p>
    </div>
  )
}

export default ResumenPedido
