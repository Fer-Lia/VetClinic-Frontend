import { useEffect, useRef, useState } from 'react'
import './ModalConfirmacion.css'

function ModalConfirmacion({ abierto, mensaje, onCerrar, onConfirmar }) {
  const dialogRef = useRef(null)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (abierto) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
      setError(null)
    }
  }, [abierto])

  async function manejarConfirmar() {
    setEnviando(true)
    setError(null)
    try {
      await onConfirmar()
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <dialog ref={dialogRef} className="modal-confirmacion" onCancel={onCerrar}>
      <p>{mensaje}</p>

      {error && <p className="modal-error">{error}</p>}

      <div className="modal-acciones">
        <button type="button" className="boton-cancelar" onClick={onCerrar}>Cancelar</button>
        <button type="button" className="boton-destructivo" onClick={manejarConfirmar} disabled={enviando}>
          {enviando ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </dialog>
  )
}

export default ModalConfirmacion
