import styled from "styled-components";
import PausePlay from "./PausePlay";
import Shuffle from "./Shuffle";
import Next from "./Next";

const Root = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 100;
  color: #fff;
  display: flex;
  gap: 15px;
`;

const Controls = ({play, togglePause, handleShuffleGif, handleShuffleVideo}) => {
  return (<Root>
    <div onClick={togglePause}>
      <PausePlay play={play} />
    </div>
    <div onClick={handleShuffleGif}>
      <Shuffle />
    </div>
    <div onClick={handleShuffleVideo}>
      <Next />
    </div>
    </Root>)
}

export default Controls;