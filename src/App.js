import styled from "styled-components";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import useEventListener from "./hooks/useEventListener";
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
import Shortcuts from "./components/Shortcuts";
import KeyboardIcon from "./components/KeyboardIcon";

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

const TopLeft = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 2;
`;

const App = () => {
  const [play, setPlay] = useState(false);
  const [init, setInit] = useState(false);
  const [ready, setReady] = useState(false);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [activeGifIndex, setActiveGifIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoStatus, setVideoStatus] = useState(-1);
  const [volumeLevel, setVolumeLevel] = useState(10);
  const [videoTitle, setVideoTitle] = useState(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [videos, setVideos] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [activeVideo, setActiveVideo] = useState(false);

  // use default playlist by default
  const getAllVideos = async () => {
    const response = await axios.get(`/api/videos`);
    setVideos(response.data);
  };

  const getUserVideos = async () => {
    const response = await axios.get(`/api/users/${user.username}/videos`);
    setVideos(response.data);
  };

  const handleShowShortcuts = () => {
    setShowShortcuts(!showShortcuts);
  };

  useEffect(() => {
    try {
      if (user && user.username) {
        getUserVideos();
      } else {
        getAllVideos();
      }

      setActiveVideo(videos[currentVideoIndex].key);
    } catch (e) {
      console.log(e);
    }
  }, [user, setUser]);

  useEffect(() => {
    const loggedCofiUser = window.localStorage.getItem("loggedCofiUser");

    if (loggedCofiUser) {
      const user = JSON.parse(loggedCofiUser);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    try {
      console.log(videos);
      setActiveVideo(videos[currentVideoIndex].key);
    } catch (e) {
      console.log(e);
    }
  }, [videos, currentVideoIndex]);

  const handleUserIconClick = () => {
    setShowUserModal(!showUserModal);
  };

  const handleShowPlaylist = (e) => {
    setShowPlaylist(!showPlaylist);
  };

  const handleShuffleGif = () => {
    playBoop();
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

  const [playVolume] = useSound("/sounds/volume.wav", {
    volume: 0.5,
  });

  const handleSetVolume = (level) => {
    let volume = 0;

    if (level < 1) {
      volume = 1;
    } else if (level > 10) {
      volume = 10;
    } else {
      volume = level;
    }

    try {
      setVolumeLevel(volume);
      playVolume();
      videoElement.target.setVolume(volume * 10);
    } catch (e) {}
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
    console.log(videos, videoElement);
    if (videos && videos.length && videoElement) {
      try {
        play
          ? videoElement.target.playVideo()
          : videoElement.target.pauseVideo(); // pause/play
        videoElement.target.setVolume(volumeLevel * 10); // set volume of video to match state
      } catch (e) {
        console.log(e, videoElement);
      }
    }
  }, [play, videoStatus, videos, setVideos]);

  const _onReady = (event) => {
    if (event.target) {
      setReady(true); // allow interaction again
      stop(); // stop static sound
      videoElement = event; // assign new event to videoElement
    }
  };

  const _onStateChange = (event) => {
    console.log(event);
    setVideoStatus(event.data);
    setVideoTitle(event.target.videoTitle);
  };

  function handler({ key, target }) {
    if (target !== document.body) return;

    if (!init) {
      setInit(true);
      togglePause();
    } else {
      switch (key) {
        case " ":
          togglePause();
          break;
        case "p":
          handleShowPlaylist();
          break;
        case "ArrowRight":
          handleNextVideo();
          break;
        case "ArrowDown":
          handleSetVolume(volumeLevel - 1);
          break;
        case "ArrowUp":
          handleSetVolume(volumeLevel + 1);
          break;
        case "s":
          handleShuffleGif();
          break;
        case "m":
          handleSetVolume(0);
          break;
        case "l":
          setLowPowerMode(!lowPowerMode);
          break;
        default:
          console.log("unsupported " + key);
      }
    }
  }

  useEventListener("keydown", handler);

  return (
    <Root>
      <Playlist
        videos={videos}
        showPlaylist={showPlaylist}
        handleShowPlaylist={handleShowPlaylist}
        activeVideo={activeVideo}
        handleSetVideo={handleSetVideo}
        setVideos={setVideos}
        user={user}
      />
      <PlayTrigger
        ready={ready && showPlaylist === false}
        play={play}
        togglePause={togglePause}
      />
      <VideoWrapper>
        {console.log(activeVideo)}
        {videos && activeVideo ? (
          <YouTube
            style={{ zIndex: 1, position: "relative" }}
            videoId={activeVideo}
            opts={opts}
            onReady={_onReady}
            onStateChange={_onStateChange}
            onEnd={handleNextVideo}
          />
        ) : null}
      </VideoWrapper>
      <Gif activeGif={gifs[activeGifIndex].filename} play={play} />
      {lowPowerMode ? null : <Lines />}
      <Static ready={ready} />
      <TopLeft>
        <div onClick={handleShowShortcuts}>
          <KeyboardIcon showShortcuts={showShortcuts} />
        </div>
      </TopLeft>
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
      <Shortcuts
        handleShowShortcuts={handleShowShortcuts}
        showShortcuts={showShortcuts}
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
