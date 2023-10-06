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

  @media (max-width: 1080px) {
    max-width: 586px;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 500px) {
    font-size: 9px;
    max-height: 53px;
    padding: 0 1rem;
    overflow: hidden;
    box-sizing: border-box;
  }
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

  @media (max-width: 500px) {
    width: 15px;
    height: 15px;
  }
`;

const Root = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  width: calc(14% - 15px);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 5;
  margin-bottom: 1rem;
  overflow: hidden;
  width: calc(20% - 15px);

  @media (max-width: 1200px) {
  }

  &:hover ${Title} {
    color: lightgreen;
  }

  &:hover ${Remove} {
    opacity: 0.5;
  }

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: row;
    display: flex;
  }

  @media (max-width: 500px) {
    align-items: center;
    height: 75px;
  }
`;

const IconWrapper = styled(PlusIcon)`
  color: green;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;

  @media (max-width: 1080px) {
    height: 100px;
    display: flex;
  }

  img {
    transform: scale(1.32);

    @media (max-width: 1080px) {
      transform: scale(1.2);
      object-fit: cover;
      height: auto;
      display: flex;
      width: 200px;
    }

    @media (max-width: 500px) {
      width: 100px;
      object-fit: cover;
      align-items: center;
      transform: scale(1.05);
    }
  }
`;

const NewVideoWrapper = styled(Root)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background: transparent;
  border: none;

  &:hover {
    border: none;
  }

  ${Title} {
    display: none;
  }

  @media (max-width: 1080px) {
    position: fixed;
    top: 5.5rem;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 67px;
    margin: 0 auto;
    display: flex;
    min-height: auto;
    padding: 0.5rem 1rem;
    flex-direction: row;
    padding: 0.5rem 1rem;
    gap: 1rem;
    border: 1px solid lightgreen;
    height: 47px;
    width: 47px;
    padding: 0rem;

    ${Title} {
      padding: 0;
      display: none;
    }

    svg {
      flex-shrink: 0;
      color: lightgreen;
    }
  }
`;

const Inner = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.25);
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);

  &:hover svg {
    color: lightgreen;
  }

  &:hover {
    border: 1px solid lightgreen;
  }

  @media (max-width: 1080px) {
    height: 100%;
  }
`;

const PlaylistVideo = ({
  user,
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
      {user && user.id === video.user ? (
        <div onClick={handleRemove}>
          <Remove />
        </div>
      ) : null}
    </Root>
  );
};

const NewVideo = ({ handleNewVideo }) => {
  return (
    <NewVideoWrapper>
      <Inner onClick={handleNewVideo}>
        <IconWrapper />
        <NewVideoTitle>Add Video</NewVideoTitle>
      </Inner>
    </NewVideoWrapper>
  );
};

export { PlaylistVideo, NewVideo };
