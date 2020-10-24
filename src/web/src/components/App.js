import './App.css';

// import Map from './Map/Map'
import Sine from './Sine/Sine'

function App() {
  return (
    <div className="App fullscreen-container">
      <header className="App-header">
      </header>
      {/* <Map /> */}
      
      {/* TODO: have to normalize all amplitudes before passing to Sine comp. */}
      <Sine />
      
    </div>
  );
}

export default App;
