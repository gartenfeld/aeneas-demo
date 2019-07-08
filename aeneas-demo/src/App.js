import React from 'react';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import Recorder from './components/Recorder';

import originalAudio from './data/audio/ursache.wav';
import originalFragments from './data/ursache_fragments.json'

function App() {
  return (
    <div className="App">
      <div className="original-recording">
        <AudioPlayer
          container={'#original-waves'}
          audioSource={originalAudio}
          fragments={originalFragments.fragments}
        >
        </AudioPlayer>
        <div id="original-waves" className="surfer-waveform"></div>
      </div>
      <Recorder></Recorder>
      <div className="user-recording">
        <AudioPlayer
          container={'#user-waves'}
          audioSource={originalAudio}
        >
        </AudioPlayer>
        <div id="user-waves" className="surfer-waveform"></div>
      </div>
    </div>
  );
}

export default App;
