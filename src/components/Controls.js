import styled from "styled-components";
import PausePlay from "./PausePlay";
import Shuffle from "./Shuffle";
import Next from "./Next";
import Volume from "./Volume";
import useSound from "use-sound";
import { TypeAnimation } from "react-type-animation";

const Root = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 12;
  color: #fff;
`;

const Title = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 15px;
  max-width: 400px;
  cursor: pointer;

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
}) => {
  const [playShuffle] = useSound("/sounds/shuffle.wav", {
    volume: 0.5,
  });

  const handleShuffleClick = () => {
    playShuffle();
    handleShuffleGif();
  };

  return (
    <Root>
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
