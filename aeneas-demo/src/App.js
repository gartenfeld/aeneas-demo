import React from 'react';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import originalAudio from './data/audio/ursache.wav';

function App() {
  return (
    <div className="App">
      <AudioPlayer container={'#original'} audioSource={originalAudio}></AudioPlayer>
      <div id="original" className="surfer-waveform"></div>
    </div>
  );
}

export default App;
