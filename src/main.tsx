import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import { EditorView } from './components/editor/EditorView.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editor" element={<EditorView onBack={() => window.location.href = '/'} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
