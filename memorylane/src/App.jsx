import { useState } from 'react'
import Navbar from './components/navbar'
import LeftPane from './components/leftpane'
import RightPane from './components/rightpane'
import axios from "axios";
import './App.css'

function App() {
  //const [url, seturl] = useState(""); // Sets the url to the image

  return (
    <>
      <div>
        <button>Click Me</button>
      </div>
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <LeftPane url = ""/>
          <RightPane />
        </div>
      </div>
    </>
  )
}

export default App
