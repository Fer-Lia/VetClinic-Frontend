const API_URL = import.meta.env.VITE_API_URL

export async function obtenerClientes() {
  const response = await fetch(`${API_URL}/clientes`)

  if (!response.ok) {
    throw new Error(`Error al obtener clientes: ${response.status}`)
  }

  return response.json()
}
