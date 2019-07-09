import React from 'react';
import axios from '../utils/axios';

class Recorder extends React.Component {

  constructor() {
    super();
    this.state = {
      recorder: {},
      // audioSrc: '',
      isRecording: false
    };
  }

  postData = blob => {
    const data = new FormData();
    const timestamp = Date.now() + '';
    data.append('audioBlob', blob, timestamp);
    const params = {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    }
    return axios.post('upload/', data, params);
  }

  addAudioSrc = event => {
    // const blob = URL.createObjectURL(event.data);
    // this.setState({ audioSrc: blob });
    // this.props.player.load(blob);
    this.postData(event.data).then(response => {
      const baseName = response.data.id;
      const url = 'http://localhost:3030/static/' + baseName + '.mp3'
      this.props.player.load(url);
      this.props.updateFragments(response.data.fragments);
    })
  }

  getRecorder = () => {
    return navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => new MediaRecorder(stream))
      .catch(err => {});
  }

  startRecording = () => {
    return this.getRecorder().then(recorder => {
      this.setState({ recorder: recorder });
      recorder.ondataavailable = this.addAudioSrc;
      recorder.start();
      this.setState({ isRecording: true });
      console.log('Recording started.');
    });
  }

  endRecording = () => {
    this.state.recorder.stop();
    this.setState({ isRecording: false });
    console.log('Recording stopped.');
  }

  onClickButton = () => {
    if (!this.state.isRecording) {
      this.startRecording();
      return;
    }
    this.endRecording();
  }

  render() {
    const { isRecording } = this.state;
    const buttonLabel = isRecording ? 'Stop' : 'Record'
    return (
      <div>
        <div className="button record-button" onClick={ this.onClickButton }>
          <span className='button-label'>{ buttonLabel }</span>
        </div>
      </div>
    );;
  }

}

export default Recorder;
