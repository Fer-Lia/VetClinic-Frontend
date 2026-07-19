import { useEffect, useState } from 'react'
import { Users, PawPrint, Stethoscope } from 'lucide-react'
import { obtenerClientes } from '../services/clienteService'
import { obtenerMascotas } from '../services/mascotaService'
import { obtenerVeterinarios } from '../services/veterinarioService'
import './Dashboard.css'

function Dashboard() {
  const [totales, setTotales] = useState({ clientes: 0, mascotas: 0, veterinarios: 0 })
  const [veterinarios, setVeterinarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function cargarTotales() {
      try {
        const [clientes, mascotas, listaVeterinarios] = await Promise.all([
          obtenerClientes(),
          obtenerMascotas(),
          obtenerVeterinarios(),
        ])
        if (!ignore) {
          setTotales({
            clientes: clientes.length,
            mascotas: mascotas.length,
            veterinarios: listaVeterinarios.length,
          })
          setVeterinarios(listaVeterinarios)
        }
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setCargando(false)
      }
    }

    cargarTotales()
    return () => { ignore = true }
  }, [])

  if (cargando) return <p>Cargando...</p>
  if (error) return <p>Error al cargar el panel: {error}</p>

  return (
    <main className="pagina-dashboard">
      <h1>Panel principal</h1>
      <div className="grid-tarjetas-resumen">
        <div className="tarjeta-resumen">
          <div className="tarjeta-icono icono-azul">
            <Users size={20} />
          </div>
          <div className="tarjeta-texto">
            <span className="tarjeta-titulo">Total Clientes</span>
            <span className="tarjeta-numero">{totales.clientes}</span>
            <span className="tarjeta-etiqueta">clientes registrados</span>
          </div>
        </div>
        <div className="tarjeta-resumen">
          <div className="tarjeta-icono icono-verde">
            <PawPrint size={20} />
          </div>
          <div className="tarjeta-texto">
            <span className="tarjeta-titulo">Mascotas</span>
            <span className="tarjeta-numero">{totales.mascotas}</span>
            <span className="tarjeta-etiqueta">mascotas en el sistema</span>
          </div>
        </div>
        <div className="tarjeta-resumen">
          <div className="tarjeta-icono icono-morado">
            <Stethoscope size={20} />
          </div>
          <div className="tarjeta-texto">
            <span className="tarjeta-titulo">Veterinarios</span>
            <span className="tarjeta-numero">{totales.veterinarios}</span>
            <span className="tarjeta-etiqueta">veterinarios activos</span>
          </div>
        </div>
      </div>

      <div className="panel-veterinarios">
        <h2>Veterinarios</h2>
        <ul className="lista-veterinarios">
          {veterinarios.slice(0, 4).map((veterinario) => (
            <li className="fila-veterinario" key={veterinario.dni}>
              <span className="avatar">
                {veterinario.nombre[0]}{veterinario.apellido[0]}
              </span>
              <div>
                <div>{veterinario.nombre} {veterinario.apellido}</div>
                <div className="veterinario-especialidad">{veterinario.especialidad}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Dashboard

