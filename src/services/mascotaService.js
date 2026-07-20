const API_URL = import.meta.env.VITE_API_URL

export async function obtenerMascotas() {
  const response = await fetch(`${API_URL}/mascotas`)

  if (!response.ok) {
    throw new Error(`Error al obtener mascotas: ${response.status}`)
  }

  return response.json()
}

export async function eliminarMascota(idMascota) {
  const response = await fetch(`${API_URL}/mascotas/${idMascota}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Error al eliminar mascota: ${response.status}`)
  }
}
