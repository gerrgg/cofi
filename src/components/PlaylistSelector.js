import styled from "styled-components";
import { useState } from "react";
import NewPlaylist from "../components/NewPlaylist";

const Root = styled.div`
  position: absolute;
  z-index: 100;
  display: flex;
  align-items: center;
  top: 1rem;
  left: 1rem;
`;

const Select = styled.div`
  height: 42px;
  text-shadow: none !important;
  padding: 0.25rem 1rem;
  appearance: none;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  width: 450px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;

  background: ${(props) =>
    props.showOptions ? "rgba(0, 0, 0, 0.5);" : "transparent"};

  border-color: ${(props) => (props.showOptions ? "lightgreen" : "white")};

  &:hover {
    border-color: lightgreen;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const OptionWrapper = styled.div`
  overflow: hidden;
  display: flex;
  height: 0;
  position: absolute;
  left: -1px;
  top: 41px;
  border: 1px solid #fff;
  width: calc(100% + 1px);
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;

  border-color: ${(props) =>
    props.showOptions ? "lightgreen" : "transparent"};
  height: ${(props) => (props.showOptions ? "350px" : "0")};
  padding: ${(props) => (props.showOptions ? "1rem" : "0rem 1rem")};
`;

const CurrentValue = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    color: lightgreen;
  }
`;

const PlaylistSelector = ({
  user,
  activePlaylist,
  setPlaylists,
  playlists,
  setActivePlaylist,
}) => {
  const [value, setValue] = useState(activePlaylist);
  const [showOptions, setShowOptions] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.dataset.value) {
      setValue(playlists.find((p) => p.id === e.target.dataset.value));
      setActivePlaylist(playlists.find((p) => p.id === e.target.dataset.value));
    }

    setShowOptions(!showOptions);
  };

  return (
    <Root>
      <input type="hidden" value={value ? value.id : ""}></input>
      {playlists && playlists.length ? (
        <Select
          onClick={handleClick}
          value={value ? value.id : null}
          showOptions={showOptions}
        >
          <CurrentValue>
            Now Playing: {activePlaylist ? activePlaylist.name : ""}
          </CurrentValue>
          <OptionWrapper showOptions={showOptions}>
            {playlists.map((playlist) =>
              playlist !== activePlaylist ? (
                <CurrentValue key={playlist.id} data-value={playlist.id}>
                  [{playlist.videos.length}] {playlist.name}
                </CurrentValue>
              ) : null
            )}
          </OptionWrapper>
        </Select>
      ) : null}
      <NewPlaylist
        user={user}
        setPlaylists={setPlaylists}
        playlists={playlists}
      />
    </Root>
  );
};

export default PlaylistSelector;
