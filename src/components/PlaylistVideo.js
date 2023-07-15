import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import PlusIcon from "./PlusIcon";
import XMarkIcon from "./XMarkIcon";
import VideoService from "../services/video";

const Title = styled.h2`
  font-size: 10px;
  padding: 1.5rem 1rem;
  width: 100%;
  color: ${(props) => (props.active ? "lightgreen" : "#fff")};
`;

const NewVideoTitle = styled(Title)`
  text-align: center;
`;

const Remove = styled(XMarkIcon)`
  position: absolute;
  right: 5px;
  top: 5px;
  color: #fff;
  opacity: 0;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1 !important;
  }
`;

const Root = styled.div`
  position: relative;
  background: #000;
  width: calc(20% - 15px);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 5;

  &:hover ${Title} {
    color: lightgreen;
  }

  &:hover ${Remove} {
    opacity: 0.5;
  }

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.25);
  }
`;

const NewVideoWrapper = styled(Root)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;

  &:hover svg {
    color: lightgreen;
  }
`;

const IconWrapper = styled(PlusIcon)`
  color: green;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;

  img {
    transform: scale(1.32);
  }
`;

const PlaylistVideo = ({
  video,
  active,
  handleSetVideo,
  setVideos,
  videos,
}) => {
  const handleRemove = async (e) => {
    e.stopPropagation();

    try {
      await VideoService.remove(video.id);
      setVideos(videos.filter((v) => v.id !== video.id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Root active={active} onClick={() => handleSetVideo(video.key)}>
      <ImageWrapper>
        <img src={video.thumbnail} alt={video.key} />
      </ImageWrapper>
      <Title active={active}>{video.title}</Title>

      <div onClick={handleRemove}>
        <Remove />
      </div>
    </Root>
  );
};

const NewVideo = ({ handleNewVideo }) => {
  return (
    <NewVideoWrapper onClick={handleNewVideo}>
      <IconWrapper />
      <NewVideoTitle>Add Video</NewVideoTitle>
    </NewVideoWrapper>
  );
};

export { PlaylistVideo, NewVideo };
