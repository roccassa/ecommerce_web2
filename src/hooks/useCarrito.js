import { useContext } from 'react'
import { CarritoContexto } from '../context/CarritoContexto'

//Este Hook habilita el carrito desde cualquier componente
export function useCarrito() {
    const contexto = useContext(CarritoContexto)

    if(!contexto){
        throw new Error('useCarrito debe ser utilizado dentro de un CarritoProvider')
    }

    return contexto
}