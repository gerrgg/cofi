import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const Svg = styled(Icon)`
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    color: lightgreen;
  }
`;

const Pause = ({ className }) => (
  <Svg viewBox="0 0 24 24" className={className}>
    <path
      fill="currentcolor"
      d="M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z"
    />
  </Svg>
);

export default Pause;
