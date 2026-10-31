// Servicio de productos: todas las llamadas a DummyJSON relacionadas con productos
// viven aquí, junto con los adaptadores que convierten la respuesta de la API
// a la forma que usan nuestros componentes.

const URL_BASE = 'https://dummyjson.com/products'

// Convierte una reseña de la API a nuestro formato
function adaptarResena(resena) {
  return {
    calificacion: resena.rating,
    comentario: resena.comment,
    autor: resena.reviewerName,
    fecha: resena.date,
  }
}

// Convierte un producto de la API a nuestro formato
export function adaptarProducto(producto) {
  const descuento = producto.discountPercentage ?? 0

  return {
    id: producto.id,
    nombre: producto.title,
    descripcion: producto.description,
    categoria: producto.category,
    marca: producto.brand ?? 'Sin marca',
    precio: producto.price,
    descuento,
    precioConDescuento: Number((producto.price * (1 - descuento / 100)).toFixed(2)),
    calificacion: producto.rating,
    stock: producto.stock,
    imagen: producto.thumbnail,
    imagenes: producto.images ?? [],
    resenas: (producto.reviews ?? []).map(adaptarResena),
  }
}

// Convierte una categoría de la API a nuestro formato
function adaptarCategoria(categoria) {
  return {
    id: categoria.slug,
    nombre: categoria.name,
  }
}

// Convierte una respuesta paginada ({ products, total }) a nuestro formato
function adaptarPagina(datos) {
  return {
    productos: datos.products.map(adaptarProducto),
    total: datos.total,
  }
}

// Arma los parámetros de URL de paginación y orden, omitiendo los vacíos
function construirParametros({ limit, skip, sortBy, order } = {}) {
  const parametros = new URLSearchParams()

  if (limit !== undefined) parametros.set('limit', limit)
  if (skip !== undefined) parametros.set('skip', skip)
  if (sortBy) parametros.set('sortBy', sortBy)
  if (order) parametros.set('order', order)

  return parametros
}

// Hace la petición GET y lanza un error si la respuesta no es exitosa
async function obtenerJson(url) {
  const respuesta = await fetch(url)

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al consultar la API`)
  }

  return respuesta.json()
}

// GET /products — lista paginada y ordenada
export async function obtenerProductos(opciones) {
  const parametros = construirParametros(opciones)
  const datos = await obtenerJson(`${URL_BASE}?${parametros}`)
  return adaptarPagina(datos)
}

// GET /products/{id} — detalle de un producto
export async function obtenerProductoPorId(id) {
  const datos = await obtenerJson(`${URL_BASE}/${id}`)
  return adaptarProducto(datos)
}

// GET /products/search?q= — búsqueda por nombre
export async function buscarProductos(texto, opciones) {
  const parametros = construirParametros(opciones)
  parametros.set('q', texto)
  const datos = await obtenerJson(`${URL_BASE}/search?${parametros}`)
  return adaptarPagina(datos)
}

// GET /products/categories — lista de categorías
export async function obtenerCategorias() {
  const datos = await obtenerJson(`${URL_BASE}/categories`)
  return datos.map(adaptarCategoria)
}

// GET /products/category/{categoria} — productos de una categoría
export async function obtenerProductosPorCategoria(categoria, opciones) {
  const parametros = construirParametros(opciones)
  const datos = await obtenerJson(`${URL_BASE}/category/${categoria}?${parametros}`)
  return adaptarPagina(datos)
}
