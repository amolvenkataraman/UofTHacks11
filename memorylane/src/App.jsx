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

function score(d, t) {	// d = distance, t = time
  const maxScore = 5000;

  const distOne = 200000;
  const timeOne = 1826;
  
  const distC = Math.log(maxScore) / distOne;
  const timeC = Math.log(maxScore) / timeOne;

  const distScore = Math.exp(-distC * d);
  const timeScore = Math.exp(-timeC * t);

  return Math.trunc(distScore * timeScore * maxScore);
}

let finalScore = score(10000, 7);


function App() {
  //const [url, seturl] = useState(""); // Sets the url to the image
  let url="This is the URL"

  return (
    <>
      <div className="main-content">
        <Navbar finalScore= { finalScore }/>
        <div className="page-content">
          <LeftPane url= { url } />
          <RightPane />
        </div>
      </div>
    </>
  )
}

export default App
