import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import 'highlight.js/styles/github-dark.css'

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
