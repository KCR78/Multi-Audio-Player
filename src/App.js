import React, { useState } from 'react'
import './App.css';
import 'react-h5-audio-player/lib/styles.css';
import 'audio-react-recorder/dist/index.css'
import CustomAudioRecorder from './Components/AudioRecorder'
import { OnlineAudioPlayer } from './Components/OnlineAudioPlayer'
import { CustomAudioPlayer } from './Components/AudioPlayer';

function App() {

  const [showPlayer, setShowPlayer] = useState('');

  const onChangeValue = (event) => {
    setShowPlayer(event.target.id);
  }

  return (
    <div className='total-area'>
      <div className='nav-box'>
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group" onChange={onChangeValue}>
          <input type="radio" className="btn-check" name="btnradio" id="recorder" />
          <label className="btn btn-outline-secondary" htmlFor="recorder">Audio Recorder</label>

          <input type="radio" className="btn-check" name="btnradio" id="player1" />
          <label className="btn btn-outline-secondary" htmlFor="player1">Audio Player (Existing Audio)</label>

          <input type="radio" className="btn-check" name="btnradio" id="player2" />
          <label className="btn btn-outline-secondary" htmlFor="player2">Audio Player (Online Audio)</label>
        </div>
      </div>

      <hr className='hr-line' />

      <div className='play-boxes'>

        {showPlayer === 'recorder' ? <CustomAudioRecorder />
          : showPlayer === 'player1' ? <CustomAudioPlayer />
            : showPlayer === 'player2' ? <OnlineAudioPlayer />
              : 'Please Choose One...'
        }

      </div>
    </div>
  )
}

export default App;