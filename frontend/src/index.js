import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'tailwindcss/tailwind.css'

import TokenProvider from './Helpers/Hooks/TokenProvider'

ReactDOM.render(
  <React.StrictMode>
    <TokenProvider>
      <App />
    </TokenProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
