import React from "react";
import styled from "styled-components";
import KeyboardIcon from "./KeyboardIcon";
import GithubIcon from "./GithubIcon";
import TwitterXIcon from "./TwitterXIcon";
import ClipIcon from "./ClipIcon";

const GregIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  &:hover {
    img {
      filter: hue-rotate(90deg);
    }
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 100%;
  }
`;

const Root = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 2;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const TopLeft = ({
  handleCopyToClipboard,
  handleShowShortcuts,
  showShortcuts,
}) => (
  <Root>
    <GregIcon
      href="https://github.com/gerrgg"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/greg.png" alt="Gregory Bastianelli - GERRGG" />
    </GregIcon>
    <a
      href="https://github.com/gerrgg/cofi-backend"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GithubIcon />
    </a>
    <a
      href={`https://twitter.com/intent/tweet?text=COFI.SH%20brings%20you%20music%20from%20beautiful%20people%20and%20creative%20minds.`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <TwitterXIcon />
    </a>
    <a href="#" onClick={handleCopyToClipboard}>
      <ClipIcon />
    </a>
    <div onClick={handleShowShortcuts}>
      <KeyboardIcon showShortcuts={showShortcuts} />
    </div>
  </Root>
);

export default TopLeft;
