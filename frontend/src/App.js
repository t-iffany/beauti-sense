import './App.css';
import VideoFeed from './VideoFeed';

function App() {
  return (
    <div className="App">
      <h1>BeautiSense</h1>
      <div className="App-header">
        generate new look | get inspired
      </div>
      <VideoFeed />
      <div className="ai-comment">
      <p>Writing something... </p>
      <button>listen</button>    
      </div>  
    </div>
  );
}

export default App;
