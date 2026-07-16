import { useEffect } from 'react'

function App() {
  useEffect(() => {
    let ignore = false

    fetch(`${import.meta.env.VITE_API_URL}/clientes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (!ignore) {
          console.log('Clientes:', data)
        }
      })
      .catch((error) => console.error('Error al conectar con la API:', error))

    return () => {
      ignore = true
    }
  }, [])

  return (
    <main>
      <h1>VetClinic</h1>
    </main>
  )
}

export default App
