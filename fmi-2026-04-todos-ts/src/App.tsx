import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Hello from './components/Hello'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>React TS Todos</h1>
          <Hello name={'Trayan' + count} />
          <button
            className="counter"
            onClick={() => setCount(count => count + 1)}
          >
            Count is {count}
          </button>
        </div>
      </section>
    </>
  )
}

export default App
