import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="main-content">
        <div className="navbar">
          <div className="navbar-badge">
            MemoryLane
          </div>
        </div>
        <div className="page-content">
          <div className="left-pane">
            <div className="image-container fullwidth shadow">
              <img className="fullwidth rounded" src="https://www.madebywifi.com/wp-content/uploads/2018/01/internet-for-hackatons-1024x480.jpg" alt="" />
            </div>
            <div className="hints-container fullwidth shadow">
              <div className="hints fullwidth rounded">
                 This is a whole bunch of text! This is a whole bunch of text! This is a whole bunch of text!
              </div>
            </div>
          </div>
          <div className="right-pane">
            <div className="solution-selectors fullwidth">
              <div className="map-container fullwidth">
                <div id="map"></div>
              </div>
              <div className="date-selector fullwidth">

              </div>
              <div className="time-selector fullwidth">

              </div>
            </div>
            <button className="submit-guess fullwidth rounded shadow">
              Submit!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
