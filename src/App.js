import styled from "styled-components";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import axios from "axios";

import YouTube from "react-youtube";
import Gif from "./components/Gif";
import Controls from "./components/Controls";
import Welcome from "./components/Welcome";
import PlayTrigger from "./components/PlayTrigger";
import Lines from "./components/Lines";
import gifs from "./gifs";
import Static from "./components/Static";
import Playlist from "./components/Playlist";
import UserControls from "./components/UserControls";
import UserModal from "./components/UserModal";

let videoElement = null;

const Root = styled.main`
  width: 100vw;
  height: 100vh;
  background: #333;
  overflow: hidden;
  font-family: "Press Start 2P", cursive;

  * {
    text-shadow: 2px 2px black;
  }
`;

const VideoWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 1px;
  width: 1px;
  overflow hidden;
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
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [videos, setVideos] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [user, setUser] = useState(null);

  // use default playlist by default
  const [activePlaylist, setActivePlaylist] = useState(
    "647292a106b18a4d7c802c7e"
  );

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/playlists/${activePlaylist}`)
      .then((response) => setVideos(response.data.videos));
  }, []);

  const handleUserIconClick = () => {
    setShowUserModal(!showUserModal);
  };

  const handleShowPlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  const handleShuffleGif = () => {
    const random = Math.floor(Math.random() * gifs.length);
    random !== activeGifIndex ? setActiveGifIndex(random) : handleShuffleGif();
  };

  const handleNextVideo = () => {
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

  const handleSetVideo = (key) => {
    let index = null;

    videos.forEach((video, i) => {
      if (video.key === key) index = i;
    });

    handleShuffleGif();
    setCurrentVideoIndex(index);

    setVideoTitle(null);
    playStatic();
    setReady(false);
  };

  const [playStatic, { stop }] = useSound("/sounds/static.mp3", {
    volume: 0.25,
  });

  const [playBoop] = useSound("/sounds/boop.wav", {
    volume: 0.25,
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
    if (videos && videoElement) {
      try {
        play
          ? videoElement.target.playVideo()
          : videoElement.target.pauseVideo(); // pause/play
        videoElement.target.setVolume(volumeLevel * 10); // set volume of video to match state
      } catch (e) {
        console.log(e, videoElement);
      }
    }
  }, [play, videoStatus, videos]);

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

  const handleKeyDown = (e) => {
    console.log(e);
  };

  return (
    <Root onKeyDown={handleKeyDown}>
      {videos ? (
        <Playlist
          videos={videos}
          showPlaylist={showPlaylist}
          handleShowPlaylist={handleShowPlaylist}
          activeVideo={videos[currentVideoIndex].key}
          handleSetVideo={handleSetVideo}
        />
      ) : null}
      <PlayTrigger
        ready={ready && showPlaylist === false}
        play={play}
        togglePause={togglePause}
      />
      <VideoWrapper>
        {videos ? (
          <YouTube
            style={{ zIndex: 1, position: "relative" }}
            videoId={videos[currentVideoIndex].key}
            opts={opts}
            onReady={_onReady}
            onStateChange={_onStateChange}
            onEnd={handleNextVideo}
          />
        ) : null}
      </VideoWrapper>
      <Gif activeGif={gifs[activeGifIndex].filename} play={play} />
      <Lines />
      <Static ready={ready} />
      <UserControls
        handleUserIconClick={handleUserIconClick}
        showUserModal={showUserModal}
        user={user}
      />
      <UserModal
        setShowUserModal={setShowUserModal}
        showUserModal={showUserModal}
        setUser={setUser}
        user={user}
      />
      {init ? (
        <Controls
          videos={videos}
          play={play}
          togglePause={togglePause}
          handleShuffleGif={handleShuffleGif}
          handleNextVideo={handleNextVideo}
          volumeLevel={volumeLevel}
          handleSetVolume={handleSetVolume}
          videoTitle={videoTitle}
          handleShowPlaylist={handleShowPlaylist}
        />
      ) : (
        <Welcome ready={ready} />
      )}
    </Root>
  );
};

export default App;
