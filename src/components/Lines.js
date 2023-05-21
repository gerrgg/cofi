import styled from "styled-components";

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(images/lines.jpg);
  background-size: auto;
  z-index: 10;
  background-size: 7px auto;
  mix-blend-mode: overlay;
  pointer-events: none;
  opacity: 0.4;

  @keyframes moveDownAnimation {
    0% {
      background-position-y: 0px;
    }
    100% {
      background-position-y: 200%;
    }
  }
  animation: moveDownAnimation 150s linear infinite;
`;

const Lines = () => {
  return <Root />;
};

export default Lines;
