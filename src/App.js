import styled from "styled-components";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import Gif from "./components/Gif";
import Controls from "./components/Controls";
import Welcome from "./components/Welcome";
import PlayTrigger from "./components/PlayTrigger";
import Lines from "./components/Lines";
import gifs from "./gifs";
import videos from "./videos";
import Static from "./components/Static";
import useSound from "use-sound";

let videoElement = null;

const Root = styled.main`
  width: 100vw;
  height: 100vh;
  background: #333;
`;

const App = () => {
  const [play, setPlay] = useState(false);
  const [init, setInit] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeGifIndex, setActiveGifIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoStatus, setVideoStatus] = useState(-1);
  const [volumeLevel, setVolumeLevel] = useState(10);
  const [videoTitle, setVideoTitle] = useState(null);

  const handleShuffleGif = () => {
    const random = Math.floor(Math.random() * gifs.length);
    random !== activeGifIndex ? setActiveGifIndex(random) : handleShuffleGif();
  };

  const handleShuffleVideo = () => {
    setActiveGifIndex(
      activeGifIndex + 1 >= gifs.length ? 0 : activeGifIndex + 1
    );
    setCurrentVideoIndex(
      currentVideoIndex + 1 >= videos.length ? 0 : currentVideoIndex + 1
    );

    setVideoTitle(null);
    playStatic();
    setReady(false);
  };

  const [playStatic, { stop }] = useSound("/sounds/static.mp3", {
    volume: 0.5,
  });

  const [playBoop] = useSound("/sounds/boop.wav", {
    volume: 0.25,
  });

  const [playVolume] = useSound("/sounds/volume.wav", {
    volume: 0.5,
  });

  const handleSetVolume = (level) => {
    try {
      setVolumeLevel(level);
      videoElement.target.setVolume(level * 10);
    } catch (e) {
      console.log(e);
    }
  };

  const togglePause = () => {
    if (!init) {
      setInit(true);
    }
    setPlay(!play);
    playBoop();
  };

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  // buggy
  useEffect(() => {
    try {
      play ? videoElement.target.playVideo() : videoElement.target.pauseVideo();
      handleSetVolume(Math.ceil(videoElement.target.getVolume() / 10));
    } catch (e) {
      console.log(e, videoElement);
    }
  }, [play, videoStatus]);

  const _onReady = (event) => {
    if (event.target) {
      setReady(true); // allow interaction again
      stop(); // stop static sound
      videoElement = event; // assign new event to videoElement
    }
  };

  const _onStateChange = (event) => {
    setVideoStatus(event.data);
    setVideoTitle(event.target.videoTitle);
  };

  return (
    <Root>
      <PlayTrigger ready={ready} play={play} togglePause={togglePause} />
      <YouTube
        style={{ zIndex: 1, position: "relative" }}
        videoId={videos[currentVideoIndex].id}
        opts={opts}
        onReady={_onReady}
        onStateChange={_onStateChange}
        onEnd={handleShuffleVideo}
      />
      <Gif activeGif={gifs[activeGifIndex].filename} play={play} />
      <Lines />
      <Static ready={ready} />
      {init ? (
        <Controls
          play={play}
          togglePause={togglePause}
          handleShuffleGif={handleShuffleGif}
          handleShuffleVideo={handleShuffleVideo}
          volumeLevel={volumeLevel}
          handleSetVolume={handleSetVolume}
          videoTitle={videoTitle}
        />
      ) : (
        <Welcome ready={ready} />
      )}
    </Root>
  );
};

export default App;
