import styled from "styled-components";
import { useState } from "react";
import { PlaylistVideo, NewVideo } from "./PlaylistVideo";
import NewVideoForm from "./NewVideoForm";

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
  padding: 4.5rem 1rem 1rem;
  transition: opacity 0.3s ease;
  pointer-events: ${(props) => (props.showPlaylist ? "all" : "none")};
  @media (max-width: 1080px) {
    padding-top: 8.5rem;
  }
`;

const PlaylistWrapper = styled.div`
  display: flex;
  gap: 30px 15px;
  flex-flow: row wrap;
  max-height: calc(100% - 200px);
  overflow: auto;

  @media (max-width: 1080px) {
    flex-direction: column;
    height: 100%;
    max-height: calc(100% - 120px);
    padding-bottom: 3rem;
    display: block;
  }
`;

const Playlist = ({
  user,
  videos,
  showPlaylist,
  handleShowPlaylist,
  activeVideo,
  handleSetVideo,
  activePlaylist,
  setVideos,
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleNewVideo = (e) => {
    e.stopPropagation();
    setShowForm(!showForm);
  };

  return (
    <Root onClick={handleShowPlaylist} showPlaylist={showPlaylist}>
      <PlaylistWrapper>
        <NewVideo handleNewVideo={handleNewVideo} />
        {videos.map((video) => (
          <PlaylistVideo
            key={video.key}
            video={video}
            handleSetVideo={handleSetVideo}
            active={activeVideo === video.key}
            setVideos={setVideos}
            videos={videos}
          />
        ))}
        {showForm ? (
          <NewVideoForm
            user={user}
            setVideos={setVideos}
            videos={videos}
            setShowForm={setShowForm}
          />
        ) : null}
      </PlaylistWrapper>
    </Root>
  );
};

export default Playlist;
