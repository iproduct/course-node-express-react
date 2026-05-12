import { Route, Routes } from 'react-router'
import './App.css'
import PublicPage from './views/PublicPage'
import PrivatePage from './views/PrivatePage'
import Layout from './views/Layout'
import LoginPage from './views/LoginPage'
import { RequireAuth } from './components/RequireAuth'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <>
      <h1>React + Vite + React Router v7</h1>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />} >
            <Route index element={<PublicPage />} />
            <Route path="/public" element={<PublicPage />} />
            <Route path="/private" element={(
              <RequireAuth>
                <PrivatePage />
              </RequireAuth>
            )} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
