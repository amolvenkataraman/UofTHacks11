import Navbar from './components/navbar'
import LeftPane from './components/leftpane'
import RightPane from './components/rightpane'
import './App.css'

function App() {

  return (
    <>
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
