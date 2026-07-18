import { useEffect, useState } from 'react'
import { Search, Plus, Pencil, Phone } from 'lucide-react'
import { obtenerVeterinarios } from '../services/veterinarioService'
import './Veterinarios.css'

function Veterinarios() {
  const [veterinarios, setVeterinarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    let ignore = false

    obtenerVeterinarios()
      .then((data) => {
        if (!ignore) {
          setVeterinarios(data)
          setCargando(false)
        }
      })
      .catch((error) => {
        if (!ignore) {
          setError(error.message)
          setCargando(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  if (cargando) {
    return <p>Cargando veterinarios...</p>
  }

  if (error) {
    return <p>No se pudieron cargar los veterinarios: {error}</p>
  }

  const veterinariosFiltrados = veterinarios.filter((veterinario) =>
    `${veterinario.nombre} ${veterinario.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <main className="pagina-veterinarios">
      <div className="veterinarios-header">
        <div>
          <h1>Veterinarios</h1>
          <p className="veterinarios-subtitulo">{veterinarios.length} veterinarios activos</p>
        </div>
        <div className="veterinarios-acciones">
          <div className="buscador">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </div>
          <button className="boton-primario">
            <Plus size={16} />
            Nuevo
          </button>
        </div>
      </div>

      <div className="grid-veterinarios">
        {veterinariosFiltrados.map((veterinario) => (
          <div className="tarjeta-veterinario" key={veterinario.dni}>
            <div className="veterinario-cabecera">
              <span className="avatar">
                {veterinario.nombre[0]}{veterinario.apellido[0]}
              </span>
              <div>
                <div>{veterinario.nombre} {veterinario.apellido}</div>
                <div className="veterinarios-subtitulo">{veterinario.especialidad}</div>
              </div>
            </div>
            <div className="contacto-linea">
              <Phone size={14} /> {veterinario.telefono}
            </div>
            <button className="boton-editar">
              <Pencil size={14} /> Editar
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Veterinarios
