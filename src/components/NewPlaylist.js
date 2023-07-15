import styled from "styled-components";
import PlusIcon from "./PlusIcon";
import { useState } from "react";
import NewPlaylistForm from "../components/NewPlaylistForm";

const Root = styled.div``;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  border: 0;
  position: absolute;
  top: -1rem;
  left: -1rem;
  opacity: ${(props) => (props.showModal ? "1" : "0")};
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  color: #fff;
  padding: 1rem;
  transition: opacity 0.3s ease;
  pointer-events: ${(props) => (props.showModal ? "all" : "none")};
  cursor: ${(props) => (props.showModal ? "pointer" : "auto")};
  z-index: 100;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 0.5rem;
  border: 1px solid #fff;
  padding: 0.5rem;
  z-index: 10;
  cursor: pointer;
  position: relative;
  width: 42px;
  left: 1rem;
  box-sizing: border-box;
  justify-content: center;

  &:hover {
    color: lightgreen;
    border-color: lightgreen;

    svg {
      color: lightgreen;
    }
  }

  svg {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    color: #fff;
  }
`;

const NewPlaylist = ({ user, setPlaylists, playlists }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Root>
      <Overlay
        onClick={() => {
          setShowModal(false);
        }}
        showModal={showModal}
      >
        <NewPlaylistForm
          user={user}
          setShowModal={setShowModal}
          setPlaylists={setPlaylists}
          playlists={playlists}
        />
      </Overlay>
      <IconWrapper onClick={() => setShowModal(true)}>
        <PlusIcon />
      </IconWrapper>
    </Root>
  );
};

export default NewPlaylist;
