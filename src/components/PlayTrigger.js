import styled from 'styled-components';
import Play from './Play'
import Pause from './Pause'
import { useEffect, useState } from 'react';

const Root = styled.div`
  width: 50%;
  height: 50%;
  max-width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  cursor: pointer;
`;

const IconWrapper = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 10;
display: flex;
justify-content: center;
align-items: center;
color: #fff;
opacity: ${props => props.show ? '1' : '0'};
transition: opacity ${props => props.show ? '0s' : '0.5s'}; ease-in-out;

&:hover{
  opacity: 1;
}
`;

const PlayTrigger = ({play, togglePause}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 500);
  }, [play])

  return <Root onClick={togglePause}><IconWrapper>{!play ? <Play/> : <Pause />}</IconWrapper></Root>
}

export default PlayTrigger;