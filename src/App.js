  
import styled from "styled-components";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import Gif from './components/Gif';
import Controls from './components/Controls';
import Welcome from './components/Welcome';
import PlayTrigger from './components/PlayTrigger';
import gifs from './gifs';
import videos from './videos';

let videoElement = null;

const Root = styled.main`width: 100vw; height: 100vh; background: #333`;

const App = () => {
  const [play, setPlay] = useState(false);
  const [init, setInit] = useState(false);
  const [activeGifIndex, setActiveGifIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoStatus, setVideoStatus] = useState(-1);

  const handleShuffleGif = () => {
    const random = Math.floor(Math.random() * gifs.length);
    random !== activeGifIndex ? setActiveGifIndex(random) : handleShuffleGif();
  }
  
  const handleShuffleVideo = () => {
    setActiveGifIndex(activeGifIndex + 1 >= gifs.length ? 0 : activeGifIndex + 1);
    setCurrentVideoIndex(currentVideoIndex + 1 >= videos.length ? 0 : currentVideoIndex + 1);
  }

  const togglePause = () => {
    if( ! init ){
      setInit(true);
    }
    setPlay(!play);
  };

  const opts = {
    playerVars: {
      autoplay: 0
    }
  };

  useEffect(() => {
    if( videoElement === null ) return;

    play ? videoElement.target.playVideo() : videoElement.target.pauseVideo();
    
  }, [play, videoStatus]);

  const _onReady = (event) => {
    if( event.target ){
      videoElement = event;
    }
  };

  const _onStateChange = (event) => {
    console.log(event.data);
    setVideoStatus(event.data);
  };


  return (
    <Root>
      <PlayTrigger play={play} togglePause={togglePause} />
      <YouTube style={{zIndex: 1, position: 'relative'}} videoId={videos[currentVideoIndex].id} opts={opts} onReady={_onReady} onStateChange={_onStateChange} />
      <Gif activeGif={gifs[activeGifIndex].filename} play={play} />
      {
        init ? <Controls 
                play={play} 
                togglePause={togglePause} 
                handleShuffleGif={handleShuffleGif} 
                handleShuffleVideo={handleShuffleVideo} 
               /> : <Welcome />
      }
    </Root>
  );
}

export default App;