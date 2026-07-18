import { useEffect, useState } from 'react'
import { Search, Plus, Mail, Phone, Pencil, MapPin } from 'lucide-react'
import { obtenerClientes } from '../services/clienteService'
import { obtenerMascotas } from '../services/mascotaService'
import './Clientes.css'

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [mascotas, setMascotas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    let ignore = false

    Promise.all([obtenerClientes(), obtenerMascotas()])
      .then(([datosClientes, datosMascotas]) => {
        if (!ignore) {
          setClientes(datosClientes)
          setMascotas(datosMascotas)
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

  function contarMascotas(dni) {
    return mascotas.filter((mascota) => mascota.dni_propietario === dni).length
  }

  if (cargando) {
    return <p>Cargando clientes...</p>
  }

  if (error) {
    return <p>No se pudieron cargar los clientes: {error}</p>
  }

  const clientesFiltrados = clientes.filter((cliente) =>
    `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <main className="pagina-clientes">
      <div className="clientes-header">
        <div>
          <h1>Clientes</h1>
          <p className="clientes-subtitulo">{clientes.length} clientes registrados</p>
        </div>
        <div className="clientes-acciones">
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

      <table className="tabla-clientes">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>DNI</th>
            <th>Contacto</th>
            <th>Mascotas</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.dni}>
              <td>
                <div className="cliente-info">
                  <span className="avatar">
                    {cliente.nombre[0]}{cliente.apellido[0]}
                  </span>
                  <div>
                    <div>{cliente.nombre} {cliente.apellido}</div>
                    <div className="clientes-subtitulo">
                      <MapPin size={12} /> {cliente.direccion}
                    </div>
                  </div>
                </div>
              </td>
              <td>{cliente.dni}</td>
              <td>
                <div className="contacto-linea">
                  <Mail size={14} /> {cliente.email}
                </div>
                <div className="contacto-linea">
                  <Phone size={14} /> {cliente.telefono}
                </div>
              </td>
              <td>
                <span className="badge-mascotas">{contarMascotas(cliente.dni)}</span>
              </td>
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

export default Clientes
