import styled from "styled-components";
import { useEffect, useState } from "react";

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: url(/images/static-${(props) => props.index}.gif) center/cover
    no-repeat;
  z-index: 10;
  pointer-events: none;
  display: ${(props) => (props.ready ? "none" : "ready")};
`;

const Static = ({ ready }) => {
  const [index, setIndex] = useState(1);

  const getRandomStatic = () => {
    const limit = 10;
    return Math.floor(Math.random() * limit);
  };
  useEffect(() => {
    const newIndex = getRandomStatic();
    newIndex !== index ? setIndex(newIndex) : getRandomStatic();
  }, [ready]);

  return <Root ready={ready} index={index} />;
};

export default Static;
