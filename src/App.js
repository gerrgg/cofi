  
import styled from "styled-components";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import Gif from './components/Gif';
import Controls from './components/Controls';
import Welcome from './components/Welcome';
import PlayTrigger from './components/PlayTrigger';
import gifs from './gifs';


let videoElement = null;

const Root = styled.main`width: 100vw; height: 100vh;`;

const App = () => {
  const [play, setPlay] = useState(false);
  const [init, setInit] = useState(false);
  const [activeGifIndex, setActiveGifIndex] = useState(0);
  const [activeGif, setActiveGif] = useState(gifs[activeGifIndex].filename);

  const handleShuffleGif = () => {
    setActiveGifIndex(activeGifIndex + 1 > gifs.length ? 0 : activeGifIndex + 1);
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
    if (videoElement) {
      play ? videoElement.target.playVideo() : videoElement.target.pauseVideo();
    }
  }, [play]);

  const _onReady = (event) => {
    if( event.target ){
      videoElement = event;
    }
  };

  return (
    <Root>
      <PlayTrigger play={play} togglePause={togglePause} />
      <YouTube style={{zIndex: -10, position: 'relative'}} videoId={"cbuZfY2S2UQ"} opts={opts} onReady={_onReady} />
      <Gif activeGif={activeGif} play={play} />
      {
        init ? <Controls play={play} togglePause={togglePause} handleShuffleGif={handleShuffleGif} /> : <Welcome />
      }
    </Root>
  );
}

export default App;