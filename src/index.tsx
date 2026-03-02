import './index.module.scss'
import './i18n'
import { router } from '@app/router'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

const domNode = document.getElementById('root')

const root = createRoot(domNode)

root.render(<RouterProvider router={router} />)
