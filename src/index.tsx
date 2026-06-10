import './index.module.scss'
import './i18n'
import { router } from '@app/router'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((error) => {
        console.log('SW registration failed: ', error)
      })
  })
}

const domNode = document.getElementById('root')

const root = createRoot(domNode)

root.render(<RouterProvider router={router} />)
