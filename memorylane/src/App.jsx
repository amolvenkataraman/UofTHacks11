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
  //const [url, seturl] = useState(""); // Sets the url to the image
  let url="This is the URL"

  function getResult() {
    axios.get("http://localhost:8080/",config).then(res => { 
      if (res.data.url != "") { 
      // seturl("/../../../Pics/" + res.data.url);
        console.log(url);
      } else {
        console.log("No images found");
      }
  } );
  }

  return (
    <>
      <div>
        <button className="floating" onClick={ getResult }>Click Me</button>
      </div>
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <LeftPane url= { url } />
          <RightPane />
        </div>
      </div>
    </>
  )
}

export default App
