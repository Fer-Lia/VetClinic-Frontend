import { useEffect } from 'react'
import { obtenerClientes } from './services/clienteService'

function App() {
  useEffect(() => {
    let ignore = false

    obtenerClientes()
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
