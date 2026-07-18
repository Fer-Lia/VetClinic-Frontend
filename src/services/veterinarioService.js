const API_URL = import.meta.env.VITE_API_URL

export async function obtenerVeterinarios() {
  const response = await fetch(`${API_URL}/veterinarios`)

  if (!response.ok) {
    throw new Error(`Error al obtener veterinarios: ${response.status}`)
  }

  return response.json()
}
