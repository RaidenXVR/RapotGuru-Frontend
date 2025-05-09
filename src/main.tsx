import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
import { worker } from './mocks/browser.ts'
import { UserProvider } from './context/userContext.tsx'



async function prepare() {
  if (import.meta.env.DEV) {
    await worker.start();
  }
}

prepare().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </StrictMode>,
  )
})