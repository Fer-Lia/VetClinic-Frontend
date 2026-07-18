const API_URL = import.meta.env.VITE_API_URL

export async function obtenerMascotas() {
  const response = await fetch(`${API_URL}/mascotas`)

  if (!response.ok) {
    throw new Error(`Error al obtener mascotas: ${response.status}`)
  }

  return response.json()
}
