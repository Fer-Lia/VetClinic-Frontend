import { useEffect, useState } from 'react'
import { Search, Plus, Pencil } from 'lucide-react'
import { obtenerMascotas } from '../services/mascotaService'
import { obtenerClientes } from '../services/clienteService'
import './Mascotas.css'

function calcularEdad(fechaNacimiento) {
  const nacimiento = new Date(fechaNacimiento)
  const hoy = new Date()
  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const noHaCumplidoAnios =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())
  if (noHaCumplidoAnios) {
    edad--
  }
  return edad
}

function Mascotas() {
  const [mascotas, setMascotas] = useState([])
  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    let ignore = false

    Promise.all([obtenerMascotas(), obtenerClientes()])
      .then(([datosMascotas, datosClientes]) => {
        if (!ignore) {
          setMascotas(datosMascotas)
          setClientes(datosClientes)
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

  function nombreDueño(dni) {
    const cliente = clientes.find((cliente) => cliente.dni === dni)
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Desconocido'
  }

  if (cargando) {
    return <p>Cargando mascotas...</p>
  }

  if (error) {
    return <p>No se pudieron cargar las mascotas: {error}</p>
  }

  const mascotasFiltradas = mascotas.filter((mascota) =>
    mascota.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <main className="pagina-mascotas">
      <div className="mascotas-header">
        <div>
          <h1>Mascotas</h1>
          <p className="mascotas-subtitulo">{mascotas.length} mascotas en el sistema</p>
        </div>
        <div className="mascotas-acciones">
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

      <table className="tabla-mascotas">
        <thead>
          <tr>
            <th>Mascota</th>
            <th>Raza</th>
            <th>Dueño</th>
            <th>Edad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mascotasFiltradas.map((mascota) => (
            <tr key={mascota.id_mascota}>
              <td>{mascota.nombre}</td>
              <td>{mascota.raza}</td>
              <td>{nombreDueño(mascota.dni_propietario)}</td>
              <td>{calcularEdad(mascota.fecha_nacimiento)} años</td>
              <td>
                <button className="boton-editar">
                  <Pencil size={14} /> Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default Mascotas
