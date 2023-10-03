import styled from "styled-components";

const Root = styled.div`
  position: absolute;
  top: 100px;
  right: 0;
  width: 400px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  right: 1rem;
  border: 1px solid lightgreen;
  padding: 2rem;
  border-radius: 15px;
  opacity: ${(props) => (props.showShortcuts ? "1" : "0")};
  transition: opacity 0.3 ease;
  cursor: pointer;
  pointer-events: ${(props) => (props.showShortcuts ? "all" : "none")};
`;

const Heading = styled.h2`
  text-align: left;
  font-size: 15px;
  text-transform: uppercase;
  color: #fff;
  padding-bottom: 1rem;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  object-fit: contain;
`;
const Label = styled.p`
  color: #fff;
  font-size: 12px;
`;

const Shortcuts = ({ showShortcuts, handleShowShortcuts }) => {
  return (
    <Root showShortcuts={showShortcuts} onClick={handleShowShortcuts}>
      <Heading>Controls</Heading>
      <Rows>
        <Row>
          <Image src="/blank-keyboard-key-icon.png" /> -
          <Label>Play/Pause</Label>
        </Row>

        <Row>
          <Image src="/arrow-right-icon.png" /> -<Label>Next</Label>
        </Row>
        <Row>
          <Image src="/arrow-up-icon.png" /> -<Label>Volume Up</Label>
        </Row>
        <Row>
          <Image src="/arrow-down-icon.png" /> -<Label>Volume Down</Label>
        </Row>
        <Row>
          <Image src="/letter-p-icon.png" /> -<Label>Show Playlist</Label>
        </Row>
        <Row>
          <Image src="/letter-s-icon.png" /> -<Label>Shuffle Gif</Label>
        </Row>
        <Row>
          <Image src="/letter-m-icon.png" /> -<Label>Mute</Label>
        </Row>
        <Row>
          <Image src="/letter-l-icon.png" /> -<Label>Low Power Mode</Label>
        </Row>
      </Rows>
    </Root>
  );
};

export default Shortcuts;
