import React from 'react';

class AudioPlayer extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  playTrack() {
    this.props.player.play(0);
  }

  playFragment = (fragment) => {
    let start = Number(fragment.begin);
    let end =  Number(fragment.end)
    this.props.player.play(start, end);
  }

  componentDidUpdate() {
    const { player, audioSource } = this.props;
    if (audioSource) {
      player.load(audioSource);
    }
  }

  render() {
    const { fragments } = this.props;
    return (
      <div className="utterance" lang="de">
        <div
          className='play-all button'
          onClick={() => this.playTrack()}
        >
          <span className='button-label'> ▶ </span>
        </div>
        { fragments ?
          fragments.map(fragment => {
            return (
              <div
                className='button'
                key={fragment.id}
                onClick={() => this.playFragment(fragment)}
              >
                <span className='button-label'>{ fragment.lines[0] }</span>
              </div>
            );
          }) : ''
        }
      </div>
    );
  }

}

export default AudioPlayer;
