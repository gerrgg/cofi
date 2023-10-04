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

const Next = ({ className }) => (
  <Svg viewBox="0 0 24 24" className={className}>
    <path
      fill="currentcolor"
      d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"
    />
  </Svg>
);

export default Next;
