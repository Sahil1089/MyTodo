import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.scss'
import TodoApp from './TodoApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoApp/>
  </StrictMode>,
)
