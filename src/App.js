import { React, useState } from 'react';
import './App.css';
import CassetteCircle from './assets/cassette circle.svg'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';

function App() {

  const [isPlaying, setisPlaying] = useState(true);
  const [isForward, setisForward] = useState(false);
  const [isRewind, setisRewind] = useState(false);
  const standardColor = 'bg-[#B07154]';
  const activeColor = 'bg-[#4C2B1C]';

  const handlePlayPause = () => {
    isPlaying ? setisPlaying(false) : setisPlaying(true);
    console.log('isPlaying ', isPlaying)
    if (isForward) setisForward(false);
    if (isRewind) setisRewind(false);
  }

  const handleForward = () => {
    if (!isForward) setisForward(true);
    console.log('isForward ', isForward);
    if (isRewind) setisRewind(false);
  }

  const handleRewind = () => {
    setisRewind(true);
    console.log('isRewind ', isRewind);

    if (isForward) setisForward(false);
  }

  return (
    <div id='background' className='flex flex-col justify-center items-center h-screen w-screen gap-10 bg-[#311F13]'>y
      <div className="flex flex-row justify-center items-center lg:h-96 lg:w-2/5 w-1/2 h-64 px-20 gap-20
       rounded-2xl bg-[#B07154]"
      >
        <img
          className={'lg:w-56 w-36 transition-all spin mr-5 ' + (!isPlaying && 'paused') + ' ' + (isForward && 'faster') + ' ' + (isRewind && 'backwards')}
          src={CassetteCircle} />
        <img
          className={'lg:w-40 w-24 transition-all spin ml-5 ' + (!isPlaying && 'paused') + ' ' + (isForward && 'faster') + ' ' + (isRewind && 'backwards')}
          src={CassetteCircle} />
      </div>
      <div className='grid grid-rows-1 grid-cols-3 lg:w-2/5 w-1/2 text-center h-16 px-5 gap-20'>
        <button
          onClick={handleRewind}
          className={'rounded-xl basis-auto hover:bg-[#A87E62] ' + (!isRewind ? standardColor : activeColor)} >
          <FastRewindIcon fontSize='large' className='text-white ' />
        </button>
        <button
          onClick={handlePlayPause}
          className={'rounded-xl basis-auto hover:bg-[#A87E62] ' + (isPlaying ? standardColor : activeColor)}>
          {isPlaying ? (<PlayArrowIcon fontSize='large' className='text-white' />) : (<PauseIcon fontSize='large' className='text-white' />)}
        </button>
        <button
          onClick={handleForward}
          className={'rounded-xl basis-auto hover:bg-[#A87E62] ' + (!isForward ? standardColor : activeColor)} >
          <FastForwardIcon fontSize='large' className='text-white' />
        </button>
      </div>
    </div>
  );
}

export default App;
