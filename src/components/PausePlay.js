import styled from 'styled-components';
import Play from './Play'
import Pause from './Pause'

const Root = styled.div`
  display: block;
`;


const PausePlay = ({play, togglePause}) => {
  return <Root onClick={togglePause}>{!play ? <Play/> : <Pause />}</Root>
}

export default PausePlay;