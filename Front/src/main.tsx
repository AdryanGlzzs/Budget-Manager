import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import { AppRoutes } from './routes/Routes'
import { AuthContextProvider } from './contexts/authContext'
import { initMercadoPago } from '@mercadopago/sdk-react'
import { ThemeContextProvider } from './contexts/ThemeContext'
import { ToastContextProvider } from './contexts/ToastContext'
import { CurrencyContextProvider } from './contexts/CurrencyContext'

initMercadoPago(import.meta.env.VITE_MARKET_PAID_PUBLIC_KEY, {
  locale: "pt-BR"
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrencyContextProvider>
      <ThemeContextProvider>
        <ToastContextProvider>
          <AuthContextProvider>
              <AppRoutes />
          </AuthContextProvider>
        </ToastContextProvider>
      </ThemeContextProvider>
    </CurrencyContextProvider>
  </StrictMode>,
)
