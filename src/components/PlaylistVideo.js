import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const Title = styled.h2`
  margin-top: 15px;
  font-size: 10px;
  color: ${(props) => (props.active ? "lightgreen" : "#fff")};
`;

const Root = styled.div`
  display: block;
  width: calc(20% - 15px);
  cursor: pointer;

  &:hover ${Title} {
    color: lightgreen;
  }
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

export default PlaylistVideo;
