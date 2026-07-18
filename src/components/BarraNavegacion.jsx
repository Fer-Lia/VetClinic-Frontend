import { NavLink } from 'react-router-dom'
import { Home, Users, PawPrint, Stethoscope } from 'lucide-react'
import './BarraNavegacion.css'

function BarraNavegacion() {
  return (
    <nav className="barra-navegacion">
      <div className="barra-logo">
        <span className="logo-icono">🐾</span>
        <span>VetClinic</span>
      </div>
      <div className="barra-enlaces">
        <NavLink to="/" end className="enlace-nav">
          <Home size={16} /> Inicio
        </NavLink>
        <NavLink to="/clientes" className="enlace-nav">
          <Users size={16} /> Clientes
        </NavLink>
        <NavLink to="/mascotas" className="enlace-nav">
          <PawPrint size={16} /> Mascotas
        </NavLink>
        <NavLink to="/veterinarios" className="enlace-nav">
          <Stethoscope size={16} /> Veterinarios
        </NavLink>
      </div>
    </nav>
  )
}

export default BarraNavegacion
