import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import './Aviso.css'

function Aviso({ mensaje, onCerrar }) {
  useEffect(() => {
    const temporizador = setTimeout(onCerrar, 3000)
    return () => clearTimeout(temporizador)
  }, [onCerrar])

  return (
    <div className="aviso">
      <CheckCircle size={18} />
      {mensaje}
    </div>
  )
}

export default Aviso
