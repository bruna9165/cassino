import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './routers/routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes/>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
