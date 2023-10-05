import styled from "styled-components";

const Root = styled.div`
  position: absolute;
  top: 4.5rem;
  right: 0;
  width: 400px;
  background: rgba(0, 0, 0, 0.75);
  z-index: 2;
  right: 1rem;
  border: 1px solid lightgreen;
  padding: 2rem;
  border-radius: 15px;
  opacity: ${(props) => (props.showShortcuts ? "1" : "0")};
  transition: opacity 0.3 ease;
  cursor: pointer;
  pointer-events: ${(props) => (props.showShortcuts ? "all" : "none")};

  @media (max-width: 900px) {
    padding: 1rem;
    width: auto;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

const Heading = styled.h2`
  text-align: left;
  font-size: 15px;
  text-transform: uppercase;
  color: #fff;
  padding-bottom: 1rem;

  @media (max-width: 900px) {
    padding-bottom: 0;
  }
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;

  @media (max-width: 900px) {
    gap: 0rem;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;

  @media (max-width: 900px) {
    gap: 0.5rem;
  }
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  object-fit: contain;

  @media (max-width: 900px) {
    width: 25px;
    height: 25px;
  }
`;
const Label = styled.p`
  color: #fff;
  font-size: 12px;
`;

const Shortcuts = ({ showShortcuts, handleShowShortcuts }) => {
  return (
    <Root showShortcuts={showShortcuts} onClick={handleShowShortcuts}>
      <Heading>Key bindings</Heading>
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
        <Row>
          <Image src="/letter-c-icon.png" /> -<Label>Show Shortcuts</Label>
        </Row>
      </Rows>
    </Root>
  );
};

export default Shortcuts;
