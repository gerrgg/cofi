import styled from "styled-components";
import PlaylistVideo from "./PlaylistVideo";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  opacity: ${(props) => (props.showPlaylist ? "1" : "0")};
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  color: #fff;
  padding: 1rem;
  transition: opacity 0.3s ease;
  pointer-events: ${(props) => (props.showPlaylist ? "all" : "none")};
`;

const PlaylistWrapper = styled.div`
  display: flex;
  gap: 30px 15px;
  flex-flow: row wrap;
  max-height: calc(100% - 200px);
  overflow: scroll;
`;

const Playlist = ({
  videos,
  showPlaylist,
  handleShowPlaylist,
  activeVideo,
  handleSetVideo,
}) => {
  return (
    <Root onClick={handleShowPlaylist} showPlaylist={showPlaylist}>
      <PlaylistWrapper>
        {videos.map((video) => (
          <PlaylistVideo
            key={video.key}
            video={video}
            handleSetVideo={handleSetVideo}
            active={activeVideo === video.key}
          />
        ))}
      </PlaylistWrapper>
    </Root>
  );
};

export default Playlist;
