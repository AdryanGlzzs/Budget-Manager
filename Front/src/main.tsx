import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRoutes } from './routes/Routes'
import { AuthContextProvider } from './services/authContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
        <AppRoutes />
    </AuthContextProvider>
  </StrictMode>,
)

