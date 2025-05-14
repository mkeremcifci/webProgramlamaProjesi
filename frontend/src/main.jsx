import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FirstPage from './pages/firstPage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirstPage />
  </StrictMode>,
)
