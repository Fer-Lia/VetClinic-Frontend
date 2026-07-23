import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import '../styles/ModalFormulario.css'

const formularioVacio = {
  nombre: '',
  especie: '',
  raza: '',
  fecha_nacimiento: '',
  dni_propietario: '',
}

function ModalNuevaMascota({ abierto, clientes, onCerrar, onGuardar }) {
  const dialogRef = useRef(null)
  const [formulario, setFormulario] = useState(formularioVacio)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [camposInvalidos, setCamposInvalidos] = useState([])

  useEffect(() => {
    if (abierto) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
      setFormulario(formularioVacio)
      setError(null)
      setCamposInvalidos([])
    }
  }, [abierto])

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setFormulario((anterior) => ({ ...anterior, [name]: value }))
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()

    const vacios = Object.keys(formulario).filter((campo) => !formulario[campo])
    if (vacios.length > 0) {
      setCamposInvalidos(vacios)
      return
    }
    setCamposInvalidos([])

    setEnviando(true)
    setError(null)
    try {
      await onGuardar(formulario)
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <dialog ref={dialogRef} className="modal-formulario" onCancel={onCerrar}>
      <form onSubmit={manejarEnvio}>
        <div className="modal-cabecera">
          <h2>Nueva mascota</h2>
          <button type="button" className="boton-cerrar" onClick={onCerrar} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            className={camposInvalidos.includes('nombre') ? 'campo-invalido' : ''}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="especie">Especie</label>
          <input
            id="especie"
            name="especie"
            value={formulario.especie}
            onChange={manejarCambio}
            className={camposInvalidos.includes('especie') ? 'campo-invalido' : ''}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="raza">Raza</label>
          <input
            id="raza"
            name="raza"
            value={formulario.raza}
            onChange={manejarCambio}
            className={camposInvalidos.includes('raza') ? 'campo-invalido' : ''}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
          <input
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            type="date"
            value={formulario.fecha_nacimiento}
            onChange={manejarCambio}
            className={camposInvalidos.includes('fecha_nacimiento') ? 'campo-invalido' : ''}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="dni_propietario">Propietario</label>
          <select
            id="dni_propietario"
            name="dni_propietario"
            value={formulario.dni_propietario}
            onChange={manejarCambio}
            className={camposInvalidos.includes('dni_propietario') ? 'campo-invalido' : ''}
            required
          >
            <option value="">Selecciona un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.dni} value={cliente.dni}>
                {cliente.nombre} {cliente.apellido}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="modal-error">{error}</p>}

        <div className="modal-acciones">
          <button type="button" onClick={onCerrar}>Cancelar</button>
          <button type="submit" className="boton-primario" disabled={enviando}>
            {enviando ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default ModalNuevaMascota

