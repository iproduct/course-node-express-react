import { Route, Routes } from 'react-router'
import './App.css'
import PublicPage from './views/PublicPage'
import PrivatePage from './views/PrivatePage'

function App() {
  return (
    <>
      <h1>React + Vite + React Router v7</h1>
      <Routes>
        <Route index element={<PublicPage />} />
        <Route path="/private" element={<PrivatePage />} />
      </Routes>
    </>
  )
}

export default App
