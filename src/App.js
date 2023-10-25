import styled from "styled-components";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import useEventListener from "./hooks/useEventListener";
import axios from "axios";
import ReactGA from "react-ga";
import YouTube from "react-youtube";
import Gif from "./components/Gif";
import Controls from "./components/Controls";
import Welcome from "./components/Welcome";
import PlayTrigger from "./components/PlayTrigger";
import Lines from "./components/Lines";
import Static from "./components/Static";
import Playlist from "./components/Playlist";
import UserControls from "./components/UserControls";
import UserModal from "./components/UserModal";
import Shortcuts from "./components/Shortcuts";
import TopLeft from "./components/TopLeft";

let videoElement = null;

const Root = styled.main`
  width: 100vw;
  height: 100vh;
  background: #333;
  overflow: hidden;
  font-family: "Press Start 2P", cursive;

  * {
    text-shadow: 2px 2px black;
    // outline: 1px solid red;
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

ReactGA.initialize("G-918KJ7145K");
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => {
  const [play, setPlay] = useState(false);
  const [init, setInit] = useState(false);
  const [ready, setReady] = useState(false);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(false);
  const [videoStatus, setVideoStatus] = useState(-1);
  const [volumeLevel, setVolumeLevel] = useState(10);
  const [videoTitle, setVideoTitle] = useState(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [videos, setVideos] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [activeVideo, setActiveVideo] = useState(false);
  const [showGifForm, setShowGifForm] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [activeGifIndex, setActiveGifIndex] = useState(false);
  const [currentGif, setCurrentGif] = useState(null);

  // use default playlist by default
  const getAllVideos = async () => {
    console.log("getAllVideos");
    const response = await axios.get(`/api/videos`);
    setVideos(response.data);
  };

  const getUserVideos = async () => {
    console.log("getUserVideos");
    const response = await axios.get(`/api/users/${user.username}/videos`);
    setVideos(response.data);
  };

  const getAllGifs = async () => {
    console.log("getAllGifs");
    const response = await axios.get(`/api/users/default/gifs`);
    setGifs(response.data);
  };

  const getUserGifs = async () => {
    console.log("getUserGifs");
    const response = await axios.get(`/api/users/${user.username}/gifs`);
    setGifs(response.data);
  };

  const handleShowShortcuts = () => {
    console.log("handleShowShortcuts");
    setShowShortcuts(!showShortcuts);
  };

  const handleCopyToClipboard = (e) => {
    console.log("handleCopyToClipboard");
    e.preventDefault();

    navigator.clipboard.writeText(
      "🐟 COFI.SH brings you music from beautiful people and creative minds. https://cofi.sh"
    );
  };

  const handleUserIconClick = () => {
    console.log("handleUserIconClick");
    setShowUserModal(!showUserModal);
  };

  const handleShowPlaylist = (e) => {
    console.log("handleShowPlaylist");
    setShowPlaylist(!showPlaylist);
  };

  const getRandom = (array, callback, exclude) => {
    console.log("getRandom");
    const random = Math.floor(Math.random() * array.length);
    random !== exclude ? callback(random) : getRandom(array, callback);
    return random;
  };

  const handleShuffleGif = () => {
    console.log("handleShuffleGif");
    if (gifs.length !== 1 && videos.length !== 1) {
      // playBoop();
      getRandom(gifs, setActiveGifIndex, activeGifIndex);
      getRandom(videos, setCurrentVideoIndex, currentVideoIndex);
      setVideoTitle(null);
      playStatic();
      setReady(false);
    }
  };

  const handleNextVideo = () => {
    console.log("handleNextVideo");
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
    console.log("handleSetVideo");
    if (key === activeVideo) return;

    let index = null;

    videos.forEach((video, i) => {
      if (video.key === key) index = i;
    });

    // handleShuffleGif();
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
    console.log("handleSetVolume");
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
    console.log("togglePause");
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
    if (videos && videos.length && videoElement) {
      try {
        console.log("working with videoElement");
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
    setVideoStatus(event.data);
    setVideoTitle(event.target.videoTitle);
  };

  const handleMute = () => {
    if (videoElement) {
      if (videoElement.target.isMuted()) {
        setVolumeLevel(videoElement.target.getVolume() / 10);
        videoElement.target.unMute();
      } else {
        setVolumeLevel(0);
        videoElement.target.mute();
      }
    }
  };

  useEffect(() => {
    console.log("get-resources", user);
    try {
      if (user && user.username) {
        console.log("set user videos");
        setVideos(user.videos);
        setGifs(user.gifs);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [user, setUser, setVideos, videos]);

  const getUserResources = async () => {
    await getUserVideos();
    await getUserGifs();
    console.log("get getUserResources");
  };

  const setDefaultResources = async () => {
    await getAllGifs();
    await getAllVideos();
    console.log("set default resources");
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * gifs.length);

    if (activeGifIndex === false) {
      console.log("set random gif");
      setCurrentGif(gifs[random]);
    } else {
      console.log("set active gif");
      setCurrentGif(gifs[activeGifIndex]);
    }
  }, [gifs, setActiveGifIndex, activeGifIndex]);

  useEffect(() => {
    if (currentVideoIndex === false) {
      const random = Math.floor(Math.random() * videos.length);
      if (videos[random]) {
        setActiveVideo(videos[random].key);
        setCurrentVideoIndex(random);
      }
    } else {
      if (videos[currentVideoIndex]) {
        setActiveVideo(videos[currentVideoIndex].key);
      }
    }
  }, [videos, setCurrentVideoIndex, currentVideoIndex]);

  useEffect(() => {
    const loggedCofiUser = window.localStorage.getItem("loggedCofiUser");

    if (loggedCofiUser) {
      const user = JSON.parse(loggedCofiUser);
      setUser(user);
    } else {
      setDefaultResources();
    }
  }, []);

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
          handleMute();
          break;
        case "l":
          setLowPowerMode(!lowPowerMode);
          break;
        case "c":
          setShowShortcuts(!showShortcuts);
          break;
        default:
          console.log("unsupported " + key);
      }
    }
  }

  useEventListener("keydown", handler);

  const handleClicks = (e) => {
    if (showGifForm) {
      setShowGifForm(!showGifForm);
    }
  };

  return (
    <Root onClick={handleClicks}>
      <Playlist
        videos={videos}
        showPlaylist={showPlaylist}
        handleShowPlaylist={handleShowPlaylist}
        activeVideo={activeVideo}
        handleSetVideo={handleSetVideo}
        setVideos={setVideos}
        user={user}
        setShowUserModal={setShowUserModal}
      />
      <PlayTrigger
        ready={ready && showPlaylist === false}
        play={play}
        togglePause={togglePause}
      />
      <VideoWrapper>
        {videos.length && activeVideo ? (
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

      {gifs && currentGif ? <Gif activeGif={currentGif} play={play} /> : null}

      {lowPowerMode ? null : <Lines />}

      <Static ready={ready} />

      <TopLeft
        handleCopyToClipboard={handleCopyToClipboard}
        handleShowShortcuts={handleShowShortcuts}
        showShortcuts={showShortcuts}
      />
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
          showGifForm={showGifForm}
          setShowGifForm={setShowGifForm}
          user={user}
          setGifs={setGifs}
          gifs={gifs}
          setActiveGifIndex={setActiveGifIndex}
        />
      ) : (
        <Welcome ready={ready} />
      )}
    </Root>
  );
};

export default App;
