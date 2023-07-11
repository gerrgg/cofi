import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import PlusIcon from "./PlusIcon";

const Title = styled.h2`
  margin-top: 15px;
  font-size: 10px;
  color: ${(props) => (props.active ? "lightgreen" : "#fff")};
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(20% - 15px);
  cursor: pointer;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover ${Title} {
    color: lightgreen;
  }

  &:hover svg {
    color: lightgreen;
  }

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.25);
  }
`;

const IconWrapper = styled(PlusIcon)`
  color: green;
`;

const PlaylistVideo = ({ video, active, handleSetVideo }) => {
  return (
    <Root active={active} onClick={() => handleSetVideo(video.key)}>
      <img
        src={`https://i.ytimg.com/vi/${video.key}/maxresdefault.jpg`}
        alt={video.key}
      />
      <Title active={active}>{video.title}</Title>
    </Root>
  );
};

const NewVideo = ({ handleNewVideo }) => {
  return (
    <Root onClick={handleNewVideo}>
      <IconWrapper />
      <Title>Add Video</Title>
    </Root>
  );
};

export { PlaylistVideo, NewVideo };
