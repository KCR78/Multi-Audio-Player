import React from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import 'audio-react-recorder/dist/index.css'
import AudioPlayer from 'react-h5-audio-player'

class CustomAudioRecorder extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recordState: null,
            audioData: {
                url: ''
            }
        }
    }

    start = () => {
        this.setState({
            recordState: RecordState.START
        })
    }

    pause = () => {
        this.setState({
            recordState: RecordState.PAUSE
        })
    }

    stop = () => {
        this.setState({
            recordState: RecordState.STOP
        })
    }

    onStop = (data) => {
        this.setState({
            audioData: data
        })
        console.log('onStop: audio data', data)
    }

    render() {
        const { recordState } = this.state

        return (
            <div className='music-box'>

                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" className="btn btn-success" onClick={this.start}><i className="far fa-play-circle"></i> Start Recording</button>
                    <button type="button" className="btn btn-info" onClick={this.pause}><i className="far fa-pause-circle"></i> Pause Recording</button>
                    <button type="button" className="btn btn-danger" onClick={this.stop}><i className="far fa-stop-circle"></i> Stop Recording</button>
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
                />

            </div>
        )
    }
}

export default CustomAudioRecorder
