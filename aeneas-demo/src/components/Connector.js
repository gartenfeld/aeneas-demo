import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import AudioPlayer from './AudioPlayer';
import Recorder from './Recorder';

import originalAudio from '../data/audio/ursache.wav';
import originalFragments from '../data/ursache_fragments.json'

class Connector extends React.Component {

  constructor() {
    super();
    this.state = {
      originalPlayer: {},
      learnerPlayer: {}
    };
  }

  componentDidMount() {
    const originalPlayer = WaveSurfer.create({
      container: '#original-waves',
      progressColor: 'DeepPink',
      cursorColor: 'transparent',
      barWidth: 1,
    });
    this.setState({ originalPlayer });
    const learnerPlayer = WaveSurfer.create({
      container: '#learner-waves',
      progressColor: 'DeepPink',
      cursorColor: 'transparent',
      barWidth: 1,
    });
    this.setState({ learnerPlayer });
  }

  render() {
    return (
      <div lang="de">
        <div className="original-recording">
          <AudioPlayer
            player={this.state.originalPlayer}
            audioSource={originalAudio}
            fragments={originalFragments.fragments}
          >
          </AudioPlayer>
          <div id="original-waves" className="surfer-waveform"></div>
        </div>
        <Recorder player={this.state.learnerPlayer}></Recorder>
        <div className="user-recording">
          <AudioPlayer
            player={this.state.learnerPlayer}
          >
          </AudioPlayer>
          <div id="learner-waves" className="surfer-waveform"></div>
        </div>
      </div>
    );
  }

}

export default Connector;
