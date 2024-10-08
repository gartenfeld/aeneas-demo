import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import AudioPlayer from './AudioPlayer';
import Recorder from './Recorder';

// import originalAudio from '../data/audio/ursache.wav';
import originalFragments from '../data/ursache_fragments.json'

const originalFromServer = 'http://localhost:3030/static/original/ursache.wav';

class Connector extends React.Component {

  constructor() {
    super();
    this.state = {
      originalPlayer: {},
      learnerPlayer: {},
      userFragments: null
    };
  }

  updateFragments = (fragments) => {
    this.setState({ userFragments: fragments });
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
            audioSource={originalFromServer}
            fragments={originalFragments.fragments}
          >
          </AudioPlayer>
          <div id="original-waves" className="surfer-waveform"></div>
        </div>
        <Recorder player={this.state.learnerPlayer} updateFragments={this.updateFragments}></Recorder>
        <div className="user-recording">
          <AudioPlayer
            player={this.state.learnerPlayer}
            fragments={this.state.userFragments}
          >
          </AudioPlayer>
          <div id="learner-waves" className="surfer-waveform"></div>
        </div>
      </div>
    );
  }

}

export default Connector;
