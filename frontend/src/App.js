import './App.css';
import VideoFeed from './VideoFeed';
import { useState, useEffect } from 'react';


function App() {
  const [text, setText] = useState("");
  const [counter, setCounter] = useState(1);
  const [currentWord, setCurrentWord] = useState("");

  function handleClick() {
    
    setCounter(counter + 1); 
    let generateText = "";
    switch(counter) {
      case 1:
        generateText = 'According to the data collected, it appears that your lipstick did not fully cover your entire lips.'
        break;
      case 2:
        generateText = 'Your make up looks good, you look amazing!'
        break;
      default:
        generateText = ""
    }
    setText(generateText);
  }

  useEffect(() => {
    let currentIndex = 0;
    let intervalId = null;
    setCurrentWord("");
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

  // add the useEffect to preload voices when the component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    synth.getVoices();
  }, []);

  const handleListenClick = () => {
    // access the speech synthesis functionality of the browser
    const synth = window.speechSynthesis;
    // function to select a female voice and speak the text
    const speakWithFemaleVoice = () => {
      const voices = synth.getVoices();
      // find the first female voice in the list
      const femaleVoice = voices.find((voice) => 
        // check if the voice name contains 'female' or 'woman'
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('woman')
      );

      // create a new SpeechSynthesisUtterance instance with the 'text' state variable
      const utterance = new SpeechSynthesisUtterance(text);
      // set the voice to the first available voice in the browser
      utterance.voice = femaleVoice || voices[0];
      // set the pitch of the speech
      utterance.pitch = 1;
      // set the rate or speed of the speech
      utterance.rate = 1;
      // use the speech synthesis functionality to speak the text aloud
      synth.speak(utterance);
    };

    // if voices are loaded, call the speakWithFemalVoice function
    if (synth.getVoices().length !== 0) {
      speakWithFemaleVoice();
    } else {
      // if voices not loaded yet, listen for voicesChanged event and call the speakWithFemaleVoice function
      synth.addEventListener('voiceschanged', speakWithFemaleVoice, { once: true });
    }
  };

  return (
    <div className="App">
      <h1 className='logo'>Beauti<span className="half">Sense</span></h1>
      <div className="App-header">
        <button className='header-button left'>Generate New Look</button>
        <button className='header-button right'>Get Inspired</button>
      </div>
      <VideoFeed />
      <div><button className='check-btn' onClick={handleClick}>Check My Makeup</button></div>
      <div className="ai-comment">
      <p className='text'>{currentWord} </p>
      {text && <button className='listen-btn' onClick={handleListenClick}>Listen</button>}  
      </div>  
    </div>
  );
}

export default App;
