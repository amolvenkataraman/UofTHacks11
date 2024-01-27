import { useState } from 'react'
import Navbar from './components/navbar'
import LeftPane from './components/leftpane'
import RightPane from './components/rightpane'
import axios from "axios";
import './App.css'

var config = { headers: {  
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'}
}

function App() {
  const [count, setCount] = useState(0)

  function getResult() {
    axios.get("http://localhost:8080/",config).then(res => console.log(res.data.message));
  }

  return (
    <>
      <div>
        <button onClick={ getResult }>Click Me</button>
      </div>
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <LeftPane />
          <RightPane />
        </div>
      </div>
    </>
  )
}

export default App
