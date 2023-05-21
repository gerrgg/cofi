import styled from "styled-components";
import PausePlay from "./PausePlay";
import Shuffle from "./Shuffle";
import Next from "./Next";
import Volume from "./Volume";
import { TypeAnimation } from "react-type-animation";

const Root = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 100;
  color: #fff;
`;

const Title = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 15px;
  max-width: 400px;
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

const Controls = ({
  play,
  togglePause,
  handleShuffleGif,
  handleShuffleVideo,
  handleSetVolume,
  volumeLevel,
  videoTitle,
}) => {
  return (
    <Root>
      <Title>{videoTitle}</Title>
      <Row>
        <div onClick={togglePause}>
          <PausePlay play={play} />
        </div>
        <div onClick={handleShuffleGif}>
          <Shuffle />
        </div>
        <div onClick={handleShuffleVideo}>
          <Next />
        </div>
        <Volume volumeLevel={volumeLevel} handleSetVolume={handleSetVolume} />
      </Row>
    </Root>
  );
};

export default Controls;
