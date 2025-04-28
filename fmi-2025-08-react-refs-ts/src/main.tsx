import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CountDownApp from './CountdownApp'
// import VideoPlayerApp from './VideoPlayerApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CountDownApp />
  </StrictMode>,
)
