import React from 'react';
import WaveSurfer from 'wavesurfer.js';

class AudioPlayer extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props)
    this.player = WaveSurfer.create({
      container: this.props.container
    });
    this.player.load(this.props.audioSource);
  }

  render() {
    return (
      <div className="utterance" lang="de">
      </div>
    );
  }

}

export default AudioPlayer;
