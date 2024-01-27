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
            <div className="image-container fullwidth">
              <img className="fullwidth rounded" src="https://plus.unsplash.com/premium_photo-1705418057300-84235e5f265a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <div className="hints-container fullwidth ">

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
            <button className="submit-guess fullwidth rounded">

            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
