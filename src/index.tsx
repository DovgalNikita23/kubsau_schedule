import './index.module.scss'
import { createRoot } from 'react-dom/client'
import { router } from '@app/router'
import { RouterProvider } from 'react-router-dom'

const domNode = document.getElementById('root')

const root = createRoot(domNode)

root.render(<RouterProvider router={router} />)
