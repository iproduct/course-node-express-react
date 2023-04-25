import './App.css';
import { useRef } from "react";
import VideoPlayer from "./components/VideoPlayer";

export default function VideoPlayerApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const handlePause = () => {
    videoRef.current?.pause();
  };
  return (
    <div className="App">
      <header className="App-header">
        <VideoPlayer ref={videoRef}>
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
        </VideoPlayer>
      </header>
    </div>
  )
}