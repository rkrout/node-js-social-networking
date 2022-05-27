import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from './utils/routes'
import './index.css'

function App() {
  const router = useRoutes(routes)

  return (
    <div>
      {router}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)