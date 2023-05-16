import styled from "styled-components";
import PausePlay from "./PausePlay";
import Shuffle from "./Shuffle";

const Root = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 100;
  color: #fff;
  display: flex;
  gap: 15px;
`;

const Controls = ({play, togglePause, handleShuffleGif}) => {
  console.log(play, togglePause, handleShuffleGif);
  return <Root>
    <PausePlay onClick={togglePause} play={play} />
    <Shuffle onClick={handleShuffleGif} />
    </Root>
}

export default Controls;