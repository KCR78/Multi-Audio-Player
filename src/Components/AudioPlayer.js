import React, { useState } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import audioFile1 from '../AudioFiles/Imagine Dragons – Thunder.wav'
import audioFile2 from '../AudioFiles/Alan Walker - Faded (Where are you now).wav'
import audioFile3 from '../AudioFiles/Imagine Dragons - Believer.wav'
import audioFile4 from '../AudioFiles/Bekhayali - Kabir Singh.mp3'
import audioFile5 from '../AudioFiles/Gali Gali - KGF.mp3'

export const CustomAudioPlayer = () => {

    const [currentMusicIndex, setCurrentMusicIndex] = useState(0);

    const playlist = [
        { name: 'Imagine Dragons – Thunder', src: audioFile1 },
        { name: 'Alan Walker - Faded (Where are you now)', src: audioFile2 },
        { name: 'Imagine Dragons - Believer', src: audioFile3 },
        { name: 'Bekhayali - Kabir Singh', src: audioFile4 },
        { name: 'Gali Gali - KGF', src: audioFile5 },
    ]

    const handleClickPrevious = () => {
        setCurrentMusicIndex(currentMusicIndex === 0 ? playlist.length - 1 : currentMusicIndex - 1)
    }

    const handleClickNext = () => {
        setCurrentMusicIndex(currentMusicIndex < playlist.length - 1 ? currentMusicIndex + 1 : 0)
    }

    const audioSwitch = (data) => {
        setCurrentMusicIndex(data)
    }
    return (
        <div className='music-box'>
            <div className='playlist'>
                <div className='playlist-header'>Play List</div>
                <div className='list-items'>
                    {playlist.map((item, index) => (
                        <div key={index} className={currentMusicIndex === index ? 'items active' : 'items'} onClick={() => audioSwitch(index)}>
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>

            <H5AudioPlayer
                autoPlayAfterSrcChange={true}
                showSkipControls={true}
                showJumpControls={true}
                src={playlist[currentMusicIndex].src}
                onClickPrevious={handleClickPrevious}
                onClickNext={handleClickNext}
                header={playlist[currentMusicIndex].name}
            />
        </div>
    );
};