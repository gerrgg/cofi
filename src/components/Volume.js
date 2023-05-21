import React from "react";
import styled from "styled-components";
import useSound from "use-sound";

const Root = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Level = styled.button`
  height: 16px;
  width: 5px;
  background: #fff;
  apperance: none;
  border: 0;
  opacity: ${(props) => (props.transparent ? "0.5" : "1")};
  cursor: pointer;
`;

const Volume = ({ handleSetVolume, volumeLevel }) => {
  const [playVolume] = useSound("/sounds/volume.wav", {
    volume: 0.5,
  });

  const handleClick = (level) => {
    playVolume();
    handleSetVolume(level);
  };

  const levels = Array.from({ length: 10 }, (x, i) => i + 1);

  return (
    <Root>
      {levels.map((level) => (
        <Level
          key={`volume-${level}`}
          onClick={() => handleClick(level)}
          transparent={level > volumeLevel}
        ></Level>
      ))}
    </Root>
  );
};

export default Volume;
