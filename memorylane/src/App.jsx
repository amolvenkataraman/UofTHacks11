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
  return (
    <>
      <div className="main-content">
        <Navbar/>
        <div className="page-content">
          <LeftPane/>
          <RightPane />
        </div>
      </div>
    </>
  )
}

export default App
