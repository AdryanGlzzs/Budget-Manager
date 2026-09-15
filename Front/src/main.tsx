import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRoutes } from './routes/Routes'
import { AuthContextProvider } from './contexts/authContext'
import { initMercadoPago } from '@mercadopago/sdk-react'

initMercadoPago(import.meta.env.VITE_MARKET_PAID_PUBLIC_KEY,{
  locale: "pt-BR"
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  </StrictMode>,
)

