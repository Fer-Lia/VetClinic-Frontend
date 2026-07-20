import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import './ModalNuevoCliente.css'

const formularioVacio = {
  nombre: '',
  apellido: '',
  dni: '',
  direccion: '',
  telefono: '',
  email: '',
}

function ModalNuevoCliente({ abierto, onCerrar, onGuardar }) {
  const dialogRef = useRef(null)
  const [formulario, setFormulario] = useState(formularioVacio)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (abierto) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
      setFormulario(formularioVacio)
      setError(null)
    }
  }, [abierto])

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setFormulario((anterior) => ({ ...anterior, [name]: value }))
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setEnviando(true)
    setError(null)
    try {
      await onGuardar(formulario)
    } catch (err) {
      // El backend devuelve 500 para DNI duplicado en vez de 409, así que no
      // podemos distinguir el motivo real del error a partir del status.
      setError('DNI duplicado')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <dialog ref={dialogRef} className="modal-cliente" onCancel={onCerrar}>
      <form onSubmit={manejarEnvio}>
        <div className="modal-cabecera">
          <h2>Nuevo cliente</h2>
          <button type="button" className="boton-cerrar" onClick={onCerrar} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" value={formulario.nombre} onChange={manejarCambio} required />
        </div>

        <div className="campo">
          <label htmlFor="apellido">Apellido</label>
          <input id="apellido" name="apellido" value={formulario.apellido} onChange={manejarCambio} required />
        </div>

        <div className="campo">
          <label htmlFor="dni">DNI</label>
          <input
            id="dni"
            name="dni"
            value={formulario.dni}
            onChange={manejarCambio}
            className={error ? 'campo-invalido' : ''}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formulario.email} onChange={manejarCambio} required />
        </div>

        <div className="campo">
          <label htmlFor="telefono">Teléfono</label>
          <input id="telefono" name="telefono" value={formulario.telefono} onChange={manejarCambio} required />
        </div>

        <div className="campo">
          <label htmlFor="direccion">Dirección</label>
          <input id="direccion" name="direccion" value={formulario.direccion} onChange={manejarCambio} required />
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

export default ModalNuevoCliente
