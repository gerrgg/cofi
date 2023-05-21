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
  const [data, setData] = useState(null);
  const jsonURL = `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${video.id}&format=json`;

  useEffect(() => {
    axios.get(jsonURL).then((response) => {
      setData(response.data);
    });
  }, []);

  if (!data) return;

  return (
    <Root active={active} onClick={() => handleSetVideo(video.id)}>
      <img
        src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
        alt={video.id}
      />
      <Title active={active}>{data.title}</Title>
    </Root>
  );
};

export default PlaylistVideo;
