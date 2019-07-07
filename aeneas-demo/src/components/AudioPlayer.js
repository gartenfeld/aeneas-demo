import React from 'react';
import WaveSurfer from 'wavesurfer.js';

class AudioPlayer extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.player = {};
  }

  playTrack() {
    this.player.play(0);
  }

  componentDidMount() {
    this.player = WaveSurfer.create({
      container: this.props.container,
      progressColor: 'DeepPink',
      cursorColor: 'transparent'
    });
    this.player.load(this.props.audioSource);
  }

  render() {
    return (
      <div className="utterance" lang="de">
        <div
          className='play-all button'
          onClick={() => this.playTrack()}
        >
          <span className='button-label'> ▶ </span>
        </div>
      </div>
    );
  }

}

export default AudioPlayer;
