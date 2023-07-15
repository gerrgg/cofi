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

const Select = styled.select`
  height: 42px;
  text-shadow: none !important;
  padding: 0.25rem 1rem;
  appearance: none;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
`;

const PlaylistSelector = ({
  user,
  activePlaylist,
  setPlaylists,
  playlists,
  setActivePlaylist,
}) => {
  const [value, setValue] = useState(activePlaylist);

  const handleChange = (e) => {
    setValue(e.target.value);
    setActivePlaylist(value);
  };

  return (
    <Root>
      {playlists && playlists.length ? (
        <Select onChange={handleChange} value={value}>
          {playlists.map((playlist) => (
            <option value={playlist.id}>{playlist.name}</option>
          ))}
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
