import { createContext, useEffect, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const CarritoContexto = createContext(null)

const CLAVE_ALMACENAMIENTO = 'carrito'

//Se lee el carrito guardado
function leerCarrito(){
    try{
        const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO)
        return guardado ? JSON.parse(guardado) : []
    } catch {
        return []
    }
}

//Cada inicio se carga desde el localStorage
export function CarritoProvider({ children }){
    const [items, setItems] = useState(leerCarrito)

    //Cada cambio en el carrito se ve reflejado en el localStorage
    useEffect(()=> {
        localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(items))
    }, [items])

    //Si un producto ya estaba en el carrito y se vuelve a agregar solamente suma
    function agregar(producto, cantidad = 1){
        setItems((actuales)=> {
            const existe = actuales.find((item) => item.id === producto.id)

            if(existe){
                return actuales.map((item)=>
                item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad}
        :item
            )
            }

            return[
                ...actuales,
                {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: producto.imagen,
                    cantidad,
                },
            ]
        })
    }

    //Suma 1 a la cantidad de un producto
  function aumentar(id) {
    setItems((actuales) =>
      actuales.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    )
  }
 
  //Resta 1. En caso de que el cont llegue a 0, el producto es eliminado del carrito
  function disminuir(id) {
    setItems((actuales) =>
      actuales
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }
 
  //Elimina un producto del carrito
  function eliminar(id) {
    setItems((actuales) => actuales.filter((item) => item.id !== id))
  }
 
  //Vacia el carrito
  function vaciar() {
    setItems([])
  }
 
  // Valores calculados
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0)

  const valor = {
    items,
    agregar,
    aumentar,
    disminuir,
    eliminar,
    vaciar,
    total,
    cantidadTotal,
  }

  return <CarritoContexto.Provider value={valor}>{children}</CarritoContexto.Provider>
}