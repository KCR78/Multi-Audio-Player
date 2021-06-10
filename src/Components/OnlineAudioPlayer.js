import React, { useRef, useState } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';

export const OnlineAudioPlayer = () => {

    const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
    const [playlist, setPlaylist] = useState([]);
    const fileNameRef = useRef();
    const fileUrlRef = useRef();

    const handleClickPrevious = () => {
        setCurrentMusicIndex(currentMusicIndex === 0 ? playlist.length - 1 : currentMusicIndex - 1)
    }

    const handleClickNext = () => {
        setCurrentMusicIndex(currentMusicIndex < playlist.length - 1 ? currentMusicIndex + 1 : 0)
    }

    const audioSwitch = (data) => {
        setCurrentMusicIndex(data)
    }

    const uploadAudio = (e) => {
        e.preventDefault();

        if (fileNameRef.current.value !== '' && fileUrlRef.current.value !== '') {
            setPlaylist([
                ...playlist,
                {
                    name: fileNameRef.current.value,
                    src: fileUrlRef.current.value
                }
            ])
            fileNameRef.current.value = '';
            fileUrlRef.current.value = '';
        }
    }

    return (
        <div className='music-box2'>
            <div className='playlist'>
                <div className='playlist-header player2'>Play List</div>
                <div className='list-items'>
                    {playlist.map((item, index) => (
                        <div key={index} className={currentMusicIndex === index ? 'p2-items p2-active' : 'p2-items'} onClick={() => audioSwitch(index)}>
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={uploadAudio}>
                <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        ref={fileNameRef}
                        placeholder="Enter Audio Name"
                    />
                    <input
                        className="form-control"
                        type="text"
                        ref={fileUrlRef}
                        placeholder="Paste Audio Url"
                    />
                    <button className="btn btn-outline-secondary upload-btn" type="submit">
                        <i className="fas fa-upload"></i>
                    </button>
                </div>
            </form>

            <H5AudioPlayer
                autoPlayAfterSrcChange={true}
                showSkipControls={true}
                showJumpControls={true}
                src={playlist.length !== 0 ? playlist[currentMusicIndex].src : ''}
                onClickPrevious={handleClickPrevious}
                onClickNext={handleClickNext}
                header={playlist.length !== 0 ? playlist[currentMusicIndex].name : ''}
            />
        </div>
    );
};