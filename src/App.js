import { React, useState } from 'react';
import './App.css';
import CassetteCircle from './assets/cassette circle.svg'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import A from './assets/states/A.svg';
import F from './assets/states/F.svg';
import P from './assets/states/P.svg';
import S from './assets/states/S.svg';
import B from './assets/states/B.svg';

function App() {

  const [isPlaying, setisPlaying] = useState(false);
  const [isForward, setisForward] = useState(false);
  const [isRewind, setisRewind] = useState(false);
  const [intervalID, setIntervalID] = useState(0);
  const [state, setState] = useState(S);
  const standardColor = 'bg-[#B07154]';
  const activeColor = 'bg-[#4C2B1C]';

  const endTimer = (start) => {
    console.log((Date.now() - start));
    if ((Date.now() - start) > 10000) {
      setState(A);
      setisForward(false);
      setisRewind(false);
      setisPlaying(false);
      clearInterval(intervalID);
    }
  }
  
  const fastTimer = (start, to) => {
    if ((Date.now() - start) > 5000) {
      setState(to);
      setisForward(false);
      setisRewind(false);
      setisPlaying(false);
      clearInterval(intervalID);
    }
  }

  const handlePlayPause = () => {

    clearInterval(intervalID);

    if (isForward && isPlaying) {
      setisForward(false);
      setState(P);
    }

    else if (isRewind && isPlaying) {
      setisRewind(false);
      setState(P);
    }

    else if (!isPlaying) {
      const start = Date.now();
      setIntervalID(setInterval(endTimer, 1000, start));
      setisPlaying(true);
      setState(P);
    }

    else if (isPlaying) {
      setisPlaying(false);
      setState(S);
    }
  }

  const handleForward = () => {
    clearInterval(intervalID);
    const start = Date.now();
    setIntervalID(setInterval(fastTimer, 1000, start, A));
    if (isPlaying && !isForward) setisForward(true);
    setState(F);
    if (isRewind) setisRewind(false);
  }

  const handleRewind = () => {
    clearInterval(intervalID);
    const start = Date.now();
    setIntervalID(setInterval(fastTimer, 1000, start, S));
    if (isPlaying && !isRewind) setisRewind(true);
    setState(B);
    if (isForward) setisForward(false);
  }

  const end = () => {
    setisForward(false);
    setisRewind(false);
    setisPlaying(false);
    setState(A);
  }

  return (
    <div id='background' className='flex flex-col h-screen w-screen bg-[#311F13]'>
      <div className="flex justify-center items-end h-1/3 w-full">
        <img src={state} alt="" className='h-4/5' onClick={end} />
      </div>
      <div className='w-full h-2/3 flex flex-col justify-center items-center gap-10'>
        <div className="flex flex-row justify-center items-center h-[50%] w-128 px-5 gap-20
         rounded-2xl bg-[#B07154]"
        >
          <img
            className={'w-1/3 transition-all spin mr-5 ' + (!isPlaying && 'paused') + ' ' + (isForward && 'faster') + ' ' + (isRewind && 'backwards')}
            src={CassetteCircle}
            alt='' />
          <img
            className={'w-1/5 transition-all spin ' + (!isPlaying && 'paused') + ' ' + (isForward && 'faster') + ' ' + (isRewind && 'backwards')}
            src={CassetteCircle}
            alt='' />
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
    </div>
  );
}

export default App;
