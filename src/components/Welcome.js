import styled from "styled-components";

const Root = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 10;
  color: #fff;
`;

const Controls = () => {
  return <Root>Click to start</Root>
}

export default Controls;