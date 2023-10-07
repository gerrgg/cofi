import styled from "styled-components";
import PausePlay from "./PausePlay";
import Shuffle from "./Shuffle";
import Next from "./Next";
import Volume from "./Volume";
import useSound from "use-sound";
import { TypeAnimation } from "react-type-animation";
import GifIcon from "./GifIcon";
import GifForm from "./GifForm";

const Root = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 12;
  color: #fff;
  width: 100%;
  max-width: 500px;

  @media (max-width: 500px) {
    max-width: calc(100% - 1rem);
  }
`;

const Title = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 15px;
  max-width: 500px;
  cursor: pointer;
  max-height: 63px;
  overflow: hidden;

  overflow: ellipsis;

  &:hover {
    color: lightgreen;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

const Controls = ({
  videos,
  play,
  togglePause,
  handleShuffleGif,
  handleNextVideo,
  handleSetVolume,
  volumeLevel,
  videoTitle,
  handleShowPlaylist,
  showGifForm,
  setShowGifForm,
  user,
  setGifs,
  gifs,
  setActiveGifIndex,
}) => {
  const [playShuffle] = useSound("/sounds/shuffle.wav", {
    volume: 0.5,
  });

  const handleShuffleClick = () => {
    playShuffle();
    handleShuffleGif();
  };

  const handleShowGifForm = () => {
    setShowGifForm(!showGifForm);
  };

  return (
    <Root>
      <GifForm
        showGifForm={showGifForm}
        handleShowGifForm={handleShowGifForm}
        user={user}
        setGifs={setGifs}
        gifs={gifs}
        setActiveGifIndex={setActiveGifIndex}
      />
      <Title onClick={handleShowPlaylist}>
        {videos.length ? (
          videoTitle
        ) : (
          <TypeAnimation
            sequence={[
              // Same String at the start will only be typed once, initially
              "Click here to start adding videos",
              1000,
              "Click here to start building your playlist",
              1000,
              "Click here to impress your friends and influence people",
              1000,
              "Click here to be a legend",
              1000,
            ]}
            speed={25}
            style={{ fontWeight: "bold" }}
            repeat={Infinity}
          />
        )}
      </Title>
      <Row>
        <div onClick={togglePause}>
          <PausePlay enableHover={true} play={play} />
        </div>
        <div onClick={handleShuffleClick}>
          <Shuffle />
        </div>
        <div onClick={handleShowGifForm}>
          <GifIcon />
        </div>
        {videos.length > 0 ? (
          <div onClick={handleNextVideo}>
            <Next />
          </div>
        ) : null}
        <Volume volumeLevel={volumeLevel} handleSetVolume={handleSetVolume} />
      </Row>
    </Root>
  );
};

export default Controls;
