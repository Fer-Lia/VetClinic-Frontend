import { useEffect, useState } from 'react'
import { Search, Plus, Pencil, Phone, Trash2 } from 'lucide-react'
import { obtenerVeterinarios, eliminarVeterinario } from '../services/veterinarioService'
import ModalConfirmacion from '../components/ModalConfirmacion'
import Aviso from '../components/Aviso'
import './Veterinarios.css'

function Veterinarios() {
  const [veterinarios, setVeterinarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [veterinarioAEliminar, setVeterinarioAEliminar] = useState(null)
  const [mensajeExito, setMensajeExito] = useState(null)

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

  async function manejarEliminar() {
    await eliminarVeterinario(veterinarioAEliminar.dni)
    setVeterinarios((anteriores) =>
      anteriores.filter((veterinario) => veterinario.dni !== veterinarioAEliminar.dni)
    )
    setVeterinarioAEliminar(null)
    setMensajeExito('Veterinario eliminado correctamente')
  }

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

      <table className="tabla-veterinarios">
        <thead>
          <tr>
            <th>Veterinario</th>
            <th>Especialidad</th>
            <th>Teléfono</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {veterinariosFiltrados.map((veterinario) => (
            <tr key={veterinario.dni}>
              <td>
                <div className="veterinario-info">
                  <span className="avatar">
                    {veterinario.nombre[0]}{veterinario.apellido[0]}
                  </span>
                  <div>{veterinario.nombre} {veterinario.apellido}</div>
                </div>
              </td>
              <td>{veterinario.especialidad}</td>
              <td>
                <div className="contacto-linea">
                  <Phone size={14} /> {veterinario.telefono}
                </div>
              </td>
              <td>
                <div className="acciones-fila">
                  <button className="boton-editar">
                    <Pencil size={14} /> Editar
                  </button>
                  <button className="boton-eliminar" onClick={() => setVeterinarioAEliminar(veterinario)}>
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalConfirmacion
        abierto={veterinarioAEliminar !== null}
        mensaje={veterinarioAEliminar ? `¿Eliminar a ${veterinarioAEliminar.nombre} ${veterinarioAEliminar.apellido}?` : ''}
        onCerrar={() => setVeterinarioAEliminar(null)}
        onConfirmar={manejarEliminar}
      />

      {mensajeExito && (
        <Aviso mensaje={mensajeExito} onCerrar={() => setMensajeExito(null)} />
      )}
    </main>
  )
}

export default Veterinarios
