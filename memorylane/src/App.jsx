import Navbar from './components/navbar'
import LeftPane from './components/leftpane'
import RightPane from './components/rightpane'
import './App.css'

function App() {

  

  function score(d, t) {	// d = distance, t = time
		const maxScore = 5000;

		const distOne = 200000;
		const timeOne = 1826;
		
		const distC = Math.log(maxScore) / distOne;
		const timeC = Math.log(maxScore) / timeOne;

		const distScore = Math.exp(-1 * distC * d);
		const timeScore = Math.exp(-1 * timeC * t);

		return Math.trunc(distScore * timeScore * maxScore);
	}

  let finalScore = score(10000,7);

  return (
    <>
      <div className="main-content">
        <Navbar finalScore= { finalScore }/>
        <div className="page-content">
          <LeftPane />
          <RightPane />
        </div>
      </div>
    </>
  )
}

export default App
