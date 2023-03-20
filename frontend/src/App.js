import './App.css';
import VideoFeed from './VideoFeed';
import { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState("");
  const [currentWord, setCurrentWord] = useState("");

  function handleClick() {
    const generateText = 'According to the data collected, it appears that your lipstick did not fully cover your entire lips.'
    setText(generateText);
  }

  useEffect(() => {
    let currentIndex = 0;
    let intervalId = null;

    function typeWord() {
      const words = text.split(" ");
      const nextWord = words[currentIndex];
      setCurrentWord((prevWord) => prevWord + " " + nextWord);
      currentIndex++

      if (currentIndex >= words.length) {
        clearInterval(intervalId);
      }
    }

    if(text) {
      intervalId = setInterval(typeWord, 150);
    }

    return () => clearInterval(intervalId);
  }, [text])

  return (
    <div className="App">
      <h1>BeautiSense</h1>
      <div className="App-header">
        generate new look | get inspired
      </div>
      <VideoFeed />
      <button onClick={handleClick}>Check my makeup</button>
      <div className="ai-comment">
      <p>{currentWord} </p>
      <button>listen</button>    
      </div>  
    </div>
  );
}

export default App;
