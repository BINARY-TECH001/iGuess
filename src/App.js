import { useEffect, useState } from "react"
import Wordle from './components/Wordle'

const Nav = ()=>{
  return (
    <div className="nav">
      <h1><i>iGuess</i></h1>
    </div>
  )
}
function App() {

  const [solution, setSolution] = useState(null)

  useEffect(() => {
  fetch('http://localhost:3001/solutions')
    .then(res=> res.json())
    .then(json=>{
      const randomSolution = json[Math.floor(Math.random() * json.length)];
      setSolution(randomSolution.word)
    })
  }, [setSolution])
  
  return (
    <>
      <Nav />
      <div className="App">
        {solution && <Wordle solution={solution} />}
      </div>
    </>
  );
}

export default App;
