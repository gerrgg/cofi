import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const Svg = styled(Icon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: ${(props) => (props.showShortcuts ? "lightgreen" : "#fff")};

  &:hover {
    color: lightgreen;
  }
`;

const KeyboardIcon = ({ className, showShortcuts }) => (
  <Svg showShortcuts={showShortcuts} viewBox="0 0 24 24" className={className}>
    <path
      fill="currentcolor"
      d="M22 7v10h-20v-10h20zm2-2h-24v14h24v-14zm-18 3h-3v2h3v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm-4 6h-10v2h10v-2zm4-3h-4v2h4v-2zm-14 0h-4v2h4v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2zm3 0h-2v2h2v-2z"
    />
  </Svg>
);

export default KeyboardIcon;
