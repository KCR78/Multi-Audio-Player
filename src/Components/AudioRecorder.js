import React from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import 'audio-react-recorder/dist/index.css'
import AudioPlayer from 'react-h5-audio-player'

class CustomAudioRecorder extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recordState: null,
            isRecording: false,
            audioData: null,
        }
    }

    start = () => {
        this.setState({
            recordState: RecordState.START,
            isRecording: true
        })
    }

    pause = () => {
        this.setState({
            recordState: RecordState.PAUSE
        })
    }

    stop = () => {
        this.setState({
            recordState: RecordState.STOP,
            isRecording: false
        })
    }

    onStop = (data) => {
        this.setState({
            audioData: data
        })
    }

    download = () => {
        const downloadUrl = window.URL.createObjectURL(new Blob([this.state.audioData.blob]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'Recording.wav');
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    render() {
        const { recordState } = this.state

        return (
            <div className='music-box'>

                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" className="btn btn-success" onClick={this.start}><i className="far fa-play-circle"></i> Start Recording</button>
                    <button disabled={!this.state.isRecording} type="button" className="btn btn-info" onClick={this.pause}><i className="far fa-pause-circle"></i> Pause Recording</button>
                    <button disabled={!this.state.isRecording} type="button" className="btn btn-danger" onClick={this.stop}><i className="far fa-stop-circle"></i> Stop Recording</button>
                </div>

                <div className="rec-status">Status :&nbsp;
                    <label>
                        {this.state.recordState === 'start' ? 'Listening...'
                            : this.state.recordState === 'pause' ? 'Pause'
                                : this.state.recordState === 'stop' ? 'Recording Ended'
                                    : null
                        }
                    </label>
                </div>

                <AudioReactRecorder
                    state={recordState}
                    onStop={this.onStop}
                    backgroundColor='rgb(255,255,255)'
                />

                <AudioPlayer
                    volume={0.8}
                    progressUpdateInterval={100}
                    src={this.state.audioData ? this.state.audioData.url : null}
                    autoPlayAfterSrcChange={false}
                    customAdditionalControls={
                        [
                            this.state.audioData ? <i className="fas fa-download download-btn" onClick={this.download} title='Download This Recording'></i> : false
                        ]
                    }
                />

            </div>
        )
    }
}

export default CustomAudioRecorder
