import styled from "styled-components";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  border: 0;
  background: url(/gifs/${(props) => props.file}) center/cover no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
  }
`;

const Gif = ({ activeGif }) => {
  return <Root file={activeGif} />;
};

export default Gif;
