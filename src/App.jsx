import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BarraNavegacion from './components/BarraNavegacion'
import Clientes from './pages/Clientes'
import Mascotas from './pages/Mascotas'
import Veterinarios from './pages/Veterinarios'

function App() {
  return (
    <BrowserRouter>
      <BarraNavegacion />
      <Routes>
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/mascotas" element={<Mascotas />} />
        <Route path="/veterinarios" element={<Veterinarios />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
