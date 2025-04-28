import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UncontrolledForm from './UncontrolledForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UncontrolledForm/>
    </>
  )
}

export default App
