import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const Svg = styled(Icon)`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

const PlusIcon = ({ className }) => (
  <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentcolor" d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/>
  </Svg>
);

export default PlusIcon;
