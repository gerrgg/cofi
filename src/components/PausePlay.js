import styled from "styled-components";
import Play from "./Play";
import Pause from "./Pause";

const Root = styled.div`
  display: block;
`;

const PausePlay = ({ play }) => {
  return <Root>{!play ? <Play /> : <Pause />}</Root>;
};

export default PausePlay;
