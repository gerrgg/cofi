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
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

const Controls = ({
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
      <Title onClick={handleShowPlaylist}>{videoTitle}</Title>
      <Row>
        <div onClick={togglePause}>
          <PausePlay play={play} />
        </div>
        <div onClick={handleShuffleClick}>
          <Shuffle />
        </div>
        <div onClick={handleNextVideo}>
          <Next />
        </div>
        <Volume volumeLevel={volumeLevel} handleSetVolume={handleSetVolume} />
      </Row>
    </Root>
  );
};

export default Controls;
